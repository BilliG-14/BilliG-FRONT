import { Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { usePasswordEditStore } from 'store/MypageStore';

export default function MyInfoSideBar() {
  const client = useQueryClient();
  const { togglePwfalse } = usePasswordEditStore();
  return (
    <div className="w-1/5 h-full p-4 bg-b-bg-gray">
      <div className="menu_box mb-7">
        <p className="items-center justify-center text-2xl font-extrabold mb-1">
          내 정보
        </p>
        <ul className="text-center text-lg font-semibold">
          <li className="h-10 flex items-center justify-start hover:scale-105 hover:ease-in duration-300 hover:text-b-yellow">
            <Link to="/mypage">개인정보확인/수정</Link>
          </li>
        </ul>
      </div>
      <div className="menu_box mb-7">
        <p className="items-center justify-center text-2xl font-extrabold mb-1">
          내 활동
        </p>
        <ul className="text-center text-lg font-semibold">
          <li
            className="h-10 flex items-center justify-start hover:scale-105 hover:ease-in duration-300 hover:text-b-yellow"
            onClick={() => {
              client.invalidateQueries([
                `giveList/1`,
                `${localStorage.getItem('userId')}`,
              ]);
              togglePwfalse();
            }}
          >
            <Link to="/mypage/lendlist">빌려주기 게시물 조회</Link>
          </li>
          <li
            className="h-10 flex items-center justify-start hover:scale-105 hover:ease-in duration-300 hover:text-b-yellow"
            onClick={() => {
              client.invalidateQueries([
                `borrowList/1`,
                `${localStorage.getItem('userId')}`,
              ]);
              togglePwfalse();
            }}
          >
            <Link to="/mypage/borrowlist">빌리기 게시물 조회</Link>
          </li>
        </ul>
      </div>
      <div className="menu_box mb-5">
        <p className="items-center justify-center text-2xl font-extrabold mb-3">
          내 거래
        </p>
        <ul className="text-center text-lg font-semibold">
          <li className="h-10 flex w-full text-xl font-bold items-center justify-start border-solid border-b-2 border-gray-300">
            <p>거래중인 물품</p>
          </li>
          <li
            className="h-10 flex items-center justify-start hover:scale-105 hover:ease-in duration-300 hover:text-b-yellow"
            onClick={() => {
              client.invalidateQueries([
                `lendDealList/1`,
                `${localStorage.getItem('userId')}`,
              ]);
              togglePwfalse();
            }}
          >
            <Link to="/mypage/lenddeallist">빌려주기 조회</Link>
          </li>
          <li
            className="h-10 flex items-center justify-start mb-3 hover:scale-105 hover:ease-in duration-300 hover:text-b-yellow"
            onClick={() => {
              client.invalidateQueries([
                `borrowDealList/1`,
                `${localStorage.getItem('userId')}`,
              ]);
              togglePwfalse();
            }}
          >
            <Link to="/mypage/borrowdeallist">빌리기 조회</Link>
          </li>
          <li className="h-10 flex w-full text-xl font-bold items-center justify-start border-solid border-b-2 border-gray-300">
            <p>거래완료 물품</p>
          </li>
          <li
            className="h-10 flex items-center justify-start hover:scale-105 hover:ease-in duration-300 hover:text-b-yellow"
            onClick={() => {
              client.invalidateQueries([
                `lendDoneList/1`,
                `${localStorage.getItem('userId')}`,
              ]);
              togglePwfalse();
            }}
          >
            <Link to="/mypage/donelendlist">빌려주기 완료 조회</Link>
          </li>
          <li
            className="h-10 flex items-center justify-start hover:scale-105 hover:ease-in duration-300 hover:text-b-yellow"
            onClick={() => {
              client.invalidateQueries([
                `borrowDoneList/1`,
                `${localStorage.getItem('userId')}`,
              ]);
              togglePwfalse();
            }}
          >
            <Link to="/mypage/doneborrowlist">빌리기 완료 조회</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
