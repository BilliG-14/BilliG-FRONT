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
  showNotice: () => void;
  showPost: () => void;
}
const useAdminPageStore = create<AdminPageState>((set) => ({
  section: AdminSection.NOTICE,
  showUserList: () => set({ section: AdminSection.USERLIST }),
  showUserDetail: () => set({ section: AdminSection.USERDETAIL }),
  showReport: () => set({ section: AdminSection.REPORT }),
  showNotice: () => set({ section: AdminSection.NOTICE }),
  showPost: () => set({ section: AdminSection.POST }),
  showRental: () => set({ section: AdminSection.RENTAL }),
}));
export default useAdminPageStore;
