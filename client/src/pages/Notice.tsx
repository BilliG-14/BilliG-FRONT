import Nav from 'components/nav/Nav';
import { apiReports, Notice } from 'components/admin/AdminNoticeSection';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import MarkdownRenderer from '../components/MarkdownRenderer';
import Loading from 'components/Loading';
import Footer from 'components/footer/Footer';

export default function ReadNotice() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    isLoading,
    data: notice,
    isError,
  } = useQuery<Notice, AxiosError>([`notices/${id}`], apiReports.GETONE(id), {
    refetchOnWindowFocus: false,
    retry: 0, // 실패시 재호출 몇번 할지
    staleTime: 60 * 1000 * 60,
  });
  if (isLoading) return <Loading />;
  return (
    <div className="w-screen m-auto relative pb-[70px] min-h-[85vh]">
      <div className="max-w-screen-lg mx-auto">
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
              <div className="mt-16 pb-24">
                <MarkdownRenderer content={notice.content} />
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-center pb-20">
          <button
            className="px-2 py-1 text-lg rounded-md border-2 border-solid text-b-text-black font-semibold
            hover:bg-b-yellow hover:text-white transition-colors hover:border-b-yellow"
            onClick={() => navigate('/notices')}
          >
            목록으로
          </button>
        </div>
      </div>
      <div className="w-full h-[70px] absolute bottom-0 flex flex-col justify-end">
        <Footer />
      </div>
    </div>
  );
}
