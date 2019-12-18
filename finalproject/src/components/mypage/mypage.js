import React, { useState, useEffect } from 'react';
import './mypage.css';
import logo from '../../static/images/header-logo.png';
import man from '../../static/images/man.png';
import woman from '../../static/images/woman.png';
import { Box, Flex, Image, Text } from 'rebass';
import { Link } from 'react-router-dom';
import { indigo } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import ChatIcon from '@material-ui/icons/Chat';

const MyPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    const userData = localStorage.getItem('login-user');
    if (userData) {
      const loginUserData = JSON.parse(userData);
      setUserInfo(loginUserData);
    }
  }, []);

  return (
    <Flex
      sx={{
        height: '100%',
        flexFlow: 'column',
      }}
    >
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

        <div className="Line-mypage" />
      </Flex>
      {userInfo ? (
        <div className="user-info">
          {/* <div className='profile-image-div'> */}
          <img src={userInfo.profileImagePath} className="profile-image-mypage" />
          {/* </div> */}
          <div className="profile-info-div">
            <p3>
              {userInfo.name}({userInfo.nickname})
            </p3>
            {userInfo.gender === '남' ? (
              <img src={man} className="gender-image" />
            ) : (
              <img src={woman} className="gender-image" />
            )}
            {/* <p4>{JSON.parse(localStorage.getItem('userData')).gender}</p4> */}
            <br></br>
            <p4>{userInfo.phone}</p4>
            <br></br>
            <p5>{userInfo.age}세</p5>
          </div>
          <div className="table-list-title">찜한 식탁</div>
          <table>
            <tr>
              <th style={{ textAlign: 'center' }}>식탁 이름</th>
              <th style={{ textAlign: 'center' }}>사랑방</th>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>식탁 이름</td>
              <td style={{ textAlign: 'center' }}>
                <IconButton aria-label="go to home">
                  <ChatIcon style={{ color: indigo[200] }} />
                </IconButton>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>식탁 이름</td>
              <td style={{ textAlign: 'center' }}>아직 짝을 찾지 못했습니다</td>
            </tr>
          </table>
        </div>
      ) : (
        <Flex sx={{ flexGrow: 1 }} justifyContent="center" alignItems="center">
          <Text fontSize={20} fontWeight="bold">
            로그인을 해주세요.
          </Text>
        </Flex>
      )}
    </Flex>
  );
};
export default MyPage;
