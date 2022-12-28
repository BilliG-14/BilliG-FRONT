import React from 'react';
import ChatRoomList from './ChatRoomList';
import UserPanel from './UserPanel';

function SidePanel({ user, chatRoomList, socket }: any) {
  return (
    <div className="bg-amber-400 text-white min-h-[920px] max-h-[1000px] pb-4 rounded-l-xl">
      <UserPanel user={user} />
      <ChatRoomList chatRoomList={chatRoomList} socket={socket} />
    </div>
  );
}

export default SidePanel;
