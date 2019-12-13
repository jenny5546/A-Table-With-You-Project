import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import mainpic2 from './mainpic3.jpg';
import mainpic3 from './mainpic4.jpg';
import mainpic4 from './mainpic5.jpg';
import mainpic5 from './mainpic6.jpg';
import mainpic6 from './mainpic7.jpg';
import search from './search.png';
import logo from './logo.png';
import login from './loginimg.png';
import signup from './signupimg.jpg';
import { Slide } from 'react-slideshow-image';
import './home.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';

const slideImages = [mainpic2, mainpic3, mainpic4, mainpic5, mainpic6];
const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
};

function Home() {
  const [open_login, setOpen_login] = useState(false);
  const [open_signup, setOpen_signup] = useState(false);
  const handleClickOpen_login = () => {
    setOpen_login(true);
  };
  const handleClose_login = () => {
    setOpen_login(false);
  };
  const handleClickOpen_signup = () => {
    setOpen_signup(true);
  };
  const handleClose_signup = () => {
    setOpen_signup(false);
  };

  /////*******if 로그인이 안돼 있으면 ********////////
  return (
    <div className="App">
      <header className="App-header">
        <div className="Login-Signup">
          <div className="Login">
            <input
              type="submit"
              onClick={handleClickOpen_login}
              className="Login-button"
              value="로그인"
            />
          </div>

          <div className="Signup">
            {' '}
            {/*onClick ={signup}*/}
            <input
              type="submit"
              onClick={handleClickOpen_signup}
              className="Signup-button"
              value="회원가입"
            />
          </div>
        </div>
        <div className="Line" />
      </header>

      <div className="App-body">
        <img src={logo} className="logo" alt="logo" />
        <div className="container">
          <div className="Search-container">
            <div className="recommendation">#돈까스#제육볶음#서울대입구</div>
            <form className="Search-form">
              <img src={search} className="Search-image"></img>
              <input
                type="text"
                className="Search-bar"
                placeholder="먹고 싶은 음식이나 지역을 입력해주세요"
              />
            </form>
          </div>
          <div className="slide-container">
            <Slide {...properties}>
              {slideImages.map((slideImage) => {
                return (
                  <div className="each-slide">
                    <img src={slideImage} className="Main-pic" alt="main-slide" />
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
                {' '}
                {/*onClick ={login}*/}
                <div className="login-title">Welcome Back!</div>
                <div className="image-box-login">
                  <img src={login} className="login-image" />
                </div>
                <div className="login-form">
                  <div className="id-label">아이디</div>
                  <div className="input-login">
                    <TextField type="text" placeholder="id" />
                  </div>
                  <div className="pw-label">비밀번호</div>
                  <div className="input-login">
                    <TextField type="text" placeholder="password" />
                  </div>
                  <input type="submit" className="login-button" value="→" />
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

      <Dialog
        fullScreen
        open={open_signup}
        onClose={handleClose_signup}
        aria-labelledby="form-dialog-title"
      >
        <div className="big-container-signup">
          <div className="form-dialog-title"></div>
          <div className="small-container-signup">
            <DialogContent>
              <form className="signup-form">
                <div className="signup-title">Sign-up</div>
                <div className="image-box-signup">
                  <img src={signup} className="signup-image" />
                </div>
                <div className="signup-form">
                  <div className="photo-upload-container">
                    <div className="photo-label">프로필 사진</div>
                    <div className="file-input">
                      <input className="profile_photo" type="file" />
                    </div>
                  </div>
                  <div className="name-label">성함</div>
                  <div className="input">
                    <TextField type="text" className="textfield" placeholder="ex)양진환" />
                  </div>
                  <div className="phonenumber-label">휴대폰 번호</div>
                  <div className="input">
                    <TextField type="text" className="phonenumber" placeholder="010-xxxx-xxxx" />
                  </div>
                  <div className="username-label">아이디</div>
                  <div className="input">
                    <TextField type="text" className="username" placeholder="영문과 숫자의 혼합" />
                  </div>
                  <div className="password-label">비밀번호</div>
                  <div className="input">
                    <TextField
                      type="password"
                      className="password"
                      placeholder="6자 이상의 비밀번호"
                    />
                  </div>
                  <div className="nickname-label">닉네임</div>
                  <div className="input">
                    <TextField type="text" className="nickname" placeholder="ex)양모" />
                  </div>
                  <div className="gender-label">성별</div>
                  <div className="gender-input">
                    <div className="gender-select">
                      <input type="radio" value="남" />남
                      {/* <div className="gender-label">남</div> */}
                      {/* </input> */}
                      <input type="radio" value="여" />여
                    </div>
                  </div>
                  <div className="age-label">나이</div>
                  <div className="age-input">
                    <div className="age-select">
                      <select name="age">
                        <option> - </option>
                        <option>15 - 19 </option>
                        <option>20 - 25 </option>
                        <option>26 - 30 </option>
                        <option>31 - 35 </option>
                        <option>36 - 40 </option>
                        <option>41 - 45 </option>
                      </select>
                    </div>
                  </div>
                  <input type="submit" className="signup-button" value="→" />
                </div>
              </form>
            </DialogContent>
          </div>

          <DialogActions>
            <Button onClick={handleClose_signup} color="primary">
              닫기
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}

export default Home;
