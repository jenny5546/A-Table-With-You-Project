import { indigo } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import SendIcon from '@material-ui/icons/Send';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Box, Flex, Image, Text } from 'rebass';
import styled from 'styled-components';
import logo from '../../static/images/logo.png';
import Chat from '../../utils/chat';
import { getPlace, getUser } from '../../utils/util';
import CustomButton from '../button/button';
import Line from '../line/line';
import './chatroom.css';

const ChatInput = styled.input`
  border: 0px;
  width: 82%;
  font-size: 17px;
  margin-left: 5%;
  outline: 0;
`;

const ChatRoom = () => {
  const { placeUid } = useParams();
  const history = useHistory();
  const [userInfo, setUserInfo] = useState(null);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [chat, setChat] = useState(null);

  const onChatInputChange = (e) => {
    setChatInput(e.target.value);
  };

  const onSendMessage = (e) => {
    e.preventDefault();

    chat.sendMessage(chatInput);
  };

  const redirectToMyPage = () => {
    history.push('/mypage');
  };

  useEffect(() => {
    const userData = localStorage.getItem('login-user');
    if (userData) {
      const loginUserData = JSON.parse(userData);
      setUserInfo(loginUserData);

      const matchUser = async () => {
        let targetUser = null;
        const place = await getPlace(placeUid);
        if (place && place.isFinish) {
          targetUser = await getUser(place.targetUserUid);
        }

        if (targetUser) {
          const chatClass = new Chat(loginUserData.uid, targetUser.uid);

          chatClass.openChatRoom().then(() => {
            chatClass.startLoadMessages((data) => {
              setChatMessages((messages) => [...messages, data]);
            });
            setChat(chatClass);
          });
        } else {
          history.replace('/error/400');
        }
      };

      matchUser();
    } else {
      history.replace('/error/401');
    }
  }, [history, placeUid]);

  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight });
  }, [chatMessages]);

  return (
    <div className="Chatroom">
      <div className="chatroom-header">
        <div className="align-right">
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
        </div>
      </div>
      <Line />

      <div className="chat-logo-container">
        <img src={logo} className="logo-image-chatroom" alt="logo" />
      </div>

      <div className="chat-big-container">
        <div className="chat-message-container">
          {userInfo &&
            chatMessages.map((chatMessageData) => {
              return chatMessageData.sender === userInfo.uid ? (
                <div className="chat-sent-by-me">
                  &nbsp;
                  <Text as="span" fontWeight="bold">
                    나 :
                  </Text>
                  {` ${chatMessageData.message}`}
                </div>
              ) : (
                <div className="chat-sent-by-him">
                  <Text as="span" fontWeight="bold">
                    상대방 :
                  </Text>
                  &nbsp;
                  {` ${chatMessageData.message}`}
                </div>
              );
            })}
        </div>
        <div className="chat-send-form">
          <form onSubmit={onSendMessage}>
            <div className="chat-input">
              <ChatInput
                type="text"
                value={chatInput}
                onChange={onChatInputChange}
                placeholder="운명의 상대방에게 말을 걸어보세요"
              />
              <IconButton className="send-button" aria-label="send-message" type="submit">
                <SendIcon style={{ color: indigo[200], fontSize: 50 }} />
              </IconButton>
            </div>
            {/* <div className="send-button"> */}

            {/* </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
