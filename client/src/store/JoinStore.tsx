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
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  postalCode: string;
  address1: string;
  address2: string;
  setJoinInfo: (joinInfo: JoinInfo) => void;
}

const useJoinStore = create<JoinState>((set) => ({
  ...initialJoinInfo,
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
