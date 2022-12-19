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
  togglePwfalse: () => void;
}

export const usePasswordEditStore = create<PasswordEditState>((set) => ({
  isPW: false,
  togglePw: () => set((state) => ({ isPW: !state.isPW })),
  togglePwfalse: () => set(() => ({ isPW: false })),
}));

type User = {
  username: string;
  intro: string;
  name: string;
  email: string;
  imgUrl: string;
  phone: string;
  postalCode: string;
  address1: string;
  address2: string;
  report: any[];
  suspension: boolean;
  createdAt: string;
};

interface UserInfoState {
  user: User;
  setUserInfo: () => void;
}

export const useUserInfoState = create<UserInfoState>((set) => ({
  user: {
    username: 'yihyun',
    intro: 'IT기기 (맥북, 아이패드...등) 대여해드립니다',
    name: '조이현',
    email: 'jyh@gmail.com',
    imgUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0AqtMahULe4ViGKzXbAr4C4hel5SGwfl7Pg&usqp=CAU',
    phone: '010-2585-3929',
    postalCode: '01425',
    address1: '서울시 도봉구 도봉산로 22길',
    address2: '월드컵아파트 201동 1101호',
    report: [
      { id: 1, title: '사기꾼임' },
      { id: 2, title: '사기꾼임' },
    ],
    suspension: false,
    createdAt: '2022-12-18',
  },

  setUserInfo: () => set((state) => ({})),
}));
