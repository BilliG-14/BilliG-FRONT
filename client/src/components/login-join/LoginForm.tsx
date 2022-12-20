import { LoginInputDiv } from 'components/login-join/LoginInputDiv';

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
      <LoginButton />
    </form>
  );
}

function LoginButton() {
  return (
    <div className="w-full mb-5 flex justify-center">
      <button
        className="bg-b-yellow text-b-chat-text w-48 h-12 rounded-3xl text-xl font-bold
      transition-all hover:text-white hover:font-extrabold hover:bg-gradient-to-r from-[#e65c00] to-b-yellow"
      >
        Log in
      </button>
    </div>
  );
}
