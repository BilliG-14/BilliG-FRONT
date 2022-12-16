import AdminHeader from 'components/admin/AdminHeader';
import AdminMainSection from 'components/admin/AdminMainSection';
import create from 'zustand/react';

// interface adminPageState {

// }
// const useAdminStore = create<adminPageState>((set) => { });
function AdminManageUserSection() {
  return (
    <section className="w-full h-96">
      <div className="h-10 border-b-4 border-b-text-black border-solid text-xl font-semibold text-b-text-black py-1">
        <i className="fa-solid fa-user p-1" />
        <span className="">회원 관리</span>
      </div>
      <div className="flex">
        <ul className="w-1/5 h-full border-r-4 border-b-text-black border- text-center text-lg font-extrabold">
          <li className="h-8 border-b-4 border-b-text-black border-solid">
            <a href="#!">
              <p className="w-full h-8 p-3">item 1</p>
            </a>
          </li>
        </ul>
        <div>메인영역</div>
      </div>
    </section>
  );
}
export default function AdminMain() {
  return (
    <div className="w-screen max-w-screen-lg">
      <AdminHeader />
      {/* <AdminMainSection /> */}
      <AdminManageUserSection />
    </div>
  );
}
