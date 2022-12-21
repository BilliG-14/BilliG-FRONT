import React from 'react';
import SidePanel from './SidePanel/SidePanel';
import MainPanel from './MainPanel/MainPanel';
import { useSelector } from 'react-redux';

function ChatPage() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentChatRoom = useSelector(
    (state) => state.chatRoom.currentChatRoom,
  );
  return (
    <div className="flex">
      <div className="w-1/5">
        <SidePanel key={currentUser && currentUser.uid} />
      </div>
      <div className="w-full">
        <MainPanel key={currentChatRoom && currentChatRoom.id} />
      </div>
    </div>
  );
}

export default ChatPage;
