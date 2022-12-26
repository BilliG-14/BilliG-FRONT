import create from 'zustand';

// 수정하기 toggle
interface MyinpoEditState {
  isMyinfo: boolean;
  toggleIntro: () => void;
}

export const useMyinfoEditStore = create<MyinpoEditState>((set) => ({
  isMyinfo: false,
  toggleIntro: () => set((state) => ({ isMyinfo: !state.isMyinfo })),
}));

// 비밀번호 변경 toggle
interface PasswordEditState {
  isPW: boolean;
  togglePw: () => void;
  // togglePwfalse: () => void;
}

export const usePasswordEditStore = create<PasswordEditState>((set) => ({
  isPW: false,
  togglePw: () => set((state) => ({ isPW: !state.isPW })),
  // togglePwfalse: () => set(() => ({ isPW: false })),
}));

interface DeleteUserState {
  isDeleteUser: boolean;
  toggleDeleteUser: () => void;
  toggleDeleteUserfalse: () => void;
}

export const useDeleteUserStore = create<DeleteUserState>((set) => ({
  isDeleteUser: false,
  toggleDeleteUser: () =>
    set((state) => ({ isDeleteUser: !state.isDeleteUser })),
  toggleDeleteUserfalse: () => set(() => ({ isDeleteUser: false })),
}));
