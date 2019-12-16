import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import logo from '../../static/images/logo.png';
import loading from './loading.gif';
import './search.css';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import { indigo } from '@material-ui/core/colors';

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
  
    print(){
      return(
        <div style={{border: '1px solid black'}}>
          <span style={{marginRight: '5px', fontWeight:'bold'}}>{this.category}</span>
          <span>{this.title}</span>
          <span>{this.telephone}</span>
          <span style={{float:'right'}}>{this.address}</span>
        </div>
      );
    }
  }

const Search = () => {
    const { place } = useParams();
    const [restaurantList, setRestaurantList]=useState([]);
    const API_ENDPOINT=`https://cors-anywhere.herokuapp.com/https://openapi.naver.com/v1/search/local.json?query=${place}&start=1&sort=random`;
    console.log("hi")
    const onSearch=()=>{
        fetch(`${API_ENDPOINT}`,{
          method: 'GET',
          headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Naver-Client-Id':`v2ovBB6VAQB_os_SAzYR`,
            'X-Naver-Client-Secret':`TrDGGlwyV7`,
          }
        }).then((response)=>response.json())
          .then(({items})=>{
            setRestaurantList(
              items.map((item)=>new restaurants(item.title, item.link, item.category, item.description, item.telephone, item.address, item.roadAddress, item.mapx, item.mapy)),
              console.log(items)
              );
          });
      };

      useEffect(()=>{onSearch()},[]);
      
    if(restaurantList.length>1){
      return(
        <div className="App">
          <div className="App-header">
            <div className="button">
              <Link to="/">
                  <IconButton aria-label="go to home" >
                    <HomeIcon style={{ color: indigo[200] }}/>
                  </IconButton>
              </Link>
            </div>
            <div className="Line" />
            
            
          </div>
          <div className="App-body">
            <img src={logo} className="logo-image" alt="logo" />
            <div>
            <h1>"{localStorage.getItem("placeToSearch")}"</h1>
            <h2>검색결과입니다.:</h2>
            <div style={{padding:'20px'}}>{restaurantList.map((restaurant)=>restaurant.print())}</div>
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
    
}

export default Search;