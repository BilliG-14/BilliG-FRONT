import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface DarkState {
  dark: boolean;
  setDark: (dark: boolean) => void;
}

export const darkStore = create<DarkState>()(
  devtools(
    persist(
      (set) => ({
        dark: false,
        setDark: (dark) => set(() => ({ dark })),
      }),
      { name: 'theme' },
    ),
  ),
);
