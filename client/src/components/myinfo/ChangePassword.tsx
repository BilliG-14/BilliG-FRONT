import { usePasswordEditStore } from 'store/MypageStore';

export default function ChangePassword() {
  const { togglePw } = usePasswordEditStore();

  return (
    <section className="change_password">
      <div className="change flex items-center h-18 py-4 border-b border-solid border-gray-200">
        <div className="w-40 text-lg leading-normal font-bold">
          <h3>비밀번호 변경</h3>
        </div>
        <div className="w-full flex items-center justify-start text-base leading-normal">
          <button
            className="w-1/6 h-10 hover:text-white border border-b-tag-dir hover:bg-b-tag-dir focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            onClick={togglePw}
          >
            변경하기
          </button>
        </div>
      </div>
    </section>
  );
}
