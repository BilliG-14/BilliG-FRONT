import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { useLoginJoinStore } from 'store/LoginJoinStore';
import api from '../../api/customAxios';
import MenuButton from 'components/MenuButton/MenuButton';

function TrueNav() {
  const [setSelectedJoin, setSelectedLogin] = useLoginJoinStore((state) => [
    state.setSelectedJoin,
    state.setSelectedLogin,
  ]);
  const navigate = useNavigate();
  const goHome = () => {
    navigate('/');
  };
  const goLogin = () => {
    setSelectedLogin();
    navigate('/login');
  };
  const goJoin = () => {
    setSelectedJoin();
    navigate('/login');
  };
  const goMyPage = async () => {
    const userinfo = await api.get('/user/me');
    console.log(userinfo);
    navigate('/mypage');
  };
  const goSearch = () => {
    navigate('/search');
  };
  return (
    <div className="flex justify-between pr-5 h-32">
      <MenuButton />
      <div className="flex flex-col justify-center">
        <div className="flex justify-between items-center w-52 text-lg font-semibold">
          <button
            className="join hover:text-b-yellow hover: ease-in-out duration-300"
            onClick={goJoin}
          >
            로그인이지롱
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
export default TrueNav;
