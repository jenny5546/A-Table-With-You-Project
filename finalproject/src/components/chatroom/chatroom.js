import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getSelectedUser } from '../../utils/auth';
import Chat from '../../utils/chat';
import logo from '../../static/images/logo.png';
import { Box, Flex, Image, Text } from 'rebass';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import { indigo } from '@material-ui/core/colors';
import './chatroom.css';
import styled from 'styled-components';

const ChatInput = styled.input`
  border: 0px;
  width: 82%;
  font-size: 17px;
  margin-left: 5%;
  outline: 0;
`;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ChatRoom = () => {
  let query = useQuery();
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
  // var targetUser=0;
  var targetUserProfile = '';
  useEffect(() => {
    const userData = localStorage.getItem('login-user');
    if (userData) {
      const loginUserData = JSON.parse(userData);
      getSelectedUser(query.get('target')).then((users) => {
        if (users.length > 0) {
          const targetUser = users[0];
          const chat = new Chat(loginUserData.uid, targetUser.uid);

          chat.openChatRoom().then((roomId) => {
            console.log(roomId);
            chat.startLoadMessages((data) => {
              console.log(data);
              setChatMessages((messages) => [...messages, data]);
            });
            setChat(chat);
          });
        }
      });
    }
  }, []);
  return (
    <div className="Chatroom">
      <div className="chatroom-header">
        <div className="align-right">
          <Box display="inline-block">
            <Flex alignItems="center">
              <Image
                src={JSON.parse(localStorage.getItem('login-user')).profileImagePath}
                sx={{ borderRadius: '50%' }}
                width="50px"
                height="50px"
              />
              <Text as="span" mx="15px" fontSize={18} color="#7e91be;">
                <Text as="span" fontWeight="bold">
                  {JSON.parse(localStorage.getItem('login-user')).nickname}
                </Text>
                님, 안녕하세요.
              </Text>
              <Link to="/mypage" className="mypage-button">
                마이 페이지
              </Link>
              <Link to="/">
                <IconButton aria-label="go to home">
                  <HomeIcon style={{ color: indigo[200] }} />
                </IconButton>
              </Link>
            </Flex>
          </Box>
        </div>
      </div>
      <div className="Line" />

      <div className="chat-logo-container">
        <img src={logo} className="logo-image-chatroom" alt="logo" />
      </div>

      <div className="chat-big-container">
        <div className="chat-message-container">
          {chatMessages.map((chatMessageData) => {
            return chatMessageData.sender === JSON.parse(localStorage.getItem('login-user')).uid ? (
              <div className="chat-sent-by-me">
                &nbsp; <p10>나: </p10>
                {chatMessageData.message}
              </div>
            ) : (
              <div className="chat-sent-by-him">
                &nbsp;<p10>상대방: &nbsp; &nbsp; </p10> {chatMessageData.message}
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
