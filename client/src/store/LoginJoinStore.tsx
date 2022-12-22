import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface LoginJoinState {
  selectedLogin: boolean;
  selectedJoin: boolean;
  setSelectedLogin: () => void;
  setSelectedJoin: () => void;
}
export const useLoginJoinStore = create<LoginJoinState>()(
  devtools(
    persist((set) => ({
      selectedLogin: true,
      selectedJoin: false,
      setSelectedLogin: () => set({ selectedLogin: true, selectedJoin: false }),
      setSelectedJoin: () => set({ selectedLogin: false, selectedJoin: true }),
    })),
  ),
);

interface IsLoginState {
  isLogin: boolean;
  setIsLoginFalse: () => void;
  setIsLoginTrue: () => void;
}

export const useIsLoginStore = create<IsLoginState>((set) => ({
  isLogin: false,
  setIsLoginFalse: () => set(() => ({ isLogin: false })),
  setIsLoginTrue: () => set(() => ({ isLogin: true })),
}));
