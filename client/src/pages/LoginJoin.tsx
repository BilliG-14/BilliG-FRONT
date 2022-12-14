export default function LoginJoin() {
  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="max-w-screen-sm mx-auto mt-48">
        <div className="w-full flex">
          {/* login join header */}
          <p className="w-1/2 text-center text-3xl italic text-b-yellow font-bold border-b-2 border-b-yellow border-solid">
            <a href="#">Login</a>
          </p>
          <p className="w-1/2 text-center text-3xl italic text-gray-400 font-bold  border-b-2 border-b-gray-400 border-solid">
            <a href="#">Join</a>
          </p>
        </div>
        <div className="w-full">
          {/* 이메일 로그인 */}
          <form>
            <div className="w-100 mb-5">
              <input className="w-1/2" type="email" placeholder="Email" />
            </div>
            <div className="w-100 mb-5">
              <input type="password" placeholder="Password" />
            </div>
            <div className="w-100 mb-5">
              <button>Log in</button>
            </div>
            <div className="w-100 mb-5">
              <a href="#" className="w-1/2 underline">
                Forgot password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
