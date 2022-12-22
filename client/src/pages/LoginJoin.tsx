import { JoinForm } from 'components/login-join/JoinForm';
import { LoginForm } from 'components/login-join/LoginForm';
import { MouseEvent } from 'react';
import { useLoginJoinStore } from 'store/LoginJoinStore';

function LoginJoinHeader() {
  const { selectedLogin, setSelectedLogin, selectedJoin, setSelectedJoin } =
    useLoginJoinStore();
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
          href="#!"
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
          href="#!"
        >
          Join
        </a>
      </p>
    </div>
  );
}

export default function LoginJoin() {
  const selectedLogin = useLoginJoinStore((state) => state.selectedLogin);
  return (
    <div className="w-screen max-w-screen-lg mx-auto">
      <div className="max-w-screen-sm mx-auto mt-48">
        <LoginJoinHeader />
        <div className="w-full">
          {selectedLogin ? <LoginForm /> : <JoinForm />}
        </div>
      </div>
    </div>
  );
}
