type Report = {
  _id: string;
  reporter: string;
  target: string;
  details: string;
};
const reports: Report[] = [
  {
    _id: 'r-1-ac4',
    reporter: '프로신고러',
    target: '명륜진사갈비',
    details:
      '이 사람 완전 악질입니다. 노쇼에 허위매물 사기쳐요. 아니 글쎼 이 사기꾼이 저번에 나한테 5만원에 빌려준다고 해서 나왔는데 첫날에는 얼굴도 안비치더니, 다음에 또 연락와서 나왔을땐 갑자기 6만원 달라고 하고. 내가 진짜 어이가 없어서 와따 세상 참말로 무섭네잉',
  },
];
export default function AdminReportSection() {
  return (
    <section className="w-full text-b-text-black p-2">
      <table className="table-auto border-separate border-spacing-4 w-full">
        <thead className=" font-extrabold">
          <tr>
            <th>신고자</th>
            <th>대상</th>
            <th className="w-96">내역</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody className="font-semibold">
          {reports.map((report) => (
            <tr key={report._id} className="text-center">
              <td>{report.reporter}</td>
              <td className="text-red-500">{report.target}</td>
              <td>{report.details}</td>
              <td className="w-14">
                <button className=" bg-orange-400 w-12 rounded-lg h-7 group text-white font-bold after:content-['삭제'] shadow-lg hover:bg-red-400"></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
