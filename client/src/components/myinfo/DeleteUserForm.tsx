import ConfirmModal from 'components/Modal';
import React, { FormEvent, useCallback, useRef, useState } from 'react';
import { useDeleteUserStore } from '../../store/MypageStore';
import api from '../../api/customAxios';
import { useNavigate } from 'react-router-dom';
import { useIsLoginStore } from 'store/LoginJoinStore';

export default function DeleteUserForm() {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);
  const { toggleDeleteUser } = useDeleteUserStore();
  const { setIsLoginFalse } = useIsLoginStore();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!passwordRef.current?.value) return;
    const password = passwordRef.current?.value;
    const confirmPW = await api.post('/user/checkPassword', {
      password,
    });
    if (confirmPW?.data.isCorrect) {
      onClickToggleModal();
    } else {
      alert('올바른 비밀번호가 아닙니다.');
    }
  };

  const handleDeleteUser = async () => {
    await api.delete('/user');
    toggleDeleteUser();
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    setIsLoginFalse();
    navigate('/submain/lend');
  };

  return (
    <section>
      <div className="change flex items-center h-18 py-4 border-b border-solid border-gray-200">
        <div className="w-40 text-lg leading-normal font-bold">
          <h3>회원 탈퇴</h3>
        </div>
        <form
          className="w-full flex items-center justify-start text-base leading-normal"
          onSubmit={handleSubmit}
        >
          <input
            type="password"
            placeholder="비밀번호를 입력하세요."
            name="password"
            ref={passwordRef}
            // onChange={handleChange}
            className="w-3/5 font-medium border border-solid border-gray-300 py-2 px-2 rounded-lg focus:border-b-tag-done focus:outline-none mb-1 mr-2"
          />
          <button
            type="submit"
            className="w-1/6 h-10 hover:text-white border border-b-tag-done hover:bg-b-tag-done focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            탈퇴하기
          </button>
        </form>
      </div>
      {isOpenModal && (
        <ConfirmModal
          title="정말 탈퇴하시겠습니까?"
          content="탈퇴한 계정은 복구할 수 없습니다."
          yesColor="red-400"
          yesText="탈퇴"
          onClickToggleModal={onClickToggleModal}
          onClickYes={() => {
            try {
              handleDeleteUser();
            } catch (error) {
              console.log(error);
            }
          }}
        />
      )}
    </section>
  );
}
