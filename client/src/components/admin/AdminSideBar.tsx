import useAdminPageStore from 'store/AdminPageStore';

export default function AdminSideBar() {
  const { showUserList, showReport, showNotice, showPost, showCategory } =
    useAdminPageStore();
  return (
    <div className="w-1/5 min-h-[85vh] p-4 bg-b-bg-gray select-none">
      <div className="menu_box mb-7">
        <p className="items-center justify-center text-xl font-extrabold mb-1">
          회원 관리
        </p>
        <ul className="text-center text-lg font-semibold">
          <li className="h-10 flex items-center justify-start hover:scale-105 hover:ease-in duration-300 hover:text-b-yellow">
            <a href="#!" onClick={() => showUserList()}>
              <p className="items-center justify-center">회원 목록 조회</p>
            </a>
          </li>
          <li className="h-10 flex items-center justify-start hover:scale-105 hover:ease-in duration-300 hover:text-b-yellow">
            <a href="#!" onClick={() => showReport()}>
              <p className="items-center justify-center">신고 내역 관리</p>
            </a>
          </li>
        </ul>
      </div>
      <div className="menu_box mb-7">
        <p className="items-center justify-center text-xl font-extrabold mb-1">
          게시물 관리
        </p>
        <ul className="text-center text-lg font-semibold">
          <li className="h-10 flex items-center justify-start hover:scale-105 hover:ease-in duration-300 hover:text-b-yellow">
            <a href="#!" onClick={() => showPost()}>
              <p className="items-center justify-center">게시물 조회</p>
            </a>
          </li>
          <li className="h-10 flex items-center justify-start hover:scale-105 hover:ease-in duration-300 hover:text-b-yellow">
            <a href="#!" onClick={() => showNotice()}>
              <p className="items-center justify-center">공지 사항</p>
            </a>
          </li>
          <li className="h-10 flex items-center justify-start hover:scale-105 hover:ease-in duration-300 hover:text-b-yellow">
            <a href="#!" onClick={() => showCategory()}>
              <p className="items-center justify-center">카테고리 관리</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
