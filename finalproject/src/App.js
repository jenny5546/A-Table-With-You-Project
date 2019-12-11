import React from 'react';
import mainpic1 from './static/mainpic1.jpg';
import mainpic2 from './static/mainpic3.jpg';
import mainpic3 from './static/mainpic4.jpg';
import mainpic4 from './static/mainpic5.jpg';
import mainpic5 from './static/mainpic6.jpg';
import mainpic6 from './static/mainpic7.jpg';
import search from './static/search.png';
import logo from './static/logo.png';
import { Slide } from 'react-slideshow-image';
import './App.css';

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

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="logo" />
      </header>

      <div className="Search">
        <div className="Search-container">
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
          <div className="recommendation">#돈까스#제육볶음#서울대입구</div>
          <form>
            <input type="text" className="Search-bar" placeholder="         먹고 싶은 음식이나 지역을 입력해주세요"/>
          </form>
          <img src={search} className="Search-image"></img>
          
        </div>
        
        
      </div>
    </div>
  );
}

export default App;
