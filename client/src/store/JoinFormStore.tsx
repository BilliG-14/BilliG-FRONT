import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface JoinFormState {
  name: string;
  nickName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  postalCode: string;
  address1: string;
  address2: string;
  setName: (value: string) => void;
  setNickName: (value: string) => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setConfirmPassword: (value: string) => void;
  setPhoneNumber: (value: string) => void;
  setPostalCode: (value: string) => void;
  setAddress1: (value: string) => void;
  setAddress2: (value: string) => void;
}
const useJoinFormStore = create<JoinFormState>()(
  devtools(
    persist((set) => ({
      name: '',
      nickName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      postalCode: '',
      address1: '',
      address2: '',
      setName: (value) => set({ name: value }),
      setNickName: (value) => set({ nickName: value }),
      setEmail: (value) => set({ email: value }),
      setPassword: (value) => set({ password: value }),
      setConfirmPassword: (value) => set({ confirmPassword: value }),
      setPhoneNumber: (value) => set({ phoneNumber: value }),
      setPostalCode: (value) => set({ postalCode: value }),
      setAddress1: (value) => set({ address1: value }),
      setAddress2: (value) => set({ address2: value }),
    })),
  ),
);
export default useJoinFormStore;
