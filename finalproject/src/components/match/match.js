import React from 'react';
import './match.css';
import backgroundPic from '../../static/images/backgroundPic.jpg';
import heartIcon from '../../static/images/heartIcon.png';
import yangPic from '../../static/images/yangPic.jpg';
import mapPic from '../../static/images/mapPic.jpg';

const Match = () => {
  return (
    <div className="App">
      <div className="App-header"></div>
      <div className="match-body">
        <img src={backgroundPic} className="Background-image" alt="backgroundPic" />
        <img src={heartIcon} className="heartIcon" alt="heartIcon" />
        <img src={yangPic} className="yangPic" alt="yangPic" />
        <img src={mapPic} className="mapPic" alt="mapPic" />
        <div className="title-box">Meet your destiny through a meal</div>
        <div className="title-box2"></div>
        <div className="text-box1">나와 같은 곳을</div>
        <div className="text-box2">선택한 너...</div>
        <div className="text-box3">Your Restaurant</div>
        <div className="text-box4">"오산갈비찜"</div>
        <div className="text-box5">양진환</div>
        <div className="text-box6">010-xxxx-xxxx</div>
        <div className="text-box7">서울특별시 관악구</div>
        <div className="text-box8">남부순환로 xx길 xx</div>
      </div>
    </div>
  );
};

export default Match;
