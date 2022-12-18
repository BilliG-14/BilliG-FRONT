import { useNoticePageStore } from 'store/AdminPageStore';
import AdminNoticeHeader from './AdminNoticeHeader';
import AdminNoticeWriting from './AdminNoticeWriting';

const notices = [
  {
    _id: 'not0001',
    title: '오프닝 이벤트',
    auther: 'billig_admin1',
    content:
      '오픈 이벤트 중입니다. 하루 한번 게시물을 올리면 쿠폰이 발급됩니다.',
    date: '22-01-11',
  },
  {
    _id: 'not0002',
    title: '오프닝 이벤트 취소',
    auther: 'billig_admin2',
    content: '오픈 이벤트 중 끝났습니다. 쿠폰 발급이 모두 완료되었습니다.',
    date: '22-01-11',
  },
];
function AdminNoticeList() {
  return (
    <section className="w-full text-b-text-black p-2">
      <table className="table-auto border-separate border-spacing-4 w-full">
        <thead className=" font-extrabold">
          <tr>
            <th>작성일자</th>
            <th>제목</th>
            <th>작성자</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody className="font-semibold">
          {notices.map((notice) => (
            <tr key={notice._id} className="text-center">
              <td>{notice.date}</td>
              <td>{notice.title}</td>
              <td>{notice.auther}</td>
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

export default function AdminNoticeSection() {
  const isWriting = useNoticePageStore((state) => state.isWriting);
  return (
    <section className="w-full text-b-text-black p-2">
      <AdminNoticeHeader />
      {isWriting ? <AdminNoticeWriting /> : <AdminNoticeList />}
    </section>
  );
}
