import React from 'react';
import { useDeleteUserStore } from '../../store/MypageStore';

export default function DeleteUser() {
  const { toggleDeleteUser } = useDeleteUserStore();
  return (
    <section className="delete_user">
      <div className="change flex items-center h-18 py-4 border-b border-solid border-gray-200">
        <div className="w-40 text-lg leading-normal font-bold">
          <h3>회원 탈퇴</h3>
        </div>
        <div className="w-full flex items-center justify-start text-base leading-normal">
          <button
            type="button"
            className="w-1/6 h-10 hover:text-white border border-b-tag-done hover:bg-b-tag-done focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            onClick={toggleDeleteUser}
          >
            탈퇴하기
          </button>
        </div>
      </div>
    </section>
  );
}
