import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import useLoginJoinStore from 'store/LoginJoinStore';

function Nav() {
  const setSelectedJoin = useLoginJoinStore((state) => state.setSelectedJoin);
  const navigate = useNavigate();
  const goHome = () => {
    navigate('/');
  };
  const goLogin = () => {
    navigate('/login');
  };
  const goJoin = () => {
    setSelectedJoin();
    navigate('/login');
  };
  const goMyPage = () => {
    navigate('/mypage');
  };
  const goSearch = () => {
    navigate('/search');
  };
  return (
    <div className="flex justify-between pr-5 h-32">
      <div>
        <button
          className="home  hover:text-b-yellow hover: ease-in-out duration-300"
          onClick={goHome}
        >
          <h1 className="font-extrabold text-5xl mt-9">B illi G</h1>
        </button>
        {/* 위의 button과 h1태그를 지우고 여기에 빌리지 로고를 넣으면 됩니다! */}
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex justify-between items-center w-52 text-lg font-semibold">
          <button
            className="login hover:text-b-yellow hover: ease-in-out duration-300"
            onClick={goLogin}
          >
            login
          </button>
          /
          <button
            className="join hover:text-b-yellow hover: ease-in-out duration-300"
            onClick={goJoin}
          >
            join
          </button>
          /
          <button
            className="mypage hover:text-b-yellow hover: ease-in-out duration-300"
            onClick={goMyPage}
          >
            myPage
          </button>
        </div>
        <div className="flex justify-end text-3xl mt-5">
          <button
            className="search hover:text-b-yellow hover: ease-in-out duration-300"
            onClick={goSearch}
          >
            <FiSearch />
          </button>
        </div>
      </div>
    </div>
  );
}
export default Nav;
