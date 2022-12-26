import React, { useCallback, useEffect } from 'react';
import Content from '../Content/Content';
import SideBar from '../SideBar/SideBar';
import { useState } from 'react';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
function Chat({ chatService, username, baseURL }: any) {
  return (
    <div className="app">
      <SideBar
        roomList={myChatList}
        addMyChat={addMyChat}
        message={message}
        currentRoom={currentRoom}
        onClickRoom={onClickRoom}
        onRoomListBtn={onRoomListBtn}
        onNewChatBtn={onNewChatBtn}
        username={username}
      />
      <Content
        roomList={...activedRooms}
        currentRoom={currentRoom}
        onClickRoom={onClickRoom}
        addMyChat={addMyChat}
        user={username}
        sendMessage={sendMessage}
        messages={messages}
        users={users}
        myChatList={myChatList}
        message={message}
      />
    </div>
  );
}
export default Chat;
