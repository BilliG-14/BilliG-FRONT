import create from 'zustand';

interface DarkState {
  dark: boolean;
  setDark: (dark: boolean) => void;
}

export const darkStore = create<DarkState>((set) => ({
  dark: false,
  setDark: (dark) => set(() => ({ dark })),
}));
