import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import logo from '../../static/images/logo.png';
import loading from './loading.gif';
import './search.css';
import { Box, Flex, Image, Text } from 'rebass';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { indigo, pink } from '@material-ui/core/colors';

class restaurants {
    constructor(title, link, category, description, telephone, address, roadAddress, mapx, mapy){
      this.title=title;
      this.link=link;
      this.category=category;
      this.description=description;
      this.telephone=telephone;
      this.address=address;
      this.roadAddress=roadAddress;
      this.mapx=mapx;
      this.mapy=mapy;
    }
  
    // print(){
    //   return(
    //     <div style={{border: '1px solid black'}}>
    //       <span style={{marginRight: '5px', fontWeight:'bold'}}>{this.category}</span>
    //       <span>{this.title}</span>
    //       <span>{this.telephone}</span>
    //       <span style={{float:'right'}}>{this.address}</span>
    //     </div>
    //   );
    // }
  }

const Search = () => {
    const { place } = useParams();
    const [restaurantList, setRestaurantList]=useState([]); 
    const API_ENDPOINT=`https://cors-anywhere.herokuapp.com/https://openapi.naver.com/v1/search/local.json?query=${place}&display=30&start=1&sort=random`;
    
    
    const onSearch=()=>{
        fetch(`${API_ENDPOINT}`,{
          method: 'GET',
          headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Naver-Client-Id': 'v2ovBB6VAQB_os_SAzYR',
            'X-Naver-Client-Secret':'znQRLoBats',
          }
        }).then((response)=>response.json())
          .then(({items})=>{
            setRestaurantList(
              items.map((item)=>new restaurants(item.title.replace(/<b>/gi,"").replace(/<\/b>/gi,""), item.link, item.category, item.description, item.telephone, item.address, item.roadAddress, item.mapx, item.mapy)),
              console.log(items)
              );
          });
      };

      useEffect(()=>{onSearch()},[]);
      
    if(restaurantList.length>1){
      return(
        <div className="App">
          <div className="App-header">
            <div className="align-right-search">
              <Box display="inline-block">
              <Flex alignItems="center">
                  <Image
                  src={localStorage.getItem("userProfile")}
                  sx={{ borderRadius: '50%' }}
                  width="50px"
                  height="50px"
                  />
                  <Text as="span" mx="15px" fontSize={18} color="#7e91be;">
                  <Text as="span" fontWeight="bold" >
                      {localStorage.getItem("userName")}
                  </Text>{' '}
                  님, 안녕하세요.
                  </Text>
                  <Link to="/mypage" className="button">
                  마이 페이지
                  </Link>
                  <Link to="/">
                      <IconButton aria-label="go to home" >
                          <HomeIcon style={{ color: indigo[200] }}/>
                      </IconButton>
                  </Link>
                  
              </Flex>
              </Box>
            </div>
            <div className="Line-search" />
            
            
          </div>
          <div className="App-body">
            <img src={logo} className="logo-image-search" alt="logo" />
            <div className="list" >
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
                    <th className="header-liked" style={{textAlign:"center"}}>찜</th>
                  </tr>
                
                
                  {restaurantList.map((restaurant)=>{
                    return(
                      <tr>
                        <td className="category"> {restaurant.category} </td>
                        <td className="title"> {restaurant.title} </td>
                        <td className="phone"> {restaurant.telephone} </td>
                        <td className="address"> {restaurant.address} </td>
                        <td className="liked">
                        <IconButton className="like-button" aria-label="like" >
                          <FavoriteIcon style={{ color: pink[200] }}/>
                        </IconButton>
                        </td>
                      </tr>
                    )
                  })}

              </table>
            
              
            {/* <h1>"{localStorage.getItem("placeToSearch")}"</h1>
            <h2>검색결과:</h2>
            <div style={{padding:'20px'}}>{restaurantList.map((restaurant)=>restaurant.print())}</div> */}
          </div>
        </div>
        </div>
        
        
    );
    }
    else return(
      <div className="loading-background">
        <img src={loading} className="loading-gif" alt="loading-gif"/>
      </div>
      
    )
    
};

export default Search;