import firebase from "firebase";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import "./App.css";
import Home from "./components/home/home";
import { firebaseConfig } from "./firebase";



firebase.initializeApp(firebaseConfig);

function App() {
  


  return (
    <Router>
      <div className="App">
        <header className="App-header">
          
        </header>

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
