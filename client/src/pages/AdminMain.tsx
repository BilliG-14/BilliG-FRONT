import AdminHeader from 'components/admin/AdminHeader';
import AdminMainSection from 'components/admin/AdminMainSection';
import create from 'zustand/react';

// interface adminPageState {

// }
// const useAdminStore = create<adminPageState>((set) => { });
function AdminManageUserSection() {
  return (
    <section className="w-full h-full">
      <div className="h-14 border-b-4 border-b-text-black border-solid text-xl font-semibold text-b-text-black py-1 px-4 flex items-center">
        <i className="fa-solid fa-user p-1 mr-2" />
        <span className="block">회원 관리</span>
      </div>
      <div className="flex h-full">
        <AdminSideBar />
        <div>메인영역</div>
      </div>
    </section>
  );
}

export default function AdminSideBar() {
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
