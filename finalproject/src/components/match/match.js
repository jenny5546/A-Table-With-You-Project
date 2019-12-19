import { indigo } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Box, Flex, Image, Text } from 'rebass';
import backgroundPic from '../../static/images/backgroundPic.jpg';
import heartIcon from '../../static/images/heartIcon.png';
import mapPic from '../../static/images/mapPic.jpg';
import { findUser, findUsersByPlace, finishMatch, getPlace, getUser } from '../../utils/util';
import './match.css';
import loadingImage from '../../static/images/loading.gif';
import logo from '../../static/images/header-logo.png';

const Match = () => {
  const history = useHistory();
  const { placeUid } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [targetUserInfo, setTargetUserInfo] = useState(null);
  const [targetPlace, setTargetPlace] = useState(null);
  const [matchLoading, setMatchLoading] = useState(true);

  useEffect(() => {
    try {
      const userData = localStorage.getItem('login-user');
      if (userData) {
        const loginUserData = JSON.parse(userData);
        setUserInfo(loginUserData);

        const matchUser = async () => {
          const place = await getPlace(placeUid);
          let targetUser = null;
          if (!place.isFinish) {
            let users = await findUsersByPlace(place.title, place.address, place.mapX, place.mapY);
            users = users.filter((user) => user.userUid !== loginUserData.uid);
            if (users.length === 0) {
              alert('아직 이 식당을 찜한 매치되지 않은 다른 유저가 없습니다 ㅠㅠ 조금만 기다려주세요!');
              history.goBack();
              return;
            }
            targetUser = await findUser(users[Math.floor(Math.random() * users.length)].email);
          } else {
            targetUser = await getUser(place.targetUserUid);
          }
          if (targetUser) {
            await finishMatch(loginUserData.email, targetUser.uid, place.title, place.address, place.mapX, place.mapY);
            await finishMatch(targetUser.email, loginUserData.uid, place.title, place.address, place.mapX, place.mapY);
          }
          setTargetUserInfo(targetUser);
          setTargetPlace(place);
        };

        matchUser().then(() => {
          setMatchLoading(false);
        });
      } else {
        history.replace('/error/401');
      }
    } catch (err) {
      console.error(err);
    }
  }, [history, placeUid]);

  if (matchLoading) {
    return (
      <Box width="100vw" height="100vh" backgroundColor="#fceef45b">
        <img src={loadingImage} className="loading-gif" alt="loading-gif" />
      </Box>
    );
  }

  if (!userInfo) {
    return (
      <Flex justifyContent="space-between">
        <img src={logo} className="logo-image-mypage" alt="logo" />

        <Flex alignItems="center">
          <Link to="/">
            <IconButton aria-label="go to home">
              <HomeIcon style={{ color: indigo[200] }} />
            </IconButton>
          </Link>
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex flexDirection="column" height="100%">
      <Flex flexDirection="column" p={3}>
        {userInfo && (
          <Flex justifyContent="space-between">
            <img src={logo} className="logo-image-mypage" alt="logo" />

            <Flex alignItems="center">
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
            </Flex>
          </Flex>
        )}
      </Flex>
      <Flex flex="1" sx={{ flexFlow: 'column', position: 'relative' }} height="100%">
        <img src={backgroundPic} className="Background-image" alt="backgroundPic" />

        <div className="title-box">Meet your Destiny Through a Meal</div>
        <Flex sx={{ textAlign: 'center' }} justifyContent="space-around" mt="50px">
          <Box>
            <Text fontSize={40} fontWeight="bold" fontFamily="'Noto Sans KR'" color="#844037fc">
              나와 같은 곳을
            </Text>
            <Text fontSize={40} fontWeight="bold" fontFamily="'Noto Sans KR'" color="#844037fc">
              선택한 너...
            </Text>
          </Box>
          <Box>
            <Text fontSize={40} fontWeight="bold" fontFamily="'Noto Sans KR'" color="#844037fc">
              Your Restaurant
            </Text>
            <Text fontSize={40} fontWeight="bold" fontFamily="'Noto Sans KR'" color="#844037fc">
              {targetPlace && targetPlace.title}
            </Text>
          </Box>
        </Flex>
        <Flex sx={{ textAlign: 'center' }} justifyContent="space-around" mt="20px">
          <Flex>
            <img src={targetUserInfo && targetUserInfo.profileImagePath} className="yangPic" alt="yangPic" />
            <img src={heartIcon} className="heartIcon" alt="heartIcon" />
          </Flex>
          <Box>
            <img src={mapPic} className="mapPic" alt="mapPic" />
          </Box>
        </Flex>
        <Flex sx={{ textAlign: 'center' }} justifyContent="space-around" mt="20px">
          <Box width="387px">
            <Text fontSize={40} fontWeight="bold" fontFamily="'Noto Sans KR'" color="#844037fc">
              {targetUserInfo && targetUserInfo.name}
            </Text>
            <Text fontSize={40} fontWeight="bold" fontFamily="'Noto Sans KR'" color="#844037fc">
              {targetUserInfo && targetUserInfo.phone}
            </Text>
          </Box>
          <Box width="387px">
            <Text fontSize={40} fontWeight="bold" fontFamily="'Noto Sans KR'" color="#41150f">
              {targetPlace && targetPlace.address}
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Match;
