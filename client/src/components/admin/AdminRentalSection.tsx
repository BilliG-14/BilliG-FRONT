export default function AdminRentalSection() {
  const rentalList = [
    {
      _id: 'p-1',
      date: '2022-12-12',
      title: '아이패드 3년 빌려주세요',
      author: '애플콜렉터999',
      state: '미진행',
    },
    {
      _id: 'p-2',
      date: '2022-12-12',
      title: '전동킥보드 빌려들비니다.',
      author: '헬멧따위',
      state: '대여 및 반납완료',
    },
    {
      _id: 'p-3',
      date: '2022-12-12',
      title: '에어팟 3시간 빌려주세요',
      author: '콩나물마니아',
      state: '대여 및 반납완료',
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
            <th>대여 현황</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody className="font-semibold">
          {rentalList.map((rental) => (
            <tr key={rental._id} className="text-center">
              <td>{rental.date}</td>
              <td>{rental.title}</td>
              <td>{rental.author}</td>
              <td>{rental.state}</td>
              <td className="w-14">
                <button className="border-red-400 border-solid border-2 w-12 rounded-lg h-7 leading-7 text-red-400 after:content-['삭제'] hover:bg-red-400 hover:text-white"></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
