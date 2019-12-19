import { FormControlLabel, Radio, RadioGroup, TextField } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Box, Flex, Text } from 'rebass';
import styled from 'styled-components';
import profileDummyImg from '../../static/images/profile_dummy.png';
import backgroundImg from '../../static/images/signupimg.jpg';
import { signUp } from '../../utils/auth';
import Button from '../button/button';
import './signup.css';

const PageBody = styled(Flex)`
  position: relative;

  &:after {
    background-image: url(${backgroundImg});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
    opacity: 0.5;
    top: 0;
    left: 0;
    position: absolute;
    filter: alpha(opacity=50);
    z-index: -1;
    content: '';
    width: 100%;
    height: 100%;
  }
`;

const InputLabel = styled.div`
  font-size: 12px;
  font-weight: bold;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  border: 2px solid rgb(199, 163, 45);
`;

const SignUp = () => {
  const history = useHistory();
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [signUpInfo, setSignUpInfo] = useState({});
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const profileImageChanged = (e) => {
    if (e.target.files[0]) {
      setProfileImage(e.target.files[0]);
      setProfileImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const onValueHandle = (e) => {
    const { value, name } = e.target;
    setSignUpInfo((s) => ({ ...s, [name]: value }));
  };

  const onSubmit = () => {
    if (
      !profileImage ||
      !signUpInfo.email ||
      !signUpInfo.password ||
      !signUpInfo.gender ||
      !signUpInfo.name ||
      !signUpInfo.age ||
      !signUpInfo.phone
    ) {
      setError(true);
      setErrorMessage('모든 항목을 입력하거나 프로필 이미지 사진을 넣어주세요.');
      return;
    }

    signUp({
      profileImage,
      email: signUpInfo.email,
      password: signUpInfo.password,
      nickname: signUpInfo.nickname,
      gender: signUpInfo.gender,
      name: signUpInfo.name,
      age: signUpInfo.age,
      phone: signUpInfo.phone,
    })
      .then(() => {
        history.replace('/');
      })
      .catch((err) => {
        setError(true);
        setErrorMessage(err.message);
      });
  };

  return (
    <Flex flexDirection="column" height="100vh">
      <div className="close-button">
        <Link to="/">
          <IconButton aria-label="go to home">
            <HighlightOffIcon style={{ color: '#ffffff', fontSize: 40 }} />
          </IconButton>
        </Link>
      </div>

      <PageBody flex="1" alignItems="center" justifyContent="center">
        <form className="Signup-form">
          <Text fontFamily="'Gelasio', serif" fontSize={40} color="#333333d3" fontWeight="bold" ml="12px" mt="5px">
            Sign Up!
          </Text>
          <br />
          <br />
          <Flex justifyContent="space-evenly">
            <Flex flexDirection="column">
              <InputLabel>프로필 사진</InputLabel>
              <Flex mt={3} mb={3} alignItems="center">
                {profileImage ? (
                  <ProfileImage src={profileImageUrl} alt="프로필 사진" width="80" height="80" />
                ) : (
                  <ProfileImage
                    src={profileDummyImg}
                    style={{ filter: 'brightness(90%)' }}
                    width={60}
                    height={60}
                    alt="profile"
                  />
                )}

                <Box ml={3} display="inline-block">
                  <input id="profile" className="profile-input" type="file" onChange={profileImageChanged} />
                  <label htmlFor="profile">이미지 선택</label>
                </Box>
              </Flex>
              <br />
              <InputLabel>이메일</InputLabel>
              <div className="input">
                <TextField type="text" name="email" placeholder="web@snu.com" onChange={onValueHandle} />
              </div>
              <br />
              <InputLabel>비밀번호</InputLabel>
              <div className="input">
                <TextField type="password" name="password" placeholder="6자 이상의 비밀번호" onChange={onValueHandle} />
              </div>
            </Flex>
            <Flex flexDirection="column">
              <InputLabel>성함</InputLabel>
              <div className="input">
                <TextField type="text" name="name" placeholder="양진환" onChange={onValueHandle} />
              </div>
              <br />
              <InputLabel>휴대폰 번호</InputLabel>
              <div className="input">
                <TextField type="text" name="phone" placeholder="010-xxxx-xxxx" onChange={onValueHandle} />
              </div>
              <br />
              <InputLabel>닉네임</InputLabel>
              <div className="input">
                <TextField type="text" name="nickname" placeholder="양모" onChange={onValueHandle} />
              </div>
              <br />
              <InputLabel>성별</InputLabel>
              <div className="gender-input">
                <div className="gender-select">
                  <RadioGroup aria-label="gender" name="gender" onChange={onValueHandle} row>
                    <FormControlLabel value="남" control={<Radio color="primary" />} label="남" />
                    <FormControlLabel value="여" control={<Radio />} label="여" />
                  </RadioGroup>
                </div>
              </div>
              <br />
              <InputLabel>나이</InputLabel>
              <div className="age-input" style={{ margin: '3px' }}>
                <TextField type="number" name="age" placeholder="20" onChange={onValueHandle} />
              </div>
            </Flex>
          </Flex>
          <Flex mt={3} flexDirection="column" alignItems="center" justifyContent="center">
            {error && (
              <Box mb={2}>
                <Text fontSize={12} fontWeight="bold" color="red">
                  {errorMessage}
                </Text>
              </Box>
            )}
            <Box alignItems="right">
              <Button
                backgroundColor="#7e91bed3"
                hoverBackgroundColor="#7e91be"
                color="white"
                text="가입하기"
                onClick={onSubmit}
              />
              <input type="submit" style={{ display: 'none' }} />
            </Box>
          </Flex>
        </form>
      </PageBody>
    </Flex>
  );
};

export default SignUp;
