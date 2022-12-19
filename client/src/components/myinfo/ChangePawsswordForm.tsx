import { useRef } from 'react';
import { usePasswordEditStore } from 'store/MypageStore';

export default function ChangePawsswordForm() {
  const { togglePw } = usePasswordEditStore();

  const currentPwRef = useRef<HTMLInputElement | null>(null);
  const changePwRef = useRef<HTMLInputElement | null>(null);
  const confirmChangePwRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(currentPwRef.current?.value);
    console.log(changePwRef.current?.value);
    console.log(confirmChangePwRef.current?.value);

    if (changePwRef.current?.value !== confirmChangePwRef.current?.value) {
      // validation?
      return;
    }
    // server 통신로직.
    togglePw();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
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
            type="text"
            placeholder="현재 비밀번호.."
            name="password"
            ref={currentPwRef}
            onChange={handleChange}
            className="w-3/5 font-medium border border-solid border-gray-300 py-2 px-2 rounded-lg focus:border-b-yellow focus:outline-none mb-1"
          />
          <input
            type="text"
            placeholder="새로운 비밀번호.."
            name="password"
            ref={changePwRef}
            onChange={handleChange}
            className="w-3/5 font-medium border border-solid border-gray-300 py-2 px-2 rounded-lg focus:border-b-yellow focus:outline-none mb-1"
          />
          <input
            type="text"
            placeholder="새로운 비밀번호 확인.."
            name="password"
            ref={confirmChangePwRef}
            onChange={handleChange}
            className="w-3/5 font-medium border border-solid border-gray-300 py-2 px-2 rounded-lg focus:border-b-yellow focus:outline-none mb-1"
          />
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
    </section>
  );
}
