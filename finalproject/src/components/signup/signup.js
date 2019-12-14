import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import logo from '../../static/images/logo.png';
import './signup.css';
import { Box, Flex, Text } from 'rebass';
import styled from 'styled-components';
import Button from '../button/button';
import { signUp, SignupError } from '../../utils/auth';
import { Redirect } from 'react-router-dom';

const InputLabel = styled.div`
  font-size: 12px;
  font-weight: bold;
  padding-left: 5px;
`;

const SignUp = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [signUpInfo, setSignUpInfo] = useState({});
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [redirect, setRedirect] = useState(false);

  const profileImageChanged = (e) => {
    if (e.target.files[0]) {
      setProfileImage(e.target.files[0]);
      setProfileImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const onValueHandle = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

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
      profileImage: profileImage,
      email: signUpInfo.email,
      password: signUpInfo.password,
      nickname: signUpInfo.nickname,
      gender: signUpInfo.gender,
      name: signUpInfo.name,
      age: signUpInfo.age,
      phone: signUpInfo.phone,
    })
      .then(() => {
        setRedirect(true);
      })
      .catch((err) => {
        setError(true);
        if (err.code === SignupError.ALREADY_EMAIL_USE) {
          setErrorMessage('이미 사용중인 이메일 주소입니다.');
        } else if (err.code === SignupError.INVALID_EMAIL) {
          setErrorMessage('올바르지 않은 이메일 주소 형식입니다.');
        } else if (err.code === SignupError.OPERATION_NOT_ALLOWED) {
          setErrorMessage('현재 회원가입이 불가능합니다.');
        } else if (err.code === SignupError.WEAK_PASSWORD) {
          setErrorMessage('비밀번호는 최소 6자 이상으로 구성해주세요.');
        } else {
          setErrorMessage('오류가 발생했습니다.');
        }
      });
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <div className="Signup">
      <header className="Signup-header">
        <img src={logo} className="logo-image" alt="logo" />
      </header>

      <div className="Signup-body">
        <form className="Signup-form">
          <div className="Signup-title">회원가입</div>
          <br />
          <Flex>
            <Flex flexDirection="column">
              <InputLabel>프로필 사진</InputLabel>
              <Flex mt={2} mb={2} alignItems="center">
                {profileImage ? (
                  <img
                    src={profileImageUrl}
                    className="profile-image"
                    alt="프로필 사진"
                    width="60"
                    height="60"
                  />
                ) : (
                  <Box
                    display="inline-block"
                    className="profile-image"
                    backgroundColor="#ccc"
                    width={60}
                    height={60}
                  />
                )}

                <Box ml={3} display="inline-block">
                  <input
                    id="profile"
                    className="profile-input"
                    type="file"
                    onChange={profileImageChanged}
                  />
                  <label htmlFor="profile">이미지 선택</label>
                </Box>
              </Flex>

              <InputLabel>이메일</InputLabel>
              <div className="input">
                <TextField
                  type="text"
                  name="email"
                  placeholder="web@snu.com"
                  onChange={onValueHandle}
                />
              </div>
              <InputLabel>비밀번호</InputLabel>
              <div className="input">
                <TextField
                  type="password"
                  name="password"
                  placeholder="6자 이상의 비밀번호"
                  onChange={onValueHandle}
                />
              </div>
            </Flex>
            <Flex flexDirection="column">
              <InputLabel>성함</InputLabel>
              <div className="input">
                <TextField type="text" name="name" placeholder="양진환" onChange={onValueHandle} />
              </div>
              <InputLabel>휴대폰 번호</InputLabel>
              <div className="input">
                <TextField
                  type="text"
                  name="phone"
                  placeholder="010-xxxx-xxxx"
                  onChange={onValueHandle}
                />
              </div>

              <InputLabel>닉네임</InputLabel>
              <div className="input">
                <TextField
                  type="text"
                  name="nickname"
                  placeholder="양모"
                  onChange={onValueHandle}
                />
              </div>
              <InputLabel>성별</InputLabel>
              <div className="gender-input">
                <div className="gender-select">
                  <input type="radio" name="gender" value="남" onChange={onValueHandle} />남
                  <input type="radio" name="gender" value="여" onChange={onValueHandle} />여
                </div>
              </div>
              <InputLabel>나이</InputLabel>
              <div className="age-input">
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
            <Box>
              <Button backgroundColor="black" color="white" text="가입하기" onClick={onSubmit} />
            </Box>
          </Flex>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
