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
          src="https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F9948F536603072310A" //user.data.image
          className="w-30 h-30 mt-3 rounded-full"
          alt="사용자이미지"
        />

        <div>{user && user.data.nickName}</div>
      </div>
    </div>
  );
}

export default UserPanel;
