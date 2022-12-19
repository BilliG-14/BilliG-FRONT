import Postcode from 'components/login-join/Postcode';
import { LoginInputDiv } from 'components/login-join/LoginInputDiv';
import { ButtonProps } from 'components/main/MainButton';

export function LoginForm() {
  return (
    <form className="w-2/3 mt-24 mx-auto animate-fade-in-150ms">
      <LoginInputDiv type="email" placeholder="Email" id="email" />
      <LoginInputDiv type="password" placeholder="Password" id="password" />
      <div className="w-full mb-5 flex justify-center">
        <a
          className="w-1/2 underline text-center font-bold text-b-chat-text italic"
          href="#!"
        >
          Forgot password?
        </a>
      </div>
      <LoginButton content="Log in" />
    </form>
  );
}
export function JoinForm() {
  return (
    <form
      className="w-2/3 mt-12 my-24 mx-auto animate-fade-in-150ms "
      action="http://www.foo.com"
      method="POST"
    >
      <LoginInputDiv type="text" label="닉네임" id="nickName" />
      <LoginInputDiv type="text" label="이름" id="name" />
      <LoginInputDiv type="email" label="이메일" id="email" />
      <LoginInputDiv type="password" label="비밀번호" id="password" />
      <LoginInputDiv
        type="password"
        label="비밀번호 확인"
        id="confirmPassword"
      />
      <LoginInputDiv type="tel" label="휴대폰 번호" id="phoneNumber" />
      <Postcode />
      <LoginInputDiv type="text" id="address2" />
      <LoginButton content="Join" />
    </form>
  );
}
export function LoginButton({ content }: ButtonProps) {
  return (
    <div className="w-full mb-5 flex justify-center">
      <button
        className="bg-b-yellow text-b-chat-text w-48 h-12 rounded-3xl text-xl font-bold
      transition-all hover:text-white hover:font-extrabold hover:bg-gradient-to-r from-[#e65c00] to-b-yellow"
      >
        {content}
      </button>
    </div>
  );
}
