import React from 'react';
import { IoIosChatboxes } from 'react-icons/io';
import getUserInfo from '../getUserInfo';
function UserPanel() {
  const { user } = getUserInfo;

  return (
    <div>
      {/* Logo */}
      <h3 className="text-white">
        <IoIosChatboxes /> Chat App
      </h3>

      <div className="flex m-4">
        <img
          // src={user && user.photoURL} // url은 추후 다시 ...
          src="../../../../public/logo512.png"
          className="w-30 h-30 mt-3 rounded-full"
          alt="사용자이미지"
        />

        <div>{user && user.data.nickName}</div>
      </div>
    </div>
  );
}

export default UserPanel;
