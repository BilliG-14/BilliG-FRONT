import AdminHeader from 'components/admin/AdminHeader';
import create from 'zustand/react';
import AdminSideBar from 'components/admin/AdminSideBar';
import AdminUserListSection from 'components/admin/AdminUserListSection';
// interface adminPageState {

// }
// const useAdminStore = create<adminPageState>((set) => { });

export default function AdminMain() {
  return (
    <div className="h-full w-screen max-w-screen-lg m-auto">
      <AdminHeader />
      <section className="max-w-screen-lg h-full">
        <div className="flex h-full">
          <AdminSideBar />
          <AdminUserListSection />
        </div>
      </section>
    </div>
  );
}
