import React, { useState, useEffect } from 'react';
import SidePanel from './SidePanel/SidePanel';
import MainPanel from './MainPanel/MainPanel';
import { getUserInfo } from '../../api/user-api';
import { getChatRooms } from '../../api/chat-api';
import { io } from 'socket.io-client';

const socket = io('http://34.64.44.34:3003/chat', {
  transports: ['websocket'],
});
/** 추후 any 바꾸기! */
function Chat() {
  /** user 정보 가져오기 */
  const [userInfo, setUserInfo] = useState();
  const setUserInfoData = async () => {
    /** 추후 any 바꾸기! */
    const user: any = await getUserInfo();
    setUserInfo(user.data);
  };
  useEffect(() => {
    setUserInfoData();
  }, []);

  /** 채팅방 목록 정보 가져오기 */
  const [chatRoomsInfo, setChatRoomsInfo] = useState();
  const setChatRoomsInfoData = async () => {
    /** 추후 any 바꾸기! */
    const chatRooms: any = await getChatRooms();
    setChatRoomsInfo(chatRooms);
  };
  useEffect(() => {
    setChatRoomsInfoData();
  }, []);

  return (
    <>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex max-w-screen-lg mx-auto">
          <div className="w-1/5">
            <SidePanel
              key={userInfo && true}
              user={userInfo}
              chatRoomList={chatRoomsInfo}
              socket={socket}
            />
          </div>
          <div className="w-4/5">
            <MainPanel
              key={userInfo && true}
              user={userInfo}
              chatRoomList={chatRoomsInfo}
              socket={socket}
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default Chat;
