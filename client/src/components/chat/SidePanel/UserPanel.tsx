import React, { useEffect, useState } from 'react';
import { IoIosChatboxes } from 'react-icons/io';
import getUserInfo from '../getUserInfo';
import { useNavigate } from 'react-router-dom';

/** 추후 any 바꾸기! */
function UserPanel({ user }: any) {
  const navigate = useNavigate();
  console.log('user', user.image);
  return (
    <div className="w-full h-full px-2">
      {/* Logo */}
      <div className="text-white text-2xl p-4">
        <button onClick={() => navigate('/chat')}>
          <IoIosChatboxes className="text-4xl" /> BilliG Tok
        </button>
      </div>

      <div className="flex mt-6 flex-col w-full px-6">
        <img
          // src={user && user.photoURL} // url은 추후 다시 ...
          src={user && user.image}
          className="w-32 h-32 rounded-full object-cover border border-solid border-gray-300 bg-white"
          alt="사용자이미지"
        />
        <div className="text-center mt-5 font-semibold text-lg">
          {user?.nickName}
        </div>
      </div>
      <hr className="mt-2 w-full h-1 border-2 border-white" />
    </div>
  );
}

export default UserPanel;
