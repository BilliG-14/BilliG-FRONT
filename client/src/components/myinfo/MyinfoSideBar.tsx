import { Link } from 'react-router-dom';

export default function MyInfoSideBar() {
  return (
    <div className="w-1/5 h-full p-4 bg-b-bg-gray">
      <div className="menu_box mb-7">
        <p className="items-center justify-center text-2xl font-extrabold mb-1">
          내 정보
        </p>
        <ul className="text-center text-lg font-semibold">
          <li className="h-10 flex items-center justify-start">
            <Link to="/mypage">개인정보확인/수정</Link>
          </li>
        </ul>
      </div>
      <div className="menu_box mb-7">
        <p className="items-center justify-center text-2xl font-extrabold mb-1">
          내 활동
        </p>
        <ul className="text-center text-lg font-semibold">
          <li className="h-10 flex items-center justify-start">
            <Link to="/mypage/givelist">빌려주기 게시물 조회</Link>
          </li>
          <li className="h-10 flex items-center justify-start">
            <Link to="/mypage/borrowlist">빌리기 게시물 조회</Link>
          </li>
        </ul>
      </div>
      <div className="menu_box mb-5">
        <p className="items-center justify-center text-2xl font-extrabold mb-1">
          내 거래
        </p>
        <ul className="text-center text-lg font-semibold">
          <li className="h-10 flex w-full text-xl font-bold items-center justify-start border-solid border-b-2 border-gray-300">
            <p>거래중인 물품</p>
          </li>
          <li className="h-10 flex items-center justify-start">
            <Link to="#">빌려주기 조회</Link>
          </li>
          <li className="h-10 flex items-center justify-start">
            <Link to="#">빌리기 조회</Link>
          </li>
          <li className="h-10 flex w-full text-xl font-bold items-center justify-start border-solid border-b-2 border-gray-300">
            <p>거래완료 물품</p>
          </li>
          <li className="h-10 flex items-center justify-start">
            <Link to="/mypage/donegivelist">빌려주기 완료 조회</Link>
          </li>
          <li className="h-10 flex items-center justify-start">
            <Link to="/mypage/doneborrowlist">빌리기 완료 조회</Link>
          </li>
          <li className="h-10 flex items-center justify-start">
            <a href="#!">
              <p className="items-center justify-center">수익금 조회</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
