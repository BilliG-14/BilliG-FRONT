import create from 'zustand';

interface MyIntroEditState {
  isMyinfo: boolean;
  toggleIntro: () => void;
}

export const useMyIntroEditStore = create<MyIntroEditState>((set) => ({
  isMyinfo: false,
  toggleIntro: () => set((state) => ({ isMyinfo: !state.isMyinfo })),
}));

type User = {
  nickname: string;
  intro: string;
  name: string;
  email: string;
  imgUrl: string;
  phone: string;
  postalCode: string;
  address1: string;
  address2: string;
  createdAt: string;
  suspension: boolean;
};

interface UserInfoState {
  user: User;
  setUserInfo: () => void;
}

export const useUserInfoState = create<UserInfoState>((set) => ({
  user: {
    nickname: 'yihyun',
    intro: 'IT기기 (맥북, 아이패드...등) 대여해드립니다',
    name: '조이현',
    email: 'jyh@gmail.com',
    imgUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0AqtMahULe4ViGKzXbAr4C4hel5SGwfl7Pg&usqp=CAU',
    phone: '010-2585-3929',
    postalCode: '01425',
    address1: '서울시 도봉구 도봉산로 22길',
    address2: '월드컵아파트 201동 1101호',
    createdAt: '2022-12-18',
    suspension: false,
  },

  setUserInfo: () => set((state) => ({})),
}));
