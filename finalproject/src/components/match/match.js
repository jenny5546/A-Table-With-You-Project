import React, { useState, useEffect } from 'react';
import './match.css';
import logo from '../../static/images/header-logo.png';
import backgroundPic from '../../static/images/backgroundPic.jpg';
import heartIcon from '../../static/images/heartIcon.png';
import { Box, Flex, Image, Text } from 'rebass';
import yangPic from '../../static/images/yangPic.jpg';
import mapPic from '../../static/images/mapPic.jpg';
import { Link } from 'react-router-dom';
import { indigo } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';

const Match = () => {
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    const userData = localStorage.getItem('login-user');
    if (userData) {
      const loginUserData = JSON.parse(userData);
      setUserInfo(loginUserData);
    }
  }, []);
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="logo-image-mypage" alt="logo" />
        {userInfo && (
          <div className="align-right-matchpage">
            <Box display="inline-block">
              <Flex alignItems="center">
                <Image src={userInfo.profileImagePath} sx={{ borderRadius: '50%' }} width="50px" height="50px" />
                <Text as="span" mx="15px" fontSize={18} color="#7e91be;">
                  <Text as="span" fontWeight="bold">
                    {userInfo.nickname}
                  </Text>{' '}
                  님, 안녕하세요.
                </Text>
                <Link to="/">
                  <IconButton aria-label="go to home">
                    <HomeIcon style={{ color: indigo[200] }} />
                  </IconButton>
                </Link>
              </Flex>
            </Box>
          </div>
        )}
      </div>
      <div className="match-body">
        <img src={backgroundPic} className="Background-image" alt="backgroundPic" />
        <img src={heartIcon} className="heartIcon" alt="heartIcon" />
        <img src={yangPic} className="yangPic" alt="yangPic" />
        <img src={mapPic} className="mapPic" alt="mapPic" />
        <div className="title-box">Meet your Destiny Through a Meal</div>
        <div className="title-box2"></div>
        <div className="text-box1">나와 같은 곳을</div>
        <div className="text-box2">선택한 너...</div>
        <div className="text-box3">Your Restaurant</div>
        <div className="text-box4">{localStorage.getItem("matched_user_restaurant")}</div>
        <div className="text-box5">{localStorage.getItem("matched_user_name")}</div>
        <div className="text-box6">{localStorage.getItem("matched_user_phone")}</div>
        <div className="text-box7">{localStorage.getItem("matched_restaurant_address")}</div>
      </div>
    </div>
  );
};

export default Match;
