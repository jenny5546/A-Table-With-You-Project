import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Search from './components/search/search';
import Home from './components/home/home';
import SignUp from './components/signup/signup';
import MyPage from './components/mypage/mypage';
import Match from '././components/match/match';

function App() {
  /*
    아래는 회원가입과 로그인 코드 샘플입니다.
  */
  /*
  const [exampleImage, setExampleImage] = useState(null);

  const exampleProfileImageHandleChange = e => {
    if (e.target.files[0]) {
      setExampleImage(e.target.files[0]);
    }
  };

  const exampleSignUp = () => {
    return signUp({
      profileImage: exampleImage,
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
        if (err.code === SignupError.ALREADY_EMAIL_USE) {
          console.log("이미 사용중인 이메일 주소입니다.");
        } else if (err.code === SignupError.INVALID_EMAIL) {
          console.log("올바르지 않은 이메일 주소 형식입니다.");
        } else if (err.code === SignupError.OPERATION_NOT_ALLOWED) {
          console.log("현재 회원가입이 불가능합니다.");
        } else if (err.code === SignupError.WEAK_PASSWORD) {
          console.log("비밀번호는 최소 6자 이상으로 구성해주세요.");
        } else {
          console.error(err);
        }
      });
  };

  const exampleSignIn = () => {
    signIn({ email: "ysm1180@gmail.com", password: "qweqwe" })
      .then(userData => {
        // 로그인 성공
        console.log(userData);
      })
      .catch(err => {
        if (err.code === SigninError.INVALID_EMAIL) {
          console.log("올바르지 않은 이메일 주소 형식입니다.");
        } else if (err.code === SigninError.USER_DISABLED) {
          console.log("해당 유저는 비활성화 되었습니다.");
        } else if (err.code === SigninError.USER_NOT_FOUND) {
          console.log("존재하지 않는 이메일 주소입니다.");
        } else if (err.code === SigninError.WRONG_PASSWORD) {
          console.log("비밀번호가 틀렸습니다.");
        } else if (err.code === SigninError.NOT_EXIST_DATA) {
          console.log("유저 데이터를 가져올 수 없습니다.");
        } else {
          console.error(err);
        }
      });
  };
  */

  return (
    <Router>
      <Switch>
        {/* <Route path="뒤에 들어갈 주소를 적어주세요. ex) signup">
            주소에 접속시 나타나는 컴포넌트를 넣어주시면 됩니다.
          </Route> */}
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/search/:place">
          <Search />
        </Route>
        <Route path="/mypage">
          <MyPage />
        </Route>
        <Route path="/match">
          <Match />
        </Route>
        
      </Switch>
    </Router>
  );
}//에베ㅔㅂ

export default App;
