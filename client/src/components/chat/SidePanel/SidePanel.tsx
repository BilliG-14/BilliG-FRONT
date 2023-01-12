import React from 'react';
import ChatRoomList from './ChatRoomList';
import UserPanel from './UserPanel';
import { UserType } from 'types/userType';
import { ChatRoomType } from 'types/chatType';
import { Socket } from 'socket.io-client';
function SidePanel({
  user,
  chatRoomList,
  socket,
}: {
  user: UserType;
  chatRoomList: ChatRoomType[];
  socket: Socket;
}) {
  return (
    <div className="bg-amber-400 text-white min-h-[920px] max-h-[1000px] pb-4 rounded-l-xl dark:bg-b-dark-yellow">
      <UserPanel user={user} />
      <ChatRoomList chatRoomList={chatRoomList} socket={socket} user={user} />
    </div>
  );
}

export default SidePanel;
