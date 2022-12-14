import { MouseEvent } from 'react';
import create from 'zustand';
interface LoginJoinState {
  selectedLogin: boolean;
  selectedJoin: boolean;
  setSelectedLogin: () => void;
  setSelectedJoin: () => void;
}
const useStore = create<LoginJoinState>()((set) => ({
  selectedLogin: true,
  selectedJoin: false,
  setSelectedLogin: () =>
    set((state) => ({ ...state, selectedLogin: true, selectedJoin: false })),
  setSelectedJoin: () =>
    set((state) => ({ ...state, selectedLogin: false, selectedJoin: true })),
}));

type LoginInputProps = {
  type: string;
  placeholder: string;
};

function LoginInputDiv({ type, placeholder }: LoginInputProps) {
  return (
    <div className="w-full mb-8 flex justify-center">
      <input
        className="w-2/3 h-10 text-2xl border-b-yellow border-solid border-2 rounded-xl px-4"
        type={type}
        placeholder={placeholder}
      ></input>
    </div>
  );
}
function LoginButton() {
  return (
    <div className="w-full mb-5 flex justify-center">
      <button className="bg-b-yellow text-b-chat-text w-48 h-12 rounded-3xl text-xl font-bold">
        Log in
      </button>
    </div>
  );
}
function LoginJoinHeader() {
  const { selectedLogin, setSelectedLogin, selectedJoin, setSelectedJoin } =
    useStore();
  const handleLoginHeadClick = (e: MouseEvent) => {
    setSelectedLogin();
  };
  const handleJoinHeadClick = (e: MouseEvent) => {
    setSelectedJoin();
  };
  const toggleColorClass = (isSelected: boolean) =>
    isSelected
      ? 'border-b-yellow text-b-yellow text-4xl'
      : 'border-gray-400  text-gray-400 text-3xl ';
  return (
    <div className="w-full flex">
      {/* login join header */}
      <p
        className={`w-1/2 h-12 text-center italic transition-all
        font-bold border-b-2 border-solid ${toggleColorClass(selectedLogin)}`}
      >
        <a onClick={handleLoginHeadClick} className="p-4 cursor-pointer">
          Login
        </a>
      </p>
      <p
        className={`w-1/2 h-12 text-center italic transition-all
        font-bold border-b-2 border-solid ${toggleColorClass(selectedJoin)}`}
      >
        <a onClick={handleJoinHeadClick} className="p-4 cursor-pointer">
          Join
        </a>
      </p>
    </div>
  );
}
export default function LoginJoin() {
  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="max-w-screen-sm mx-auto mt-48">
        <LoginJoinHeader />
        <div className="w-full">
          {/* 이메일 로그인 */}
          <form className="mt-24">
            <LoginInputDiv type="email" placeholder="Email" />
            <LoginInputDiv type="password" placeholder="Password" />
            <div className="w-full mb-5 flex justify-center">
              <a
                href="#"
                className="w-1/2 underline text-center text-b-chat-text italic"
              >
                Forgot password?
              </a>
            </div>
            <LoginButton />
          </form>
        </div>
      </div>
    </div>
  );
}
