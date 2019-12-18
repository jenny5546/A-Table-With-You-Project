import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getSelectedUser } from '../../utils/auth';
import Chat from '../../utils/chat';

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
    <div>
      <form onSubmit={onSendMessage}>
        {chatMessages.map((chatMessageData) => {
          return <div>{chatMessageData.message}</div>;
        })}
        <input type="text" value={chatInput} onChange={onChatInputChange} />
        <input type="submit" value="입력" />
      </form>
    </div>
  );
};

export default ChatRoom;