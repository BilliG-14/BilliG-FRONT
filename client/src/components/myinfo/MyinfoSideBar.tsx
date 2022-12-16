export default function MyInfoSideBar() {
  return (
    <div className="w-1/5 h-full p-4 bg-b-bg-gray">
      <div className="menu_box mb-7">
        <p className="items-center justify-center text-xl font-extrabold mb-1">
          회원 관리
        </p>
        <ul className="text-center text-lg font-semibold">
          <li className="h-10 flex items-center justify-start">
            <a href="#!">
              <p className="items-center justify-center">회원 목록 조회</p>
            </a>
          </li>
          <li className="h-10 flex items-center justify-start">
            <a href="#!">
              <p className="items-center justify-center">회원 상세 관리</p>
            </a>
          </li>
        </ul>
      </div>
      <div className="menu_box mb-7">
        <p className="items-center justify-center text-xl font-extrabold mb-1">
          게시물 관리
        </p>
        <ul className="text-center text-lg font-semibold">
          <li className="h-10 flex items-center justify-start">
            <a href="#!">
              <p className="items-center justify-center">게시물 조회</p>
            </a>
          </li>
        </ul>
      </div>
      <div className="menu_box mb-5">
        <p className="items-center justify-center text-xl font-extrabold mb-1">
          대여 관리
        </p>
        <ul className="text-center text-lg font-semibold">
          <li className="h-10 flex items-center justify-start">
            <a href="#!">
              <p className="items-center justify-center">대여 현황 조회</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
