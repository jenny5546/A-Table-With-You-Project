import { indigo, pink } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import HomeIcon from '@material-ui/icons/Home';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Box, Flex, Image, Text } from 'rebass';
import styled from 'styled-components';
import loadingImage from '../../static/images/loading.gif';
import logo from '../../static/images/logo.png';
import { findSelectedPlacesByUser, selectPlace, getPlace, findUsersByPlace, getPlaceByInfo } from '../../utils/util';
import CustomButton from '../button/button';
import Line from '../line/line';
import './search.css';

const LogoImg = styled.img`
  width: 300px;
  height: auto;
  margin-left: 40px;
  margin-top: 40px;
`;
class Restaurants {
  constructor(title, link, category, description, telephone, address, roadAddress, mapX, mapY) {
    this.key = `${title}/${address}`;
    this.title = title;
    this.link = link;
    this.category = category;
    this.description = description;
    this.telephone = telephone;
    this.address = address;
    this.roadAddress = roadAddress;
    this.mapX = mapX;
    this.mapY = mapY;
  }
}

const Search = () => {
  const history = useHistory();
  const { place: placeName } = useParams();
  const [restaurantList, setRestaurantList] = useState([]);
  const [selectedRestaurants, setSelectedRestaurants] = useState({});
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [startNumber, setStartNumber] = useState(1);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [searchLoading, setSearchLoading] = useState(true);

  const onFirstMatch = async (i) => {
    try {
      const restaurant = restaurantList[i];
      const placeUid = await selectPlace(
        userInfo.email,
        userInfo.uid,
        restaurant.title,
        restaurant.address,
        restaurant.mapX,
        restaurant.mapY
      );

      setSelectedRestaurants((s) => ({ ...s, [restaurant.key]: true }));
      // const data = await findUsersByPlace(restaurant.title, restaurant.address, restaurant.mapX, restaurant.mapY);
      // if (data.length === 0) {
      //   alert('아직 이 식당을 찜한 다른 유저가 없습니다 ㅠㅠ 조금만 기다려주세요');
      //   return;
      // }
      // localStorage.setItem('matched_restaurant_address', restaurant.address);
      // localStorage.setItem('matched_restaurant_roadAddress', restaurant.roadAddress);

      // const filter = data.filter((user) => user.uid !== userInfo.uid);
      // const targetUser = await findUser(filter[Math.floor(Math.random() * filter.length)].email);
      // localStorage.setItem('matched_user_name', targetUser.name);
      // localStorage.setItem('matched_user_phone', targetUser.phone);
      // localStorage.setItem('matched_user_uid', targetUser.uid);

      history.push(`/match/${placeUid}`);
    } catch (err) {
      console.log(err);
    }
  };

  const onSecondMatch = async (i) => {
    try {
      const restaurant = restaurantList[i];
      const place = await getPlaceByInfo(
        userInfo.email,
        restaurant.title,
        restaurant.address,
        restaurant.mapX,
        restaurant.mapY
      );
      if (place) {
        history.push(`/match/${place.uid}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const redirectToMyPage = () => {
    history.push('/mypage');
  };

  const addSearchPlaces = (query, start = 1, display = 30) => {
    return fetch(
      `https://cors-anywhere.herokuapp.com/https://openapi.naver.com/v1/search/local.json?query=${query}&display=${display}&start=${start}&sort=random`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-Naver-Client-Id': 'v2ovBB6VAQB_os_SAzYR',
          'X-Naver-Client-Secret': 'znQRLoBats',
        },
      }
    )
      .then((response) => response.json())
      .then(({ items }) => {
        setRestaurantList((list) => [
          ...list,
          ...items.map(
            (item) =>
              new Restaurants(
                item.title
                  .replace(/<b>/gi, '')
                  .replace(/<\/b>/gi, '')
                  .replace(/&amp;/, ''),
                item.link,
                item.category,
                item.description,
                item.telephone,
                item.address,
                item.roadAddress,
                item.mapx,
                item.mapy
              )
          ),
        ]);
      });
  };

  // 네이버 검색 api start 는 1000을 넘길 수 없음
  useEffect(() => {
    window.onscroll = () => {
      const nextStartNumber = startNumber + 30;
      if (nextStartNumber < 1000 && !loading && document.body.scrollHeight - window.scrollY === window.innerHeight) {
        setLoading(true);
        setStartNumber(nextStartNumber);
        addSearchPlaces(placeName, nextStartNumber).then(() => {
          setLoading(false);
        });
      }
    };

    return () => {
      window.onscroll = undefined;
    };
  }, [placeName, startNumber, loading]);

  useEffect(() => {
    if (loading) {
      window.scrollTo({ top: document.body.scrollHeight });
    }
  }, [loading]);

  useEffect(() => {
    const userData = localStorage.getItem('login-user');
    if (userData) {
      const loginUserData = JSON.parse(userData);
      setUserInfo(loginUserData);
      findSelectedPlacesByUser(loginUserData.email).then((places) => {
        setSelectedPlaces(places.map((place) => `${place.title}/${place.address}`));
      });
    } else {
      history.replace('/error/401');
    }
  }, [history]);

  useEffect(() => {
    addSearchPlaces(placeName).then(() => {
      setSearchLoading(false);
    });
  }, [placeName]);

  useEffect(() => {
    if (userInfo) {
      const selectedRestaurantList = restaurantList.filter((restaurant) => {
        return selectedPlaces.includes(restaurant.key);
      });
      selectedRestaurantList.forEach(async (restaurant) => {
        setSelectedRestaurants((s) => {
          return { ...s, [restaurant.key]: true };
        });
      });
    }
  }, [userInfo, restaurantList, selectedPlaces]);

  if (!searchLoading) {
    return (
      <Flex flexDirection="column" height="100%">
        <Box sx={{ position: 'relative' }}>
          <Box sx={{ textAlign: 'right' }} mt="10px">
            <Box display="inline-block">
              <Flex alignItems="center">
                <Image
                  src={userInfo && userInfo.profileImagePath}
                  sx={{ borderRadius: '50%' }}
                  width="50px"
                  height="50px"
                />
                <Text as="span" mx="15px" fontSize={18} color="#7e91be;">
                  <Text as="span" fontWeight="bold">
                    {userInfo && userInfo.nickname}
                  </Text>
                  님, 안녕하세요.
                </Text>
                <CustomButton
                  text="마이 페이지"
                  onClick={redirectToMyPage}
                  fontWeight="bold"
                  fontSize={15}
                  color="#7e91be"
                />
                <Link to="/">
                  <IconButton aria-label="go to home">
                    <HomeIcon style={{ color: indigo[200] }} />
                  </IconButton>
                </Link>
              </Flex>
            </Box>
          </Box>
          <Line />
        </Box>
        <Box>
          <LogoImg src={logo} alt="logo" />
          <div className="list">
            <div className="search-title">
              <Text as="span" fontSize={50} fontWeight={600} color="#616161" fontFamily="'Gaegu', cursive">
                {`"${placeName}"`}
              </Text>
              <Text as="span" fontSize={30} color="#616161">
                의 검색결과 :
              </Text>
            </div>

            <table>
              <thead>
                <tr className="list-header">
                  <th className="header-category">카테고리</th>
                  <th className="header-title">상호 명</th>
                  <th className="header-phone">전화번호</th>
                  <th className="header-address">주소</th>
                  <th className="header-liked" style={{ textAlign: 'center' }}>
                    찜
                  </th>
                </tr>
              </thead>

              <tbody>
                {restaurantList.map((restaurant, i) => {
                  return (
                    <tr key={restaurant.key}>
                      <td className="category">{restaurant.category}</td>
                      <td className="title">{restaurant.title}</td>
                      <td className="phone">{restaurant.telephone}</td>
                      <td className="address">{restaurant.address}</td>
                      <td className="liked">
                        {selectedRestaurants[restaurant.key] ? (
                          <IconButton className="like-button" aria-label="like" onClick={() => onSecondMatch(i)}>
                            <FavoriteIcon style={{ color: pink[200] }} />
                          </IconButton>
                        ) : (
                          <IconButton className="like-button" aria-label="like" id={i} onClick={() => onFirstMatch(i)}>
                            <FavoriteBorderOutlinedIcon style={{ color: pink[200] }} />
                          </IconButton>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {loading && (
              <Flex justifyContent="center">
                <img
                  src={loadingImage}
                  style={{ filter: 'brightness(220%)' }}
                  className="loading-gif"
                  alt="loading-gif"
                />
              </Flex>
            )}
          </div>
        </Box>
      </Flex>
    );
  }
  return (
    <Box width="100vw" height="100vh" backgroundColor="#fceef45b">
      <img src={loadingImage} className="loading-gif" alt="loading-gif" />
    </Box>
  );
};

export default Search;
