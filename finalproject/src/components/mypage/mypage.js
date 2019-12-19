import { indigo } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import ChatIcon from '@material-ui/icons/Chat';
import HomeIcon from '@material-ui/icons/Home';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Flex, Image, Text } from 'rebass';
import logo from '../../static/images/header-logo.png';
import man from '../../static/images/man.png';
import woman from '../../static/images/woman.png';
import './mypage.css';

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
          <img src={userInfo.profileImagePath} className="profile-image-mypage" alt="profile" />
          {/* </div> */}
          <div className="profile-info-div">
            <Text as="span" color="#616161dc" fontSize={30} fontWeight="bold" fontFamily="'Noto Sans KR', sans-serif">
              {`${userInfo.name} (${userInfo.nickname})`}
            </Text>
            {userInfo.gender === '남' ? (
              <img src={man} className="gender-image" alt="male" />
            ) : (
              <img src={woman} className="gender-image" alt="female" />
            )}
            <br />
            <Text as="span" color="#616161dc" fontSize={20} ml="5px" fontFamily="'Noto Sans KR', sans-serif">
              {userInfo.phone}
            </Text>
            <br />
            <Text as="span" color="#616161dc" fontSize={20} ml="5px" fontFamily="'Noto Sans KR', sans-serif">
              {`${userInfo.age}세`}
            </Text>
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
