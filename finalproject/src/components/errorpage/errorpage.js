import React from 'react';
import { Flex, Text } from 'rebass';
import logo from '../../static/images/header-logo.png';
import Line from '../line/line';
import { useParams } from 'react-router-dom';

const ErrorPage = () => {
  const { code } = useParams();
  return (
    <Flex
      sx={{
        height: '100%',
        flexFlow: 'column',
      }}
    >
      <Flex flexDirection="column" p={3}>
        <Flex justifyContent="space-between">
          <img src={logo} className="logo-image-mypage" alt="logo" />
        </Flex>

        <Line />
      </Flex>

      <Flex sx={{ flexGrow: 1 }} justifyContent="center" alignItems="center">
        <Text fontSize={20} fontWeight="bold">
          {code === '401' && '로그인을 해주세요.'}
          {code === '400' && '잘못된 접근입니다.'}
        </Text>
      </Flex>
    </Flex>
  );
};
export default ErrorPage;
