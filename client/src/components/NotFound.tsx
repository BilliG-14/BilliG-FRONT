import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="w-screen max-w-screen-lg mx-auto my-60">
      <div>
        <div className="relative">
          <img
            src="../../billig.png"
            alt="billig logo"
            className="w-[25%] mx-auto opacity-60"
          />

          <div className="absolute text-5xl font-black text-b-text-black top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            404 Not Found
          </div>
        </div>
        <div className="">
          <div className="text-lg leading-7 text-center p-4">
            헉! <br />
            잘못된 접근입니다
            <div className="text-sm">URL을 다시 확인해주세요.</div>
          </div>

          <div className="text-center p-4">
            <Link to="/">
              <button className="text-gray-900  bg-gray-200 font-medium rounded-lg text-sm px-3 py-1.5   transition duration-100">
                메인 홈페이지로 가기 →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
