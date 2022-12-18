import {
  AdminUserListSection,
  AdminUserDetailSection,
  AdminReportSection,
  AdminNoticeSection,
  AdminPostSection,
} from 'components/admin';
import useAdminPageStore, { AdminSection } from 'store/AdminPageStore';

export default function AdminMainSection() {
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
        return <AdminPostSection />;
      case AdminSection.RENTAL:
        return;
      default:
        return <section></section>;
    }
  })(section);

  return <section className="w-full">{showSection}</section>;
}
