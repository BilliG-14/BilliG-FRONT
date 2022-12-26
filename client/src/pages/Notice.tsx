import Nav from 'components/nav/Nav';
import { apiReports, Notice } from 'components/admin/AdminNoticeSection';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { createGlobalStyle } from 'styled-components';

export default function ReadNotice() {
  const { id } = useParams();
  const {
    isLoading,
    data: notice,
    isError,
  } = useQuery<Notice, AxiosError>([`notices/${id}`], apiReports.GETONE(id), {
    refetchOnWindowFocus: false,
    retry: 0, // 실패시 재호출 몇번 할지
    staleTime: 60 * 1000 * 60,
    onSuccess: (_data) => {
      // 성공시 호출
      console.log(_data);
    },
    onError: (e: Error) => {
      console.log(e);
    },
  });

  console.log(notice);
  return (
    <div className="w-screen m-auto">
      <div className="max-w-screen-lg mx-auto">
        <Nav />
        <div className="text-xl font-extrabold ml-10 mt-10">
          <p>공지사항</p>
        </div>
        <div className="ml-10 mt-6 text-b-text-black">
          {isError && (
            <div className="flex justify-center items-center">
              <p className="text-4xl">데이터를 불러올 수 없습니다.</p>
            </div>
          )}
          {notice && (
            <div>
              <p className="text-3xl font-extrabold">[공지] {notice.title}</p>
              <p className="text-base mt-2">
                {new Date(notice.createdAt).toLocaleDateString()}
              </p>
              <div className="mt-16 pb-32">
                <MarkdownRenderer content={notice.content} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
