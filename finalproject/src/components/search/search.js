import React, {useState, useEffect} from 'react';

class restaurants{
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

function Search() {
    const [restaurantList, setRestaurantList]=useState([]);
    const API_ENDPOINT=`https://cors-anywhere.herokuapp.com/https://openapi.naver.com/v1/search/local.json?query=${localStorage.getItem('placeToSearch')}&start=1&sort=random`;
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
      
    
    return(
        <div>
        <h1>"{localStorage.getItem("placeToSearch")}"</h1>
        <h2>검색결과:</h2>
        <div style={{padding:'20px'}}>{restaurantList.map((restaurant)=>restaurant.print())}</div>
        </div>
    );
}

export default Search;