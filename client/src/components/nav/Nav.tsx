import React from 'react';
import { useNavigate } from 'react-router-dom';

function Nav() {
  const navigate = useNavigate();
  const goLogin = () => {
    navigate('/login');
  };
  const goJoin = () => {
    navigate('/join');
  };
  const goMyPage = () => {
    navigate('/mypage');
  };
  return (
    <div>
      <div>
        <h1 className="font-extrabold text-5xl mt-9">B illi G</h1>
        {/* 여기에 빌리지 로고를 넣으면 됩니다! */}
      </div>
      <div>
        <button className="login" onClick={goLogin}></button>
        <button className="join" onClick={goJoin}></button>
        <button className="mypage" onClick={goMyPage}></button>
      </div>
    </div>
  );
}
export default Nav;
