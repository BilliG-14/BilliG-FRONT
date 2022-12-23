import React from 'react';
import SidePanel from './SidePanel/SidePanel';
import MainPanel from './MainPanel/MainPanel';
import getUserInfo from './getUserInfo';
import { chatRoomStore } from '../../store/ChatStore';
function ChatPage() {
  const { userInfo, uid } = getUserInfo();
  const { initialChatRoomState } = chatRoomStore;
  return (
    <div className="flex">
      <div className="w-1/5">
        <SidePanel key={userInfo && uid} />
      </div>
      <div className="w-full">
        <MainPanel
          key={
            initialChatRoomState.currentChatRoom &&
            initialChatRoomState.currentChatRoom.id
          }
        />
      </div>
    </div>
  );
}

export default ChatPage;
