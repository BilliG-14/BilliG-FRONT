import {
  AdminHeader,
  AdminSideBar,
  AdminUserListSection,
  AdminUserDetailSection,
  AdminReportSection,
  AdminNoticeSection,
} from 'components/admin';
import useAdminPageStore, { AdminSection } from 'store/AdminPageStore';
// interface adminPageState {

// }
// const useAdminStore = create<adminPageState>((set) => { });

export default function AdminMain() {
  const section = useAdminPageStore((state) => state.section);
  const showSection = ((_section: AdminSection) => {
    switch (_section) {
      case AdminSection.USERLIST:
        return <AdminUserListSection />;
      case AdminSection.REPORT:
        return <AdminReportSection />;
      case AdminSection.USERDETAIL:
        return <AdminUserDetailSection />;
      case AdminSection.NOTICE:
        return <AdminNoticeSection />;
      case AdminSection.POST:
        return;
      case AdminSection.RENTAL:
        return;
      default:
        return <section></section>;
    }
  })(section);

  return (
    <div className="h-full w-screen max-w-screen-lg m-auto">
      <AdminHeader />
      <section className="max-w-screen-lg h-full">
        <div className="flex h-full">
          <AdminSideBar />
          {showSection}
        </div>
      </section>
    </div>
  );
}
