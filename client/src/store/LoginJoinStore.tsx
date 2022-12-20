import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface LoginJoinState {
  selectedLogin: boolean;
  selectedJoin: boolean;
  setSelectedLogin: () => void;
  setSelectedJoin: () => void;
}
const useLoginJoinStore = create<LoginJoinState>()(
  devtools(
    persist((set) => ({
      selectedLogin: true,
      selectedJoin: false,
      setSelectedLogin: () => set({ selectedLogin: true, selectedJoin: false }),
      setSelectedJoin: () => set({ selectedLogin: false, selectedJoin: true }),
    })),
  ),
);
export default useLoginJoinStore;
