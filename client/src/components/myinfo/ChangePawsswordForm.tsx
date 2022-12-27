import ConfirmModal from 'components/Modal';
import { useCallback, useRef, useState } from 'react';
import { usePasswordEditStore } from 'store/MypageStore';
import api from '../../api/customAxios';

type PwType = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function ChangePawsswordForm() {
  const [passwords, setPasswords] = useState<PwType>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [isOpenSuccessModal, setOpenSuccessModal] = useState<boolean>(false);
  const [isOpenFailModal, setOpenFailModal] = useState<boolean>(false);

  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);
  const onClickSuccessToggleModal = useCallback(() => {
    setOpenSuccessModal(!isOpenSuccessModal);
  }, [isOpenSuccessModal]);
  const onClickFailToggleModal = useCallback(() => {
    setOpenFailModal(!isOpenFailModal);
  }, [isOpenFailModal]);

  const { togglePw } = usePasswordEditStore();

  const currentPwRef = useRef<HTMLInputElement | null>(null);
  const changePwRef = useRef<HTMLInputElement | null>(null);
  const confirmRef = useRef<HTMLParagraphElement | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = passwords;
    if (
      !checkPassword(passwords.newPassword) ||
      currentPassword === newPassword ||
      confirmPassword !== newPassword
    ) {
      onClickToggleModal();
      return;
    }

    try {
      await api.post('/user/changePassword', {
        currentPassword,
        newPassword,
      });
      onClickSuccessToggleModal();
    } catch (error) {
      onClickFailToggleModal();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });

    if (e.currentTarget.value !== passwords.newPassword) {
      e.currentTarget.style.borderColor = 'red';
      if (confirmRef.current) {
        confirmRef.current.style.display = 'block';
      }
    } else {
      e.currentTarget.style.borderColor = '';
      if (confirmRef.current) {
        confirmRef.current.style.display = 'none';
      }
    }
  };
  return (
    <section>
      <div className="user_pw flex items-center h-18 py-4 border-b border-solid border-gray-200">
        <div className="w-40 text-lg leading-normal font-bold">
          <h3>비밀번호 변경</h3>
        </div>
        <form
          action="submit"
          onSubmit={handleSubmit}
          className="w-full flex flex-col justify-start leading-normal"
        >
          <input
            name="currentPassword"
            type="password"
            placeholder="현재 비밀번호.."
            ref={currentPwRef}
            defaultValue={passwords.currentPassword}
            onBlur={(e) => {
              setPasswords({
                ...passwords,
                [e.target.name]: currentPwRef.current?.value,
              });
            }}
            className={inputClassName}
          />
          <input
            type="password"
            placeholder="새로운 비밀번호.."
            name="newPassword"
            ref={changePwRef}
            defaultValue={passwords.newPassword}
            onBlur={(e) => {
              setPasswords({
                ...passwords,
                [e.target.name]: changePwRef.current?.value,
              });
            }}
            className={inputClassName}
          />
          {passwords.newPassword && !checkPassword(passwords.newPassword) && (
            <p className="text-red-400 text-left w-full mt-1 font-medium">
              비밀번호는 최소 8자, 최소 하나의 문자와 숫자, 특수문자가
              포함되어야합니다.
            </p>
          )}
          <input
            type="password"
            placeholder="새로운 비밀번호 확인.."
            name="confirmPassword"
            value={passwords.confirmPassword}
            onChange={handleChange}
            className={inputClassName}
          />
          <p
            ref={confirmRef}
            className="hidden text-red-400 text-left w-full mt-1 font-medium"
          >
            비밀번호가 같지 않습니다.
          </p>
          <div className="flex justify-center relative">
            <button
              className="w-1/6 h-10 hover:text-white border border-b-tag-dir hover:bg-b-tag-dir focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-5 text-center"
              type="submit"
            >
              변경하기
            </button>
          </div>
        </form>
      </div>
      {isOpenModal && (
        <ConfirmModal
          title="비밀번호를 다시 확인해주세요."
          onClickToggleModal={onClickToggleModal}
          onClickYes={() => {}}
        />
      )}
      {isOpenSuccessModal && (
        <ConfirmModal
          title="비밀번호가 변경되었습니다."
          onClickToggleModal={onClickSuccessToggleModal}
          onClickYes={() => {
            togglePw();
          }}
        />
      )}
      {isOpenFailModal && (
        <ConfirmModal
          title="비밀번호를 다시 확인해주세요."
          onClickToggleModal={onClickFailToggleModal}
          onClickYes={() => {}}
        />
      )}
    </section>
  );
}

const inputClassName =
  'w-3/5 font-medium border border-solid border-gray-300 py-2 px-2 rounded-lg focus:border-b-yellow focus:outline-none mb-1';

const checkPassword = (password: string) => {
  /**최소 8자, 하나 이상의 문자,특수문자 숫자 정규식 */
  const PasswordPattern =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
  return PasswordPattern.test(password);
};
