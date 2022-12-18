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
  showRental: () => void;
}
const useAdminPageStore = create<AdminPageState>((set) => ({
  section: AdminSection.USERLIST,
  showUserList: () => set({ section: AdminSection.USERLIST }),
  showUserDetail: () => set({ section: AdminSection.USERDETAIL }),
  showReport: () => set({ section: AdminSection.REPORT }),
  showNotice: () => set({ section: AdminSection.NOTICE }),
  showPost: () => set({ section: AdminSection.POST }),
  showRental: () => set({ section: AdminSection.RENTAL }),
}));

interface NoticePageState {
  isWriting: boolean;
  onIsWriting: () => void;
  offIsWriting: () => void;
}
export const useNoticePageStore = create<NoticePageState>((set) => ({
  isWriting: true,
  onIsWriting: () => set({ isWriting: true }),
  offIsWriting: () => set({ isWriting: false }),
}));

export default useAdminPageStore;
