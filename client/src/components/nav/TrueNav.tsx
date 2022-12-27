import React, { useState } from 'react';
import api from '../../api/customAxios';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useIsLoginStore } from 'store/LoginJoinStore';
import { usePasswordEditStore } from 'store/MypageStore';
// components
import GoWriteBtn from './GoWriteBtn';
import WriteBtns from './WriteBtns';
import MenuButton from 'components/MenuButton/MenuButton';
// react icons
import { FiSearch } from 'react-icons/fi';
import { FaRegSmileWink } from 'react-icons/fa';
import { BsFilePersonFill } from 'react-icons/bs';
import { RiLogoutCircleFill } from 'react-icons/ri';

function TrueNav() {
  const [onWriteBtn, setOnWriteBtn] = useState(false);
  const navigate = useNavigate();
  const { setIsLoginFalse } = useIsLoginStore();
  const { togglePwfalse } = usePasswordEditStore();

  const handleLogout = async () => {
    setIsLoginFalse();
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    togglePwfalse();
    navigate('/submain');
  };

  const { isLoading, data: userInfo } = useQuery(
    ['userInfo'],
    async () => {
      return api.get(`/user/${localStorage.getItem('userId')}`);
    },
    {
      refetchOnWindowFocus: false,
    },
  );

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex justify-between pr-5 h-40 mt-1 select-none">
      <MenuButton />
      <div className="flex flex-col justify-center">
        <div className="flex justify-between items-center w-72 text-lg font-semibold">
          <div>
            <button
              type="button"
              className="nickname flex text-blue-700 font-bold ease-in-out duration-300"
            >
              <span>
                <FaRegSmileWink className="text-xl mr-1" />
              </span>
              <span className="text-sm">{`${userInfo?.data.nickName} 님`}</span>
            </button>
          </div>
          <div>
            <button
              type="button"
              className="mypage flex hover:text-b-yellow hover:scale-110 ease-in-out duration-300"
              onClick={() => {
                navigate('/mypage');
              }}
            >
              <span>
                <BsFilePersonFill className="text-xl mr-1" />
              </span>
              <span className="text-sm">MY PAGE</span>
            </button>
          </div>
          <div>
            <button
              type="button"
              className="mypage flex hover:text-b-yellow hover:scale-110 ease-in-out duration-300"
              onClick={handleLogout}
            >
              <span>
                <RiLogoutCircleFill className="text-xl mr-1" />
              </span>
              <span className="text-sm">LOGOUT</span>
            </button>
          </div>
        </div>
        <div className="flex justify-end text-3xl mt-5">
          {onWriteBtn ? (
            <WriteBtns setOnWriteBtn={setOnWriteBtn} />
          ) : (
            <GoWriteBtn setOnWriteBtn={setOnWriteBtn} />
          )}
          <button
            type="button"
            className="search hover:text-b-yellow hover: ease-in-out duration-300"
            onClick={() => {
              navigate('/search');
            }}
          >
            <FiSearch />
          </button>
        </div>
      </div>
    </div>
  );
}
export default TrueNav;
