import ConfirmModal from 'components/Modal';
import { FormEvent, useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsLoginStore } from 'store/LoginJoinStore';
import api from '../../api/customAxios';
import ForgotPasswordContainer from './ForgotPasswordContainer';
import { AxiosError } from 'axios';

export function LoginForm() {
  const navigate = useNavigate();
  const [isOpenSuccessModal, setOpenSuccessModal] = useState<boolean>(false);
  const [failMessage, setFailMessage] = useState<string>('');
  const onSuccessToggleModal = useCallback(() => {
    setOpenSuccessModal(!isOpenSuccessModal);
  }, [isOpenSuccessModal]);
  const onFailToggleModal = useCallback(
    (message: string | void) => {
      if (failMessage) setFailMessage('');
      else if (message) setFailMessage(message);
    },
    [failMessage],
  );
  const inputRef = useRef<HTMLInputElement[] | null[]>([]);
  const { setIsLoginTrue } = useIsLoginStore();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const login = {
      email: inputRef.current[0]?.value,
      password: inputRef.current[1]?.value,
    };
    try {
      const result = await api.post('/login', JSON.stringify(login));
      const token = result.data.token;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', result.data._id);
      onSuccessToggleModal();
      setIsLoginTrue();
    } catch (error) {
      const axiosErr = error as AxiosError;
      if (axiosErr.response?.status === 499)
        onFailToggleModal('이용 정지된 사용자입니다.');
      else onFailToggleModal('이메일과 비밀번호를 다시 확인해주세요');
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-2/3 mt-24 mx-auto animate-fade-in-150ms"
    >
      <div className="w-full flex flex-col justify-center items-center">
        <input
          id="email"
          name="email"
          className="login-input"
          type="email"
          placeholder="Email"
          ref={(el) => (inputRef.current[0] = el)}
        />
        <input
          id="password"
          name="password"
          className="login-input"
          type="password"
          placeholder="Password"
          ref={(el) => (inputRef.current[1] = el)}
        />
      </div>
      <ForgotPasswordContainer />
      <LoginButton />
      {isOpenSuccessModal && (
        <ConfirmModal
          title="로그인에 성공하였습니다."
          onClickToggleModal={() => {
            onSuccessToggleModal();
            navigate('/submain');
          }}
          onlyYes={true}
        />
      )}
      {failMessage && (
        <ConfirmModal
          title={
            failMessage ? failMessage : '이메일과 비밀번호를 다시 확인해주세요'
          }
          onClickToggleModal={onFailToggleModal}
          onlyYes={true}
          yesColor={'red-400'}
        />
      )}
    </form>
  );
}

function LoginButton() {
  return (
    <div className="w-full mb-5 flex justify-center">
      <button
        className="bg-b-yellow text-b-chat-text w-48 h-12 rounded-3xl text-xl font-bold
      transition-all hover:text-white hover:font-extrabold hover:bg-[#e65c00]"
      >
        Log in
      </button>
    </div>
  );
}
