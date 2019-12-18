import { indigo, pink } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import HomeIcon from '@material-ui/icons/Home';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Box, Flex, Image, Text } from 'rebass';
import loadingImage from '../../static/images/loading.gif';
import logo from '../../static/images/logo.png';
import { getSelectedPlace, getSelectedUser } from '../../utils/auth';
import './search.css';

class Restaurants {
  constructor(title, link, category, description, telephone, address, roadAddress, mapx, mapy) {
    this.title = title;
    this.link = link;
    this.category = category;
    this.description = description;
    this.telephone = telephone;
    this.address = address;
    this.roadAddress = roadAddress;
    this.mapx = mapx;
    this.mapy = mapy;
  }
}

const Search = () => {
  const history = useHistory();
  const { place } = useParams();
  const [restaurantList, setRestaurantList] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [startNumber, setStartNumber] = useState(1);

  const onMatch = (i) => {
    getSelectedPlace(restaurantList[i].mapx).then((data) => {
      if (data.length === 0) {
        history.push(`/match`);
        return;
      }
      getSelectedUser(data[0].email).then((userList) => {
        localStorage.setItem('matched_user_name', userList[0].name);
        localStorage.setItem('matched_user_phone', userList[0].phone);
        localStorage.setItem('matched_user_uid', userList[0].uid);
        history.push(`/match`);
      });
    });
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
                item.title.replace(/<b>/gi, '').replace(/<\/b>/gi, ''),
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
        addSearchPlaces(place, nextStartNumber).then(() => {
          setLoading(false);
        });
      }
    };

    return () => {
      window.onscroll = undefined;
    };
  }, [place, startNumber, loading]);

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
    }

    addSearchPlaces(place);
  }, [place]);

  if (restaurantList.length > 0) {
    return (
      <Flex flexDirection="column" height="100%">
        <Box sx={{ position: 'relative' }}>
          <Box sx={{ textAlign: 'right' }} mt={1}>
            <Box display="inline-block">
              <Flex alignItems="center">
                <Image src={userInfo.profileImagePath} sx={{ borderRadius: '50%' }} width="50px" height="50px" />
                <Text as="span" mx="15px" fontSize={18} color="#7e91be;">
                  <Text as="span" fontWeight="bold">
                    {userInfo.nickname}
                  </Text>
                  님, 안녕하세요.
                </Text>
                <Link to="/mypage" className="button">
                  마이 페이지
                </Link>
                <Link to="/">
                  <IconButton aria-label="go to home">
                    <HomeIcon style={{ color: indigo[200] }} />
                  </IconButton>
                </Link>
              </Flex>
            </Box>
          </Box>
          <div className="Line-search" />
        </Box>
        <Box>
          <img src={logo} className="logo-image-search" alt="logo" />
          <div className="list">
            <div className="search-title">
              <p1>"{place}"</p1>
              <p2>의 검색결과:</p2>
            </div>

            <table>
              <tr className="list-header">
                <th className="header-category">카테고리</th>
                <th className="header-title">상호 명</th>
                <th className="header-phone">전화번호</th>
                <th className="header-address">주소</th>
                <th className="header-liked" style={{ textAlign: 'center' }}>
                  찜
                </th>
              </tr>

              {restaurantList.map((restaurant, i) => {
                return (
                  <tr>
                    <td className="category"> {restaurant.category} </td>
                    <td className="title"> {restaurant.title} </td>
                    <td className="phone"> {restaurant.telephone} </td>
                    <td className="address"> {restaurant.address} </td>
                    <td className="liked">
                      <IconButton className="like-button" aria-label="like" id={i} onClick={(e) => onMatch(i)}>
                        <FavoriteIcon style={{ color: pink[200] }} />
                      </IconButton>
                    </td>
                  </tr>
                );
              })}
            </table>
            {loading && (
              <Flex justifyContent="center">
                <img src={loadingImage} className="loading-gif" alt="loading-gif" />
              </Flex>
            )}
          </div>
        </Box>
      </Flex>
    );
  } else
    return (
      <div className="loading-background">
        <img src={loadingImage} className="loading-gif" alt="loading-gif" />
      </div>
    );
};

export default Search;
