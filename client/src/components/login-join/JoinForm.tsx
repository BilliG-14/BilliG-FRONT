import axios from 'axios';
import Postcode from 'components/login-join/Postcode';
import React, { useRef } from 'react';
import useJoinFormStore from 'store/JoinFormStore';

const validatePassword = (password: string) => {
  /**최소 8 자, 하나 이상의 문자와 하나의 숫자 정규식 */
  const reg = /^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$/;
  if (!reg.test(password)) {
    console.log(password + 'is invalid');
    return false;
  }
};

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
            validatePassword(e.currentTarget.value);
          }}
        ></input>
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

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
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
    axios
      .post(
        'https://port-0-village-dpuqy925lbn63gyo.gksl2.cloudtype.app/register',
        JSON.stringify(join),
        {
          headers: { 'Content-Type': `application/json` },
        },
      )
      .then((response) => {
        alert('회원가입 성공');
        joinFormState.initialize();
      })
      .catch((error) => alert(error));
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
    </div>
  );
}
