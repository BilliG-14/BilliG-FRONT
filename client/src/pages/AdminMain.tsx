import { useQuery } from '@tanstack/react-query';
import api from 'api/customAxios';
import { AdminHeader, AdminSideBar } from 'components/admin';
import AdminMainSection from 'components/admin/AdminMainSection';
import NotFound from 'components/NotFound';

export default function AdminMain() {
  const { isLoading, data: userInfo } = useQuery(
    ['userInfo'],
    async () => {
      return api.get(`/user/${localStorage.getItem('userId')}`);
    },
    {
      refetchOnWindowFocus: false,
    },
  );

  return (
    <div className="h-full w-screen max-w-screen-lg m-auto">
      {userInfo && userInfo.data.role === 'admin' ? (
        <div>
          <AdminHeader />
          <section className="max-w-screen-lg h-full">
            <div className="flex h-full">
              <AdminSideBar />
              <AdminMainSection />
            </div>
          </section>
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );
}
