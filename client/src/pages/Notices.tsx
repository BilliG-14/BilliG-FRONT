import Nav from 'components/nav/Nav';
import { apiReports, Notice } from 'components/admin/AdminNoticeSection';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export default function Notices() {
  const {
    isLoading,
    data: notices,
    isError,
  } = useQuery<Notice[], AxiosError>(['notices'], apiReports.GETALL, {
    refetchOnWindowFocus: false,
    retry: 0,
    staleTime: 60 * 1000 * 60,
  });
  return (
    <div className="w-screen m-auto">
      <div className="max-w-screen-lg mx-auto">
        <div className="text-3xl font-extrabold ml-10 mt-10">
          <p>공지사항</p>
        </div>
        <div className="ml-10 mt-16 border-y border-solid border-b-text-gray">
          <table className="w-full">
            <tbody className="text-b-text-black">
              {notices &&
                notices.map((notice) => (
                  <tr key={notice._id}>
                    <td className="w-24 text-center py-4 px-1 font-bold">
                      공지
                    </td>
                    <td className="text-center py-4 px-1 font-medium">
                      <a href={`/notices/${notice._id}`}>
                        [공지] {notice.title}
                      </a>
                    </td>
                    <td className="w-52 text-center py-4 px-1 font-medium">
                      {notice.writer?.nickName}
                    </td>
                    <td className="w-36 text-center py-4 px-1 font-medium">
                      {new Date(notice.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
