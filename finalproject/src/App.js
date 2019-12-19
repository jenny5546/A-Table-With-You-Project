import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Search from './components/search/search';
import Home from './components/home/home';
import SignUp from './components/signup/signup';
import MyPage from './components/mypage/mypage';
import Match from './components/match/match';
import ChatRoom from './components/chatroom/chatroom';
import ErrorPage from './components/errorpage/errorpage';

function App() {
  return (
    <Router>
      <Switch>
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
        <Route path="/match/:placeUid">
          <Match />
        </Route>
        <Route path="/chat/:placeUid">
          <ChatRoom />
        </Route>
        <Route path="/error/:code">
          <ErrorPage />
        </Route>
      </Switch>
    </Router>
  );
} //에베ㅔㅂ

export default App;
