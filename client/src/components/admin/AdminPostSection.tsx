export default function AdminPostSection() {
  const postList = [
    {
      _id: 'p-1',
      date: '2022-12-12',
      title: '아이패드 3년 빌려주세요',
      author: '애플콜렉터999',
    },
    {
      _id: 'p-2',
      date: '2022-12-12',
      title: '아이패드 3년 빌려주세요',
      author: '애플콜렉터999',
    },
    {
      _id: 'p-3',
      date: '2022-12-12',
      title: '아이패드 3년 빌려주세요',
      author: '애플콜렉터999',
    },
  ];
  return (
    <section className="w-full text-b-text-black p-2">
      <table className="table-auto border-separate border-spacing-4 w-full">
        <thead className=" font-extrabold">
          <tr>
            <th>작성일자</th>
            <th>제목</th>
            <th>작성자</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody className="font-semibold">
          {postList.map((post) => (
            <tr key={post._id} className="text-center">
              <td>{post.date}</td>
              <td>{post.title}</td>
              <td>{post.author}</td>
              <td className="w-14">
                <button className="border-red-400 border-solid border-2 w-12 rounded-lg h-7 leading-7 text-red-400 after:content-['삭제'] shadow-lg hover:bg-red-400 hover:text-white"></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
