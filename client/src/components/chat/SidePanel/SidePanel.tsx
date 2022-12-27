import React from 'react';
import ChatRoomList from './ChatRoomList';
import UserPanel from './UserPanel';
// import { ChatRooms } from './ChatRooms';
// import { DirectMessages } from './DirectMessages';

function SidePanel({ user, chatRoomList }: any) {
  return (
    <div className="bg-amber-400 min-h-screen text-white min-w-275">
      <UserPanel user={user} />
      <ChatRoomList chatRoomList={chatRoomList} />
      {/* <ChatRooms /> */}

      {/* <DirectMessages /> */}
    </div>
  );
}

export default SidePanel;
