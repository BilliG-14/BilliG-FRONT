import { emit } from 'process';
import create from 'zustand';
/*이미지도 여기에 default 이미지 넣어놓고, 회원 정보 조회할떄도 이 상태를 사용할 지 고민해봐야 할 사항
좀 더 개발해보고 결정*/
export type JoinInfo = {
  nickName: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  postalCode: string;
  address1: string;
  address2: string;
};
const initialJoinInfo: JoinInfo = {
  nickName: '',
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  phoneNumber: '',
  postalCode: '',
  address1: '',
  address2: '',
};
interface JoinState {
  nickName: string;
  setNickName: (nickName: string) => void;
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
  postalCode: string;
  setPostalCode: (postalCode: string) => void;
  address1: string;
  setAddress1: (address1: string) => void;
  address2: string;
  setAddress2: (address2: string) => void;
  setJoinInfo: (joinInfo: JoinInfo) => void;
}

const useJoinStore = create<JoinState>((set) => ({
  ...initialJoinInfo,
  setNickName: (nickName) => set({ nickName }),
  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  setPostalCode: (postalCode) => set({ postalCode }),
  setAddress1: (address1) => set({ address1 }),
  setAddress2: (address2) => set({ address2 }),
  setJoinInfo: (joinInfo: JoinInfo) =>
    set({
      nickName: joinInfo.nickName,
      name: joinInfo.name,
      email: joinInfo.email,
      password: joinInfo.password,
      confirmPassword: joinInfo.confirmPassword,
      phoneNumber: joinInfo.phoneNumber,
      postalCode: joinInfo.postalCode,
      address1: joinInfo.address1,
      address2: joinInfo.address2,
    }),
}));

export default useJoinStore;
