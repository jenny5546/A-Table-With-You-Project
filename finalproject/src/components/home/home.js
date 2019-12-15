import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import { Box, Flex, Image, Text } from 'rebass';
import logo from '../../static/images/logo.png';
import { signIn, SigninError } from '../../utils/auth';
import './home.css';
import login from './loginimg.png';
import mainpic2 from './mainpic3.jpg';
import mainpic3 from './mainpic4.jpg';
import mainpic4 from './mainpic5.jpg';
import mainpic5 from './mainpic6.jpg';
import mainpic6 from './mainpic7.jpg';
import mainpic7 from './mainpic8.jpg';
import mainpic8 from './mainpic9.jpg';
import search from './search.png';
//learning github

const slideImages = [
  mainpic2,
  mainpic3,
  mainpic4,
  mainpic5,
  mainpic6,
  mainpic7,
  mainpic8
];
const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true
};

const Home = () => {
  const history = useHistory();
  const [placeToSearch, setPlaceToSearch] = useState('');
  const [open_login, setOpen_login] = useState(false);
  const [signInInfo, setSignInInfo] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const handleClickOpen_login = () => {
    setOpen_login(true);
  };
  const handleClose_login = () => {
    setOpen_login(false);
  };

  const onValueHandle = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setSignInInfo((s) => ({ ...s, [name]: value }));
  };
  const onLogin = (e) => {
    e.preventDefault();

    signIn({ email: signInInfo.email, password: signInInfo.password })
      .then((userData) => {
        setOpen_login(false);
        setUserInfo(userData);
        setIsLogin(true);
      })
      .catch((err) => {
        // 에러 표시 방식은 추후 변경
        if (err.code === SigninError.INVALID_EMAIL) {
          console.log('올바르지 않은 이메일 주소 형식입니다.');
        } else if (err.code === SigninError.USER_DISABLED) {
          console.log('해당 유저는 비활성화 되었습니다.');
        } else if (err.code === SigninError.USER_NOT_FOUND) {
          console.log('존재하지 않는 이메일 주소입니다.');
        } else if (err.code === SigninError.WRONG_PASSWORD) {
          console.log('비밀번호가 틀렸습니다.');
        } else if (err.code === SigninError.NOT_EXIST_DATA) {
          console.log('유저 데이터를 가져올 수 없습니다.');
        } else {
          console.error(err);
        }
      });
  };

  const searchResults = (e) => {
    e.preventDefault();
    history.push(`/search/${placeToSearch}`);
  };

  /////*******if 로그인이 안돼 있으면 ********////////
  return (
    <div className="App">
      <header className="App-header">
        {isLogin ? (
          <div className="align-right">
            <Box display="inline-block">
              <Flex alignItems="center">
                <Image
                  src={userInfo.profileImagePath}
                  sx={{ borderRadius: '50%' }}
                  width="50px"
                  height="50px"
                />
                <Text as="span" mx="15px" fontSize={18} color="#7e91be;">
                  <Text as="span" fontWeight="bold" >
                    {userInfo.nickname}
                  </Text>{' '}
                  님, 안녕하세요.
                </Text>
                <Link to="/mypage" className="button">
                  마이 페이지
                </Link>
              </Flex>
            </Box>
          </div>
        ) : (
          <div className="align-right">
            {/* <li><Link to="/search/">Home</Link></li> */}
            <input
              type="button"
              onClick={handleClickOpen_login}
              className="button"
              value="로그인"
            />
            <Link to="/signup" className="button">
              회원가입
            </Link>
          </div>
        )}

        <div className="Line" />
      </header>

      <div className="App-body">
        <img src={logo} className="logo-image" alt="logo" />
        <div className="container">
          <div className="Search-container">
            <div className="recommendation">#돈까스#제육볶음#서울대입구</div>
            <form className="Search-form" onSubmit={searchResults}>
              <img src={search} className="Search-image"></img>
              <input
                type="text"
                className="Search-bar"
                placeholder="먹고 싶은 음식이나 지역을 입력해주세요"
                onChange={(e) => {
                  setPlaceToSearch(e.target.value);
                }}
              />
              {/* <input type="submit"></input> */}
            </form>
          </div>
          <div className="slide-container">
            <Slide {...properties}>
              {slideImages.map((slideImage) => {
                return (
                  <div className="each-slide" key={slideImage}>
                    <img
                      src={slideImage}
                      className="Main-pic"
                      alt="main-slide"
                    />
                  </div>
                );
              })}
            </Slide>
          </div>
        </div>
      </div>

      <Dialog
        fullScreen
        open={open_login}
        onClose={handleClose_login}
        aria-labelledby="form-dialog-title"
      >
        <div className="big-container-login">
          <DialogTitle className="form-dialog-title"></DialogTitle>
          <div className="small-container-login">
            <DialogContent>
              <form className="login-form">
                <div className="login-title">Welcome Back!</div>
                <div className="image-box-login">
                  <img src={login} className="login-image" alt="background" />
                </div>
                <div className="login-form">
                  <div className="id-label">이메일</div>
                  <div className="input-login">
                    <TextField
                      type="text"
                      placeholder="email"
                      name="email"
                      onChange={onValueHandle}
                    />
                  </div>
                  <div className="pw-label">비밀번호</div>
                  <div className="input-login">
                    <TextField
                      type="password"
                      placeholder="password"
                      name="password"
                      onChange={onValueHandle}
                    />
                  </div>
                  <input
                    type="submit"
                    className="login-button"
                    value="→"
                    onClick={onLogin}
                  />
                </div>
              </form>
            </DialogContent>
          </div>
          <DialogActions>
            <Button onClick={handleClose_login} color="primary">
              닫기
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};

export default Home;
