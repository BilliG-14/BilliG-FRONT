import { useQuery } from '@tanstack/react-query';
import { getUserInfoByuserId } from 'api/user-api';
import { AdminHeader, AdminSideBar } from 'components/admin';
import AdminMainSection from 'components/admin/AdminMainSection';
import Footer from 'components/footer/Footer';
import Loading from 'components/Loading';
import NotFound from 'components/NotFound';

export default function AdminMain() {
  const { isLoading, data: userInfo } = useQuery(
    ['userInfo'],
    getUserInfoByuserId,
    {
      refetchOnWindowFocus: false,
    },
  );
  if (isLoading) return <Loading />;
  return (
    <div className="w-screen m-auto relative pb-[70px] min-h-[85vh]">
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
      <div className="w-full h-[70px] absolute bottom-0 flex flex-col justify-end">
        <Footer />
      </div>
    </div>
  );
}
