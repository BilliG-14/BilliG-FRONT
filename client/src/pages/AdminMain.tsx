import { AdminHeader, AdminSideBar } from 'components/admin';
import AdminMainSection from 'components/admin/AdminMainSection';

export default function AdminMain() {
  return (
    <div className="h-full w-screen max-w-screen-lg m-auto">
      <AdminHeader />
      <section className="max-w-screen-lg h-full">
        <div className="flex h-full">
          <AdminSideBar />
          <AdminMainSection />
        </div>
      </section>
    </div>
  );
}
