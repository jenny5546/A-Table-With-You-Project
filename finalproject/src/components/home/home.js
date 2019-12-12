import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import mainpic1 from './mainpic1.jpg';
import mainpic2 from './mainpic3.jpg';
import mainpic3 from './mainpic4.jpg';
import mainpic4 from './mainpic5.jpg';
import mainpic5 from './mainpic6.jpg';
import mainpic6 from './mainpic7.jpg';
import search from './search.png';
import logo from './logo.png';
import { Slide } from 'react-slideshow-image';
import './home.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const slideImages= [mainpic1,mainpic2,mainpic3,mainpic4,mainpic5,mainpic6];
const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
  onChange: (oldIndex, newIndex) => {
    console.log(`slide transition from ${oldIndex} to ${newIndex}`);
  }
}

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
          <div className="Login" > 
            <input type="submit" onClick ={handleClickOpen_login} className="Login-button" value="로그인"/>
            <Dialog open={open_login} onClose={handleClose_login} aria-labelledby="form-dialog-title">
              <DialogTitle className="form-dialog-title">이미 회원이신가요?</DialogTitle>
              <DialogContent>
                <form className="login-form"> {/*onClick ={login}*/}
                  <input type="text" className="id-input" placeholder="아이디"/>
                  <input type="submit" className="button" value="로그인"/>
                  <input type="text" className="pw-input" placeholder="비밀번호"/>
                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose_login} color="primary">닫기</Button>
              </DialogActions>
            </Dialog>
          </div>

          <div className="Signup"> {/*onClick ={signup}*/}
            <input type="submit" onClick ={handleClickOpen_signup} className="Signup-button" value="회원가입"/>
            <Dialog fullScreen open={open_signup} onClose={handleClose_signup} aria-labelledby="form-dialog-title">
              
              <div className="form-dialog-title">
                <p1>너랑 뭐 먹을까?에 오신 것을 환영합니다!</p1>
                <p2>회원 가입을 위해 정보를 입력해주세요</p2>
              </div>
              <DialogContent>
              <div className="signup-area">
                <div className = "essential_box">
                  <div className="container">
                    <div className="input">
                    <label for="profile_photo">프로필사진</label>
                      <input className="profile_photo" type="file"/>
                    </div>
                  </div>
                  <div className = "name_box">
                      <label for="name_text">성함</label>
                      <input type="text" className="name" />
                  </div>
                  <div className = "phonenumber_box">
                      <label for="phonenumber_text">전화번호</label>
                      <input type="text" className="phonenumber" />
                  </div>
                  <div className = "id_box">
                      <label for="id_text">아이디</label>
                      <input type="text" className="username" />
                  </div>
                  <div className = "password_box1">
                      <label for="password_text">비밀번호</label>
                      <input type="password" className="password"/>
                  </div>
                  <div className = "password_box2">
                      <label for="password_text">비밀번호 확인</label>
                      <input type="password" className="password"/>
                  </div>
                  <div className = "nickname_box">
                      <label for="nickname_text">닉네임</label>
                      <input type="text"  className="nickname"/>
                  </div>
                  <div className= "gender">
                    <label for="gender_text">성별</label>
                    <div className = "gender_select">
                        <ul>
                            <input type="radio" id="f-option" name="gender"/> 
                            <label for="f-option">남</label>
                            <div className="check"></div>
                            <input type="radio" id="s-option" name="gender"/>
                            <label for="s-option">여</label>
                            <div className="check"></div>
                        </ul>
                    </div>
                  </div>
                  <div className = "age">
                    <label for="age_text">나이</label>
                    <div className="select-style">
                        <select name = "age">
                            <option > - </option>
                            <option >15  -  19 </option>
                            <option >20  -  25 </option>
                            <option >26  -  30 </option>
                            <option >31  -  35 </option>
                            <option >36  -  40 </option>
                            <option >41  -  45 </option>
                        </select>
                    </div>
                  </div>  
                  <div className = "orienation">
                    <label for="orientation_text"></label>
                    <div className="select-style-2">
                        <select>
                            <option> - </option>
                            <option>남</option>
                            <option>여</option>
                            <option>상관없음 </option>
                            
                        </select>
                    </div>
                  </div>    

                </div>
              </div>
              </DialogContent>

              
              <DialogActions>
                <Button onClick={handleClose_signup} color="primary">닫기</Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
        <div className="Line"/>
        <img src={logo} className="logo" />
      </header>
      

      <div className="slide-container">
          <Slide {...properties}>
            <div className="each-slide">
              <img src={slideImages[0]} className="Main-pic" />
            </div>
            <div className="each-slide">
              <img src={slideImages[1]} className="Main-pic" />
            </div>
            <div className="each-slide">
              <img src={slideImages[2]} className="Main-pic" />
            </div>
            <div className="each-slide">
              <img src={slideImages[3]} className="Main-pic" />
            </div>
            <div className="each-slide">
              <img src={slideImages[4]} className="Main-pic" />
            </div>
            <div className="each-slide">
              <img src={slideImages[5]} className="Main-pic" />
            </div>

          </Slide>
      </div>

      <div className="Search-container">
        <div className="recommendation">#돈까스#제육볶음#서울대입구</div>
        <form className="Search-form">
          <img src={search} className="Search-image"></img>
          <input type="text" className="Search-bar" placeholder="   먹고 싶은 음식이나 지역을 입력해주세요"/>
        </form>
      </div> 
    </div>
  );
}

export default Home;
