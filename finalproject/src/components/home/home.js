import { Button, LinearProgress, TextField } from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import { Box, Flex, Image, Text } from 'rebass';
import styled from 'styled-components';
import logo from '../../static/images/logo.png';
import mainpic3 from '../../static/images/mainpic3.jpg';
import mainpic4 from '../../static/images/mainpic4.jpg';
import mainpic5 from '../../static/images/mainpic5.jpg';
import mainpic6 from '../../static/images/mainpic6.jpg';
import mainpic7 from '../../static/images/mainpic7.jpg';
import mainpic8 from '../../static/images/mainpic8.jpg';
import mainpic9 from '../../static/images/mainpic9.jpg';
import search from '../../static/images/search.png';
import spoon from '../../static/images/spoon.png';
import { signIn } from '../../utils/auth';
import CustomButton from '../button/button';
import Line from '../line/line';
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

const Recommendation = styled.div`
  display: inline-block;
  font-size: 12px;
  font-weight: normal;
  font-size: 16px;
  line-height: 36px;
  color: #ffffff;
  font-family: 'Nanum Gothic', sans-serif;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  margin-right: 10px;
`;

const InputLabel = styled(Box)`
  padding-left: 5px;
  font-size: 12px;
  font-weight: bold;
  font-family: 'Nanum Gothic', sans-serif;
`;

const Home = () => {
  const history = useHistory();
  const [placeToSearch, setPlaceToSearch] = useState('');
  const [openLogin, setOpenLogin] = useState(false);
  const [signInInfo, setSignInInfo] = useState({});
  const [loginLoading, setLoginLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleClickOpenLogin = () => {
    setOpenLogin(true);
  };
  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  const redirectToSignUp = () => {
    history.push('/signup');
  };

  const redirectToMyPage = () => {
    history.push('/mypage');
  };

  const onValueHandle = (e) => {
    const { value, name } = e.target;
    setSignInInfo((s) => ({ ...s, [name]: value }));
  };

  const onLogin = () => {
    setLoginLoading(true);
    signIn({ email: signInInfo.email, password: signInInfo.password })
      .then((userData) => {
        setOpenLogin(false);
        setUserInfo(userData);
        setIsLogin(true);
        localStorage.setItem('login-user', JSON.stringify(userData));
        setLoginLoading(false);
      })
      .catch((err) => {
        setError(true);
        setErrorMessage(err.message);
        setLoginLoading(false);
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
    } else {
      history.push(`/search/${placeToSearch}`);
    }
  };

  const onRecommend = (value) => {
    if (isLogin) {
      setPlaceToSearch(value);
      history.push(`/search/${value}`);
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

                <CustomButton
                  text="마이 페이지"
                  onClick={redirectToMyPage}
                  fontWeight="bold"
                  fontSize={15}
                  color="#7e91be"
                />
                <CustomButton color="#7e91be" onClick={onLogout} text="로그아웃" fontWeight="bold" mr={1} />
              </Flex>
            </Box>
          </div>
        ) : (
          <div className="align-right">
            <CustomButton
              onClick={handleClickOpenLogin}
              color="#7e91be"
              text="로그인"
              fontWeight="bold"
              fontSize={15}
            />
            <CustomButton onClick={redirectToSignUp} color="#7e91be" text="회원가입" fontWeight="bold" fontSize={15} />
          </div>
        )}

        <Line />
      </header>

      <div className="App-body">
        <img src={logo} className="logo-image" alt="logo" />
        <div className="container">
          <div className="Search-container">
            <Flex>
              <Recommendation disabled={!isLogin} onClick={() => onRecommend('돈까스')}>
                #돈까스
              </Recommendation>
              <Recommendation disabled={!isLogin} onClick={() => onRecommend('제육볶음')}>
                #제육볶음
              </Recommendation>
              <Recommendation disabled={!isLogin} onClick={() => onRecommend('서울대입구')}>
                #서울대입구
              </Recommendation>
            </Flex>
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

      <Dialog open={openLogin} onClose={handleCloseLogin} aria-labelledby="form-dialog-title">
        <div className="big-container-login">
          <div className="small-container-login">
            <DialogContent>
              <img src={spoon} className="spoon-image" alt="spoon" />
              <form
                className="login-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  onLogin();
                }}
              >
                {/* <img src={login} className="login-image" alt="background" /> */}
                <div className="login-title">Welcome Back!</div>
                <div className="login-form">
                  <InputLabel mt="50px">이메일</InputLabel>
                  <div className="input-login">
                    <TextField type="text" placeholder="email" name="email" onChange={onValueHandle} />
                  </div>
                  <br />
                  <InputLabel>비밀번호</InputLabel>
                  <div className="input-login">
                    <TextField type="password" placeholder="password" name="password" onChange={onValueHandle} />
                  </div>
                  <input type="submit" style={{ display: 'none' }} />
                </div>
                {error && (
                  <Box my={2}>
                    <Text fontSize={12} fontWeight="bold" color="red">
                      {errorMessage}
                    </Text>
                  </Box>
                )}
              </form>
            </DialogContent>
          </div>
          <DialogActions>
            <div className="modal-close-button">
              <Button onClick={handleCloseLogin} color="primary">
                X
              </Button>
            </div>

            <IconButton aria-label="login" onClick={onLogin} className="login-button button">
              <ExitToAppRoundedIcon style={{ color: indigo[200] }} />
            </IconButton>
            {/* <Button onClick={handleCloseLogin} color="primary">
              닫기
            </Button> */}
          </DialogActions>
          {loginLoading && <LinearProgress />}
        </div>
      </Dialog>
    </div>
  );
};

export default Home;
