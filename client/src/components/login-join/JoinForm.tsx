import api from 'api/customAxios';
import Postcode from 'components/login-join/Postcode';
import ConfirmModal from 'components/Modal';
import React, { useCallback, useRef, useState } from 'react';
import useJoinFormStore from 'store/JoinFormStore';
import { useLoginJoinStore } from '../../store/LoginJoinStore';

export function JoinForm() {
  const joinFormState = useJoinFormStore();
  const formClassName = 'w-2/3 mt-12 my-24 mx-auto animate-fade-in-150ms ';
  const divClassName = 'w-full flex flex-col justify-center items-center ';
  const labelClassName =
    'block text-b-yellow font-bold text-lg w-full my-auto text-left mt-1 ';
  const inputClassName =
    'block w-full h-10 text-xl border-b-yellow border-solid border-2 rounded-xl px-4 text-yellow-900 font-bold focus:outline-none focus:border-4 mb-1';
  const confirmRef = useRef<HTMLParagraphElement>(null);
  return (
    <form className={formClassName} action="" method="POST">
      <div className={divClassName}>
        <label htmlFor="name" className={labelClassName}>
          이름
        </label>
        <input
          id="name"
          name="name"
          className={inputClassName}
          defaultValue={joinFormState.name}
          onBlur={(e) => joinFormState.setName(e.currentTarget.value)}
        ></input>
        {checkSpaceAndSpecial(joinFormState.name) && (
          <p className="text-red-400 text-left w-full mt-1 font-medium">
            이름에 공백이나 특수문자가 포함되어 있습니다.
          </p>
        )}
        <label htmlFor="nickName" className={labelClassName}>
          닉네임
        </label>
        <input
          id="nickName"
          name="nickName"
          className={inputClassName}
          defaultValue={joinFormState.nickName}
          onBlur={(e) => joinFormState.setNickName(e.currentTarget.value)}
        ></input>
        {checkSpaceAndSpecial(joinFormState.nickName) && (
          <p className="text-red-400 text-left w-full mt-1 font-medium">
            닉네임에 공백이나 특수문자가 포함되어 있습니다.
          </p>
        )}
        {joinFormState.nickName.length > 7 && (
          <p className="text-red-400 text-left w-full mt-1 font-medium">
            닉네임은 최대 7글자입니다.
          </p>
        )}
        <label htmlFor="email" className={labelClassName}>
          이메일
        </label>
        <input
          id="email"
          name="email"
          className={inputClassName}
          defaultValue={joinFormState.email}
          onBlur={(e) => joinFormState.setEmail(e.currentTarget.value)}
        ></input>
        {joinFormState.email && !checkEmail(joinFormState.email) && (
          <p className="text-red-400 text-left w-full mt-1 font-medium">
            이메일 형식이 아닙니다.
          </p>
        )}
        <label htmlFor="password" className={labelClassName}>
          비밀번호
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className={inputClassName}
          defaultValue={joinFormState.password}
          onBlur={(e) => {
            joinFormState.setPassword(e.currentTarget.value);
          }}
        ></input>
        {joinFormState.password && !checkPassword(joinFormState.password) && (
          <p className="text-red-400 text-left w-full mt-1 font-medium">
            비밀번호는 최소 8자, 최소 하나의 문자와 숫자, 특수문자가
            포함되어야합니다.
          </p>
        )}
        <label htmlFor="confirmPassword" className={labelClassName}>
          비밀번호 확인
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          className={inputClassName}
          defaultValue={joinFormState.confirmPassword}
          onBlur={(e) =>
            joinFormState.setConfirmPassword(e.currentTarget.value)
          }
          onChange={(e) => {
            if (e.currentTarget.value !== joinFormState.password) {
              e.currentTarget.style.borderColor = 'red';
              if (confirmRef.current)
                confirmRef.current.style.display = 'block';
            } else {
              e.currentTarget.style.borderColor = '';
              if (confirmRef.current) confirmRef.current.style.display = 'none';
            }
          }}
        ></input>
        <p
          ref={confirmRef}
          className="hidden text-red-400 text-left w-full mt-1 font-medium"
        >
          비밀번호가 같지 않습니다.
        </p>
        <label htmlFor="phoneNumber" className={labelClassName}>
          전화번호
        </label>
        <input
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          className={inputClassName}
          defaultValue={joinFormState.phoneNumber}
          onBlur={(e) => joinFormState.setPhoneNumber(e.currentTarget.value)}
        ></input>
        {joinFormState.phoneNumber &&
          !checkPhoneNumber(joinFormState.phoneNumber) && (
            <p className="text-red-400 text-left w-full mt-1 font-medium">
              전화번호 형식이 아닙니다.
            </p>
          )}
        <Postcode />
        <input
          id="address2"
          name="address2"
          type="text"
          className={inputClassName}
          defaultValue={joinFormState.address2}
          onBlur={(e) => joinFormState.setAddress2(e.currentTarget.value)}
        ></input>
      </div>
      <JoinButton />
    </form>
  );
}

function JoinButton() {
  const joinFormState = useJoinFormStore();
  const setSelectedLogin = useLoginJoinStore((state) => state.setSelectedLogin);
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [isOpenSuccessModal, setOpenSuccessModal] = useState<boolean>(false);
  const [validMessage, setValidMessage] = useState<string>('');
  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);
  const onClickSuccessToggleModal = useCallback(() => {
    setOpenSuccessModal(!isOpenModal);
  }, [isOpenSuccessModal]);
  const join = {
    email: joinFormState.email,
    password: joinFormState.password,
    nickName: joinFormState.nickName,
    name: joinFormState.name,
    phoneNumber: joinFormState.phoneNumber,
    postalCode: joinFormState.postalCode,
    address1: joinFormState.address1,
    address2: joinFormState.address2,
  };
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (!joinFormState.name || checkSpaceAndSpecial(joinFormState.name)) {
      setOpenModal(true);
      setValidMessage('이름을 다시 확인해주세요');
      return;
    }
    if (
      !joinFormState.nickName ||
      joinFormState.nickName.length > 7 ||
      checkSpaceAndSpecial(joinFormState.nickName)
    ) {
      setOpenModal(true);
      setValidMessage('닉네임을 다시 확인해주세요');
      return;
    }
    if (!joinFormState.email || !checkEmail(joinFormState.email)) {
      setOpenModal(true);
      setValidMessage('이메일을 다시 확인해주세요');
      return;
    }
    if (
      !joinFormState.password ||
      joinFormState.password !== joinFormState.confirmPassword ||
      !checkPassword(joinFormState.password)
    ) {
      setOpenModal(true);
      setValidMessage('비밀번호를 다시 확인해주세요');
      return;
    }
    if (!checkPhoneNumber(joinFormState.phoneNumber)) {
      setOpenModal(true);
      setValidMessage('전화번호를 다시 확인해주세요');
      return;
    }
    if (
      !joinFormState.postalCode ||
      !joinFormState.address1 ||
      !joinFormState.address2
    ) {
      setOpenModal(true);
      setValidMessage('주소를 다시 확인해주세요');
      return;
    }

    api
      .post('register', join)
      .then(() => {
        setOpenSuccessModal(true);
        joinFormState.initialize();
      })
      .catch(() => {
        alert('회원가입에 실패하였습니다.');
        window.location.reload();
      });
  };
  return (
    <div className="w-full mt-4 h-32 flex justify-center">
      <button
        className="bg-b-yellow text-b-chat-text w-48 h-12 rounded-3xl text-xl font-bold
      transition-all hover:text-white hover:font-extrabold hover:bg-gradient-to-r from-[#e65c00] to-b-yellow"
        onClick={handleClick}
      >
        Join
      </button>
      {isOpenModal && (
        <ConfirmModal
          title={validMessage}
          onClickToggleModal={onClickToggleModal}
          onlyYes={true}
        />
      )}
      {isOpenSuccessModal && (
        <ConfirmModal
          title={'회원가입에 성공하였습니다.'}
          onClickToggleModal={onClickSuccessToggleModal}
          onClickYes={() => {
            setSelectedLogin();
          }}
          onlyYes={true}
        />
      )}
    </div>
  );
}
// 공백 체크
function checkSpace(str: string) {
  if (str.search(/\s/) !== -1) {
    return true;
  }
  return false;
}

// 특수 문자 체크
function checkSpecial(str: string) {
  const SpecialPattern = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
  return SpecialPattern.test(str);
}
function checkSpaceAndSpecial(str: string) {
  return checkSpace(str) || checkSpecial(str);
}

//전화번호 체크
function checkPhoneNumber(str: string) {
  const PhonePattern = /^\d{2,3}-\d{3,4}-\d{4}$/;
  return PhonePattern.test(str);
}
//이메일 체크
function checkEmail(str: string) {
  const EmailPattern =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  return EmailPattern.test(str);
}
//비밀번호 체크
const checkPassword = (password: string) => {
  /**최소 8자, 하나 이상의 문자,특수문자 숫자 정규식 */
  const PasswordPattern =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
  return PasswordPattern.test(password);
};
