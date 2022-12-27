import Nav from 'components/nav/Nav';
import { apiReports, Notice } from 'components/admin/AdminNoticeSection';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Loading from 'components/Loading';

export type NoticesPaginateType = {
  docs: [Notice];
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: number;
  page: number;
  pagingCounter: number;
  prevPage: number;
  totalDocs: number;
};

export default function Notices() {
  const {
    isLoading,
    data: noticesPaginate,
    isError,
  } = useQuery<NoticesPaginateType, AxiosError>(
    ['notices'],
    apiReports.GETALL,
    {
      refetchOnWindowFocus: false,
      retry: 0,
      staleTime: 60 * 1000 * 60,
    },
  );
  if (isLoading) return <Loading />;
  console.log(noticesPaginate);
  return (
    <div className="w-screen m-auto">
      <div className="max-w-screen-lg mx-auto">
        <div className="text-3xl font-extrabold ml-10 mt-10">
          <p>공지사항</p>
        </div>
        <div className="ml-10 mt-16 border-y border-solid border-b-text-gray">
          <table className="w-full">
            <tbody className="text-b-text-black">
              {noticesPaginate &&
                noticesPaginate.docs.map((notice) => (
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
