import React from 'react';
import UserPanel from './UserPanel';
// import { ChatRooms } from './ChatRooms';
// import { DirectMessages } from './DirectMessages';

function SidePanel({ userInfo }: any) {
  return (
    <div className="bg-amber-400 p-8 min-h-screen text-white min-w-275">
      <UserPanel user={userInfo} />

      {/* <ChatRooms /> */}

      {/* <DirectMessages /> */}
    </div>
  );
}

export default SidePanel;
