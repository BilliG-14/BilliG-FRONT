import React, { useState, useEffect } from 'react';
import SidePanel from './SidePanel/SidePanel';
import { MainPanel } from './MainPanel/MainPanel';
import getUserInfo from './getUserInfo';
import { chatRoomStore } from '../../store/ChatStore';

function ChatPage() {
  const [userInfo, setUserInfo] = useState();

  const setUserInfoData = async () => {
    const user = await getUserInfo();
    setUserInfo(user.data);
  };
  useEffect(() => {
    setUserInfoData();
  }, []);
  return (
    <div className="flex">
      <div className="w-1/5">
        <SidePanel key={userInfo && userInfo._id} />
      </div>
      <div className="w-full">
        {/* <MainPanel
          key={
            initialChatRoomState.currentChatRoom &&
            initialChatRoomState.currentChatRoom.id
          } 
        />*/}
        메인패널
      </div>
    </div>
  );
}

export default ChatPage;
