import useAdminPageStore from 'store/AdminPageStore';

export default function AdminSideBar() {
  const {
    showUserList,
    showReport,
    showUserDetail,
    showNotice,
    showPost,
    showRental,
    showHashTag,
    showCategory,
  } = useAdminPageStore();
  return (
    <div className="w-1/5 h-full p-4 bg-b-bg-gray select-none">
      <div className="menu_box mb-7">
        <p className="items-center justify-center text-xl font-extrabold mb-1">
          회원 관리
        </p>
        <ul className="text-center text-lg font-semibold">
          <li className="h-10 flex items-center justify-start">
            <a href="#!" onClick={() => showUserList()}>
              <p className="items-center justify-center">회원 목록 조회</p>
            </a>
          </li>
          <li className="h-10 flex items-center justify-start">
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
          <li className="h-10 flex items-center justify-start">
            <a href="#!" onClick={() => showPost()}>
              <p className="items-center justify-center">게시물 조회</p>
            </a>
          </li>
          <li className="h-10 flex items-center justify-start">
            <a href="#!" onClick={() => showNotice()}>
              <p className="items-center justify-center">공지 사항</p>
            </a>
          </li>
          <li className="h-10 flex items-center justify-start">
            <a href="#!" onClick={() => showHashTag()}>
              <p className="items-center justify-center">추천 태그</p>
            </a>
          </li>
          <li className="h-10 flex items-center justify-start">
            <a href="#!" onClick={() => showCategory()}>
              <p className="items-center justify-center">카테고리 관리</p>
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
            <a href="#!" onClick={() => showRental()}>
              <p className="items-center justify-center">대여 현황 조회</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
