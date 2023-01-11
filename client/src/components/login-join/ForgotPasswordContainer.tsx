import { useState, useCallback } from 'react';

interface InitPasswordModalProps {
  onClickToggleModal: () => void;
}
function InitPasswordModal({ onClickToggleModal }: InitPasswordModalProps) {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center fixed top-0 left-0 text-b-text-black break-keep">
      {/* form container */}
      <div className="w-[500px] z-50 bg-white dark:bg-b-card-dark flex flex-col text-b-text-black dark:text-b-dark-text rounded-lg py-3 animate-fade-in-down">
        <p className="text-lg font-bold py-1 text-center">
          비밀번호를 잊으셨나요?
        </p>
        <p className="w-3/4 mx-auto text-center mb-2 text-sm">
          회원가입 시 입력했던 이메일과 이름을 통해
          <br /> 비밀번호를 초기화할 수 있습니다.
        </p>
        <form className="w-3/4 mx-auto flex flex-col items-center">
          <label className="w-full">
            <input
              id="email"
              placeholder="이메일을 입력해주세요"
              className="w-full text-lg border-b-yellow border-solid border rounded-lg text-yellow-900 focus:outline-none focus:ring-1 focus:ring-amber-500 my-2 px-2"
            />
          </label>
          <label className="w-full">
            <input
              id="name"
              placeholder="이름을 입력해주세요"
              className="w-full text-lg border-b-yellow border-solid border rounded-lg text-yellow-900 focus:outline-none focus:ring-1 focus:ring-amber-500 my-2 px-2"
            />
          </label>
          <div className="mt-2">
            <button
              type="button"
              className={`w-20 h-8 font-bold dark:bg-b-dark-input border-gray-400 border text-gray-400 rounded-lg mr-3 hover:bg-gray-400 hover:text-white `}
              onClick={onClickToggleModal}
            >
              취소
            </button>
            <button
              type="submit"
              className={`w-20 h-8 font-bold dark:bg-b-dark-input border-b-yellow border text-b-yellow rounded-lg hover:bg-b-yellow hover:text-white`}
              onClick={onClickToggleModal}
            >
              초기화
            </button>
          </div>
        </form>
      </div>
      {/* background */}
      <div
        className="fixed top-0 left-0 right-0 bottom-0 bg-black z-20 opacity-10"
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          onClickToggleModal();
        }}
      ></div>
    </div>
  );
}

export default function ForgotPasswordContainer() {
  const [showsModal, setShowsModal] = useState<boolean>(false);
  const onClickToggleModal = useCallback(() => {
    setShowsModal(!showsModal);
  }, [showsModal, setShowsModal]);
  return (
    <div className="w-full mb-5 flex justify-center">
      <button
        type="button"
        className="w-1/2 underline text-center font-bold text-b-chat-text italic dark:text-b-dark-yellow"
        onClick={() => {
          setShowsModal(true);
        }}
      >
        Forgot password?
      </button>
      {showsModal && (
        <InitPasswordModal onClickToggleModal={onClickToggleModal} />
      )}
    </div>
  );
}
