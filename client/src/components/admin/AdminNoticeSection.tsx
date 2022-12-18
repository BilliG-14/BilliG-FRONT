import { TextField } from '@mui/material';

function AdminNoticeHeader() {
  return (
    <header className="flex w-full py-2 border-b-4 border-solid border-b-text-gray items-center">
      <a href="#!">
        <p
          className={
            'w-36 text-center font-bold text-lg hover:scale-110  transition ' +
            'text-b-yellow'
          }
        >
          공지 작성하기
        </p>
      </a>
      <a href="#!">
        <p className="w-36 text-center font-bold text-lg hover:scale-110  transition">
          공지사항 목록
        </p>
      </a>
    </header>
  );
}
function AdminNoticeWriting() {
  return (
    <div className="w-full">
      <form className="mt-6 w-full">
        <div>
          <label
            htmlFor="nickname"
            className="block font-bold text-lg w-3/4 my-auto text-left mx-auto"
          >
            제목
          </label>
          <input
            className="block w-3/4 h-10 border-solid border-2 rounded-lg px-4 font-bold
        focus:outline-none focus:border-4 mx-auto"
            type="text"
            placeholder="제목을 입력해주세요"
          ></input>
        </div>
        <div className="mx-auto my-3">
          <label
            htmlFor="nickname"
            className="block w-3/4 font-bold text-lg text-left mx-auto"
          >
            내용
          </label>
          <textarea
            className="block w-3/4 h-56 p-3 border-solid mx-auto border-2 rounded-lg px-4 font-bold
        focus:outline-none focus:border-4"
            placeholder="내용을 입력해주세요"
          ></textarea>
        </div>
      </form>
    </div>
  );
}
function AdminNoticeList() {
  return <div className="w-full"></div>;
}

export default function AdminNoticeSection() {
  return (
    <section className="w-full text-b-text-black p-2">
      <AdminNoticeHeader />
      {false && <AdminNoticeWriting />}
    </section>
  );
}
