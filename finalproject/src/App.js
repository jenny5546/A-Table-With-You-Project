import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Search from './components/search/search';
import Home from './components/home/home';
import SignUp from './components/signup/signup';
import MyPage from './components/mypage/mypage';
import Match from '././components/match/match';
import ChatRoom from './components/chatroom/chatroom';

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
        <Route path="/match">
          <Match />
        </Route>
        <Route path="/chat">
          <ChatRoom />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
