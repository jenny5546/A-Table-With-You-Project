import React from "react";

import mainpic1 from "./mainpic1.jpg";
import mainpic2 from "./mainpic3.jpg";
import mainpic3 from "./mainpic4.jpg";
import mainpic4 from "./mainpic5.jpg";
import mainpic5 from "./mainpic6.jpg";
import mainpic6 from "./mainpic7.jpg";
import search from "./search.png";
import { Slide } from "react-slideshow-image";

const slideImages = [
  mainpic1,
  mainpic2,
  mainpic3,
  mainpic4,
  mainpic5,
  mainpic6
];
const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
  onChange: (oldIndex, newIndex) => {
    console.log(`slide transition from ${oldIndex} to ${newIndex}`);
  }
};

const Home = () => {
  return (
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
        <form className="Search-form">
          <img src={search} className="Search-image"></img>
          <input
            type="text"
            className="Search-bar"
            placeholder="   먹고 싶은 음식이나 지역을 입력해주세요"
          />
        </form>
      </div>
    </div>
  );
};

export default Home;
