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
  isLoading: boolean;
  setIsLoginFalse: () => void;
  setIsLoginTrue: () => void;
  setIsLoadingFalse: () => void;
  setIsLoadingTrue: () => void;
}

export const useIsLoginStore = create<IsLoginState>((set) => ({
  isLogin: false,
  isLoading: false,
  setIsLoginFalse: () => set(() => ({ isLogin: false })),
  setIsLoginTrue: () => set(() => ({ isLogin: true })),
  setIsLoadingFalse: () => set(() => ({ isLoading: false })),
  setIsLoadingTrue: () => set(() => ({ isLoading: true })),
}));
