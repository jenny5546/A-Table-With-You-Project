import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Search from "./components/search/search";
import Home from "./components/home/home";
import SignUp from "./components/signup/signup";
import MyPage from "./components/mypage/mypage";
import Match from "./components/match/match";

function App() {
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
}

export default App;
