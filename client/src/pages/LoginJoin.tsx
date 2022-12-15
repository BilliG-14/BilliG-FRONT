import { MouseEvent } from 'react';
import create from 'zustand';
import { ButtonProps } from 'components/MainButton';
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

type InputProps = {
  type?: string;
  placeholder?: string;
  label?: string;
  id: string;
};

function LoginInputDiv({
  type = 'text',
  placeholder = '',
  label,
  id,
}: InputProps) {
  return (
    <div
      className={`w-full flex flex-col justify-center items-center
      ${label ? 'mb-1' : 'mb-8'}`}
    >
      {label ? (
        <label
          htmlFor="nickname"
          className="block text-b-yellow font-bold text-lg w-2/3 my-auto text-left"
        >
          {label}
        </label>
      ) : (
        ''
      )}
      <input
        id={id}
        name={id}
        className="block w-2/3 h-10 text-xl border-b-yellow border-solid border-2 rounded-xl px-4 text-yellow-900 font-bold
        focus:outline-none focus:border-amber-600  focus:ring-1 focus:ring-amber-600"
        type={type}
        placeholder={placeholder}
      ></input>
    </div>
  );
}

function LoginButton({ content }: ButtonProps) {
  return (
    <div className="w-full mb-5 flex justify-center">
      <button
        className="bg-b-yellow text-b-chat-text w-48 h-12 rounded-3xl text-xl font-bold
      hover:bg-amber-600 transition-all"
      >
        {content}
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
        <a
          onClick={handleLoginHeadClick}
          className="p-4 cursor-pointer select-none"
        >
          Login
        </a>
      </p>
      <p
        className={`w-1/2 h-12 text-center italic transition-all
        font-bold border-b-2 border-solid ${toggleColorClass(selectedJoin)}`}
      >
        <a
          onClick={handleJoinHeadClick}
          className="p-4 cursor-pointer select-none"
        >
          Join
        </a>
      </p>
    </div>
  );
}

function LoginForm() {
  return (
    <form className="mt-24 animate-fade-in-150ms">
      <LoginInputDiv type="email" placeholder="Email" id="email" />
      <LoginInputDiv type="password" placeholder="Password" id="password" />
      <div className="w-full mb-5 flex justify-center">
        <a
          href="#"
          className="w-1/2 underline text-center font-bold text-b-chat-text italic"
        >
          Forgot password?
        </a>
      </div>
      <LoginButton content="Log in" />
    </form>
  );
}
function JoinForm() {
  return (
    <form className="mt-12 my-24  animate-fade-in-150ms">
      <LoginInputDiv type="text" label="닉네임" id="nickName" />
      <LoginInputDiv type="text" label="이름" id="name" />
      <LoginInputDiv type="email" label="이메일" id="email" />
      <LoginInputDiv type="password" label="비밀번호" id="password" />
      <LoginInputDiv
        type="password"
        label="비밀번호 확인"
        id="confirmpassword"
      />
      <LoginInputDiv type="tel" label="휴대폰 번호" id="phoneNumber" />
      <LoginInputDiv
        type="text"
        label="주소"
        id="address1"
        placeholder="address"
      />
      <LoginInputDiv type="text" id="address2" placeholder="detailed address" />
      <LoginButton content="Join" />
    </form>
  );
}
export default function LoginJoin() {
  const { selectedLogin, setSelectedJoin } = useStore();
  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="max-w-screen-sm mx-auto mt-48">
        <LoginJoinHeader />
        <div className="w-full">
          {selectedLogin ? <LoginForm /> : <JoinForm />}
        </div>
      </div>
    </div>
  );
}
