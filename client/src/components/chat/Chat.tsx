import React, { useState, useEffect } from 'react';
import SidePanel from './SidePanel/SidePanel';
import MainPanel from './MainPanel/MainPanel';
import getUserInfo from './getUserInfo';

/** 추후 any 바꾸기! */
function Chat({ chatService, baseURL }: any) {
  const [userInfo, setUserInfo] = useState();
  const setUserInfoData = async () => {
    /** 추후 any 바꾸기! */
    const user: any = await getUserInfo();
    setUserInfo(user.data);
  };
  useEffect(() => {
    setUserInfoData();
  }, []);
  return (
    <div className="flex max-w-screen-lg mx-auto">
      <div className="w-1/5">
        <SidePanel key={userInfo && true} user={userInfo} />
      </div>
      <div className="w-4/5">
        <MainPanel key={userInfo && true} user={userInfo} />
      </div>
    </div>
  );
}
export default Chat;
