import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { ConversationList, Conversation, Avatar } from '@chatscope/chat-ui-kit-react';
import default_user from '../../assets/default_user.png';
import { format, parse } from 'date-fns';

const SidebarContainer = styled.div`
  width: 300px;
  border-right: 1px solid #e0e0e0;
  height: 100vh;
  background-color: #f5f5f5;
  overflow-y: auto;
`;

const StyledConversation = styled(Conversation)`
  &:hover {
    background-color: #e8e8e8;
  }
`;

const ChatRoom = ({ onChatroomSelect }) => {
  const [chatrooms, setChatrooms] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/chatrooms', {
      params: { id: 1 } // 여기에 실제 memberId를 넣어야 합니다.
    })
    .then(response => {
      console.log('Chatrooms data:', response.data);
      setChatrooms(response.data);
    })
    .catch(error => {
      console.error('There was an error fetching the chatrooms!', error);
    });
  }, []);

  const formatTime = (timeString) => {
    const time = parse(timeString, 'HH:mm:ss', new Date());
    return format(time, 'HH:mm:ss');
  };

  return (
      <SidebarContainer>
        <ConversationList>
          {chatrooms.length > 0 ? (
              chatrooms.map(chatroom => (
                  <StyledConversation
                      key={chatroom.id}
                      name={`${chatroom.nickname} - ${chatroom.location}`}
                      info={`${chatroom.latestMessage || '새로운 채팅방입니다.'} (${formatTime(chatroom.latestTime)})`}
                      onClick={() => onChatroomSelect(chatroom.id)}
                  >
                    <Avatar src={default_user} name={chatroom.location} />
                  </StyledConversation>
              ))
          ) : (
              <div>채팅방이 없습니다.</div>
          )}
        </ConversationList>
      </SidebarContainer>
  );
}

export default ChatRoom;