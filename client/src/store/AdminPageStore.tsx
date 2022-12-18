import create from 'zustand';

export enum AdminSection {
  USERLIST,
  USERDETAIL,
  REPORT,
  POST,
  NOTICE,
  RENTAL,
}
interface AdminPageState {
  section: AdminSection;
  showUserList: () => void;
  showUserDetail: () => void;
  showReport: () => void;
}
const useAdminPageStore = create<AdminPageState>((set) => ({
  section: AdminSection.USERLIST,
  showUserList: () => set({ section: AdminSection.USERLIST }),
  showUserDetail: () => set({ section: AdminSection.USERDETAIL }),
  showReport: () => set({ section: AdminSection.REPORT }),
}));
export default useAdminPageStore;
