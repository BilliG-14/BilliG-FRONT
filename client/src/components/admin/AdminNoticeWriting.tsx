export default function AdminNoticeWriting() {
  return (
    <div className="w-full">
      <form className="mt-6 flex flex-col w-3/4 mx-auto font-bold">
        <div>
          <label htmlFor="title" className="text-lg">
            제목
          </label>
          <input
            className="w-full h-10 border-solid border-2 rounded-lg px-4
        focus:outline-none focus:border-4"
            id="title"
            type="text"
            placeholder="제목을 입력해주세요"
          ></input>
        </div>
        <div className="my-3">
          <label htmlFor="content" className="font-bold text-lg text-left">
            내용
          </label>
          <textarea
            id="content"
            className="block w-full h-56 border-solid border-2 rounded-lg  p-4
        focus:outline-none focus:border-4"
            placeholder="내용을 입력해주세요"
          ></textarea>
        </div>
        <button className="w-1/6 h-10 hover:text-white border border-b-yellow hover:bg-b-yellow focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm mx-auto">
          등록하기
        </button>
      </form>
    </div>
  );
}
