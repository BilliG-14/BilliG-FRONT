import {
  AdminUserListSection,
  AdminUserDetailSection,
  AdminReportSection,
  AdminNoticeSection,
  AdminPostSection,
  AdminRentalSection,
} from 'components/admin';
import useAdminPageStore, { AdminSection } from 'store/AdminPageStore';
import AdminCategorySection from './AdminCategorySection';

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
        return <AdminRentalSection />;
      case AdminSection.CATEGORY:
        return <AdminCategorySection />;
      default:
        return <section></section>;
    }
  })(section);

  return (
    <section className="w-full min-w-[836px] [&_input]:dark:bg-b-dark-input [&_textarea]:dark:bg-b-dark-input dark:text-b-dark-text">
      {showSection}
    </section>
  );
}
