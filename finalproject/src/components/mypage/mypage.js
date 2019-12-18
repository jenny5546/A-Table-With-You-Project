import React from 'react';
import './mypage.css';
import logo from '../../static/images/header-logo.png';
import man from '../../static/images/man.png';
import woman from '../../static/images/woman.png';
import { Box, Flex, Image, Text } from 'rebass';
import { Link } from 'react-router-dom';
import { indigo } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';

const MyPage=()=>{

    return(
        <div className='MyPage'>
            <div className='MyPage-Header'>
                <img src={logo} className="logo-image-mypage" alt="logo" />
                <div className="align-right-mypage">
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
                        <Link to="/">
                            <IconButton aria-label="go to home" >
                                <HomeIcon style={{ color: indigo[200] }}/>
                            </IconButton>
                        </Link>
                        
                    </Flex>
                    </Box>
                </div>
                
                <div className="Line-mypage" />
            </div>
            <div className="user-info">
                {/* <div className='profile-image-div'> */}
                <img src={localStorage.getItem("userProfile")} className="profile-image-mypage"/>
                {/* </div> */}
                <div className='profile-info-div'>
                    <p3>{JSON.parse(localStorage.getItem('userData')).name}({localStorage.getItem("userName")})</p3>
                    {(JSON.parse(localStorage.getItem('userData')).gender)==='남'? 
                        <img src={man} className="gender-image"/> 
                        : <img src={woman} className="gender-image"/>
                    }
                    {/* <p4>{JSON.parse(localStorage.getItem('userData')).gender}</p4> */}
                    <br></br>
                    <p4>{JSON.parse(localStorage.getItem('userData')).phone}</p4>
                    <br></br>
                    <p5>{JSON.parse(localStorage.getItem('userData')).age}세</p5>
                    
                </div>
                
            </div>
            
        </div>
        
    )
}
export default MyPage;