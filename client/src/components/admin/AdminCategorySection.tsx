export default function AdminCategorySection() {
  const datas = [
    { _id: '001', name: '의류' },
    { _id: '002', name: '카메라' },
  ];
  return (
    <section className="w-full text-b-text-black p-2">
      <div className="w-2/3 mx-auto mt-12">
        <div>
          <input
            className="w-4/5 h-10 border-solid border-2 rounded-lg px-4
        focus:outline-none focus:border-4 mr-2"
            placeholder="새 카테고리 이름을 입력해주세요"
          />
          <button className="w-1/6 h-10 hover:text-white border-2 text-b-text-black border-b-yellow hover:bg-b-yellow focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm">
            등록하기
          </button>
        </div>
        <div className="flex mt-8">
          <div className="w-1/2 pl-4 text-lg font-bold ">
            <ul>
              {datas.map((data) => {
                return (
                  <li key={data._id} className="hover:text-b-yellow mb-1">
                    <a href="#!">{data.name}</a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="w-1/2 pl-4 text-lg font-bold ">
            <input
              className="w-full h-10 border-solid border-2 rounded-lg px-4
        focus:outline-none focus:border-4 mt-8"
              placeholder="의류"
            />
            <button className="w-full mt-4 h-8 rounded-lg bg-green-500 text-white transition-colors hover:bg-gradient-to-r from-lime-800 to-green-400">
              수정하기
            </button>
            <button className="w-full mt-4 h-8 rounded-lg bg-red-400 text-white hover:bg-gradient-to-r from-rose-700 to-red-300">
              삭제하기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
