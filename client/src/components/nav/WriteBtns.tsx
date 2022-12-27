import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsLoginStore, useLoginJoinStore } from 'store/LoginJoinStore';

export default function WriteBtns({
  setOnWriteBtn,
}: {
  setOnWriteBtn: Dispatch<SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  const [setSelectedLogin] = useLoginJoinStore((state) => [
    state.setSelectedLogin,
  ]);
  const { isLogin } = useIsLoginStore();

  const goLogin = () => {
    setSelectedLogin();
    navigate('/login');
  };
  return (
    <div
      className="mr-5"
      onMouseLeave={() => {
        setTimeout(() => {
          setOnWriteBtn((prev) => !prev);
        }, 400);
      }}
    >
      <button
        className="text-xl font-bold hover:text-b-yellow hover:ease-in-out hover: duration-300 mr-2"
        onClick={() => {
          if (!isLogin) {
            goLogin();
            return;
          }
          navigate('/write/lend');
        }}
      >
        빌려주기
      </button>
      <button
        className="text-xl font-bold hover:text-b-yellow hover:ease-in-out duration-300 mr-2"
        onClick={() => {
          if (!isLogin) {
            setSelectedLogin();
            navigate('/login');
            return;
          }
          navigate('/write/borrow');
        }}
      >
        빌리기
      </button>
    </div>
  );
}
