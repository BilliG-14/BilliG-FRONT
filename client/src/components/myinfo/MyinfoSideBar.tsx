export default function MyInfoSideBar() {
  return (
    <div className="w-1/5 h-full p-4 bg-b-bg-gray">
      <div className="menu_box mb-7">
        <p className="items-center justify-center text-xl font-extrabold mb-1">
          내 정보
        </p>
        <ul className="text-center text-lg font-semibold">
          <li className="h-10 flex items-center justify-start">
            <a href="#!">
              <p className="items-center justify-center">개인정보확인/수정</p>
            </a>
          </li>
        </ul>
      </div>
      <div className="menu_box mb-7">
        <p className="items-center justify-center text-xl font-extrabold mb-1">
          내 활동
        </p>
        <ul className="text-center text-lg font-semibold">
          <li className="h-10 flex items-center justify-start">
            <a href="#!">
              <p className="items-center justify-center">
                빌려주기 게시물 조회
              </p>
            </a>
          </li>
          <li className="h-10 flex items-center justify-start">
            <a href="#!">
              <p className="items-center justify-center">빌리기 게시물 조회</p>
            </a>
          </li>
        </ul>
      </div>
      <div className="menu_box mb-5">
        <p className="items-center justify-center text-xl font-extrabold mb-1">
          내 거래
        </p>
        <ul className="text-center text-lg font-semibold">
          <li className="h-10 flex items-center justify-start">
            <a href="#!">
              <p className="items-center justify-center">
                내가 빌려준 물품 조회
              </p>
            </a>
          </li>
          <li className="h-10 flex items-center justify-start">
            <a href="#!">
              <p className="items-center justify-center">내가 빌린 물품 조회</p>
            </a>
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
