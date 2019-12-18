import React from 'react';
import './mypage.css';
import { Image} from 'rebass';
const MyPage=()=>{
    return(
        <div>
            <div>mypage</div>
        <div>
            <Image
        src={localStorage.getItem("userProfile")}
        sx={{ borderRadius: '50%' }}
        width="1000px"
        height="1000px"
        />
      </div>
      <div>{localStorage.getItem("userName")}</div>
        </div>
        
    )
}
export default MyPage;