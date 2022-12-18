import AdminHeader from 'components/admin/AdminHeader';
import create from 'zustand/react';
import AdminSideBar from 'components/admin/AdminSideBar';
import AdminUserListSection from 'components/admin/AdminUserListSection';
import AdminUserDetailSection from 'components/admin/AdminUserDetailSection';
import AdminReportSection from 'components/admin/AdminReportSection';
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
          {/* <AdminUserListSection /> */}
          {/* <AdminUserDetailSection /> */}
          <AdminReportSection />
        </div>
      </section>
    </div>
  );
}
