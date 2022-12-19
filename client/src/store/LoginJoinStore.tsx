import create from 'zustand';

interface LoginJoinState {
  selectedLogin: boolean;
  selectedJoin: boolean;
  setSelectedLogin: () => void;
  setSelectedJoin: () => void;
}
const useLoginJoinStore = create<LoginJoinState>((set) => ({
  selectedLogin: true,
  selectedJoin: false,
  setSelectedLogin: () => set({ selectedLogin: true, selectedJoin: false }),
  setSelectedJoin: () => set({ selectedLogin: false, selectedJoin: true }),
}));
export default useLoginJoinStore;
