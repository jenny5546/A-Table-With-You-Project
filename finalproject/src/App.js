import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import "./App.css";
import Home from "./components/home/home";
import {
  signUp,
  FirebaseSignupError,
  FirebaseSigninError,
  signIn
} from "./firebase";

function App() {
  const exampleSignUp = () => {
    return signUp({
      email: "ysm1180@gmail.com",
      password: "qweqwe",
      nickname: "gasi",
      gender: "M",
      name: "연성민",
      age: 26,
      phone: "010-xxxx-xxxx"
    })
      .then(() => {
        // 회원가입 성공했음
      })
      .catch(err => {
        if (err.code === FirebaseSignupError.ALREADY_EMAIL_USE) {
          console.log("이미 사용중인 이메일 주소입니다.");
        } else if (err.code === FirebaseSignupError.INVALID_EMAIL) {
          console.log("올바르지 않은 이메일 주소 형식입니다.");
        } else if (err.code === FirebaseSignupError.OPERATION_NOT_ALLOWED) {
          console.log("현재 회원가입이 불가능합니다.");
        } else if (err.code === FirebaseSignupError.WEAK_PASSWORD) {
          console.log("비밀번호는 최소 6자 이상으로 구성해주세요.");
        } else {
          console.error(err);
        }
      });
  };

  const exampleSignIn = () => {
    signIn({ email: "ysm1180@gmail.com", password: "qweqwe" })
      .catch(err => {
        if (err.code === FirebaseSigninError.INVALID_EMAIL) {
          console.log("올바르지 않은 이메일 주소 형식입니다.");
        } else if (err.code === FirebaseSigninError.USER_DISABLED) {
          console.log("해당 유저는 비활성화 되었습니다.");
        } else if (err.code === FirebaseSigninError.USER_NOT_FOUND) {
          console.log("존재하지 않는 이메일 주소입니다.");
        } else if (err.code === FirebaseSigninError.WRONG_PASSWORD) {
          console.log("비밀번호가 틀렸습니다.");
        } else if (err.code === FirebaseSigninError.NOT_EXIST_DATA) {
          console.log("유저 데이터를 가져올 수 없습니다.");
        } else {
          console.error(err);
        }
      })
      .then(userData => {
        // 로그인 성공
        console.log(userData);
      });
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header"></header>
        <Switch>
          {/* <Route path="뒤에 들어갈 주소를 적어주세요. ex) signup">
            주소에 접속시 나타나는 컴포넌트를 넣어주시면 됩니다.
          </Route> */}
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
