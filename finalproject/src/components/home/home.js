import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { indigo } from '@material-ui/core/colors';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import { Box, Flex, Image, Text } from 'rebass';
import login from '../../static/images/loginimg.png';
import logo from '../../static/images/logo.png';
import mainpic3 from '../../static/images/mainpic3.jpg';
import mainpic4 from '../../static/images/mainpic4.jpg';
import mainpic5 from '../../static/images/mainpic5.jpg';
import mainpic6 from '../../static/images/mainpic6.jpg';
import mainpic7 from '../../static/images/mainpic7.jpg';
import mainpic8 from '../../static/images/mainpic8.jpg';
import mainpic9 from '../../static/images/mainpic9.jpg';
import search from '../../static/images/search.png';
import { signIn } from '../../utils/auth';
import styled from 'styled-components';
import './home.css';

const slideImages = [mainpic3, mainpic4, mainpic5, mainpic6, mainpic7, mainpic8, mainpic9];
const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
};

const SearchForm = styled.form`
  width: 100%;
  border-radius: 50px;
  background: ${(props) => (props.disabled ? '#EBEBE4' : 'white')};
  border: 2px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);

  display: flex;
  align-items: center;
  padding: 3px 10px;
`;

const Home = () => {
  const history = useHistory();
  const [placeToSearch, setPlaceToSearch] = useState('');
  const [openLogin, setOpenLogin] = useState(false);
  const [signInInfo, setSignInInfo] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const handleClickOpenLogin = () => {
    setOpenLogin(true);
  };
  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  const onValueHandle = (e) => {
    const { value, name } = e.target;
    setSignInInfo((s) => ({ ...s, [name]: value }));
  };

  const onLogin = () => {
    signIn({ email: signInInfo.email, password: signInInfo.password })
      .then((userData) => {
        setOpenLogin(false);
        setUserInfo(userData);
        setIsLogin(true);
        localStorage.setItem('login-user', JSON.stringify(userData));
      })
      .catch((err) => {
        // 에러 표시 방식은 추후 변경
        console.error(err.message);
      });
  };

  useEffect(() => {
    const userData = localStorage.getItem('login-user');
    if (userData) {
      setIsLogin(true);
      setUserInfo(JSON.parse(userData));
    }
  }, []);

  const onLogout = () => {
    localStorage.removeItem('login-user');
    setIsLogin(false);
  };

  const searchResults = (e) => {
    e.preventDefault();
    if (!placeToSearch) {
      alert('아무것도 입력하지 않으셨습니다.');
    }
    // if(!userInfo.profileImagePath){alert('로그인하고 이용해주세요.')}
    else {
      history.push(`/search/${placeToSearch}`);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {isLogin ? (
          <div className="align-right">
            <Box display="inline-block">
              <Flex alignItems="center">
                <Image src={userInfo.profileImagePath} sx={{ borderRadius: '50%' }} width="50px" height="50px" />
                <Text as="span" mx="15px" fontSize={18} color="#7e91be;">
                  <Text as="span" fontWeight="bold">
                    {userInfo.nickname}
                  </Text>
                  님, 안녕하세요.
                </Text>
                <Link to="/mypage" className="mypage-button">
                  마이 페이지
                </Link>
                <Button className="logout-button" style={{ color: indigo[400] }} onClick={onLogout}>
                  로그아웃
                </Button>
              </Flex>
            </Box>
          </div>
        ) : (
          <div className="align-right">
            <input type="button" onClick={handleClickOpenLogin} className="button" value="로그인" />

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
            <SearchForm onSubmit={searchResults} disabled={!isLogin}>
              <img src={search} className="Search-image" alt="search" />
              <input
                type="text"
                disabled={!isLogin}
                className="Search-bar"
                placeholder={isLogin ? '먹고 싶은 음식이나 지역을 입력해주세요' : '로그인을 먼저 해주세요'}
                onChange={(e) => {
                  setPlaceToSearch(e.target.value);
                }}
              />
              {/* <input type="submit"></input> */}
            </SearchForm>
          </div>
          <div className="slide-container">
            <Slide {...properties}>
              {slideImages.map((slideImage) => {
                return (
                  <div className="each-slide" key={slideImage}>
                    <img src={slideImage} className="Main-pic" alt="main-slide" />
                  </div>
                );
              })}
            </Slide>
          </div>
        </div>
      </div>

      <Dialog fullScreen open={openLogin} onClose={handleCloseLogin} aria-labelledby="form-dialog-title">
        <div className="big-container-login">
          <DialogTitle className="form-dialog-title" />
          <div className="small-container-login">
            <DialogContent>
              <form
                className="login-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  onLogin();
                }}
              >
                <div className="login-title">Welcome Back!</div>
                <div className="image-box-login">
                  <img src={login} className="login-image" alt="background" />
                </div>
                <div className="login-form">
                  <div className="id-label">이메일</div>
                  <div className="input-login">
                    <TextField type="text" placeholder="email" name="email" onChange={onValueHandle} />
                  </div>
                  <div className="pw-label">비밀번호</div>
                  <div className="input-login">
                    <TextField type="password" placeholder="password" name="password" onChange={onValueHandle} />
                  </div>
                  <input type="submit" style={{ display: 'none' }} />
                  <IconButton aria-label="login" onClick={onLogin} className="login-button button">
                    <ExitToAppRoundedIcon style={{ color: indigo[200] }} />
                  </IconButton>
                </div>
              </form>
            </DialogContent>
          </div>
          <DialogActions>
            <Button onClick={handleCloseLogin} color="primary">
              닫기
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};

export default Home;
