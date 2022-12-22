import React from 'react';
import SidePanel from './SidePanel/SidePanel';
import MainPanel from './MainPanel/MainPanel';
import getUserInfo from './getUserInfo';

function ChatPage() {
  const { userInfo, uid } = getUserInfo();
  return (
    <div className="flex">
      <div className="w-1/5">
        <SidePanel key={userInfo && uid} />
        대충사이드패널
      </div>
      <div className="w-full">
        {/* <MainPanel key={currentChatRoom && currentChatRoom.id} /> */}
        대충메인패널
      </div>
    </div>
  );
}

export default ChatPage;
