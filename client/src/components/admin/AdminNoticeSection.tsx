import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from 'api/customAxios';
import { AxiosError } from 'axios';
import Loading from 'components/Loading';
import ConfirmModal from 'components/Modal';
import { useState } from 'react';
import { useNoticePageStore } from 'store/AdminPageStore';
import AdminNoticeHeader from './AdminNoticeHeader';
import AdminNoticeWriting from './AdminNoticeWriting';
import {
  NoticeType,
  CreatedNoticeType,
  UpdatedNoticeType,
  NoticesPaginateType,
} from 'types/noticeType';
const endPoint = 'notice';
export const apiNotice = {
  GETALL: async () => {
    const { data } = await api.get('notice?per=1000&page=1');
    return data;
  },
  GETONE: (id: string | undefined) => async () => {
    const { data } = await api.get(`/${endPoint}/${id}`);
    return data;
  },

  CREATE: async (newNotice: CreatedNoticeType) => {
    const { data } = await api.post(`/${endPoint}`, newNotice);
    return data;
  },
  UPDATE: async ({ updated, _id }: UpdatedNoticeType) => {
    const { data } = await api({
      url: `/${endPoint}/${_id}`,
      method: 'patch',
      data: updated,
    });
    return data;
  },
  DELETE: async (_id: string) => {
    await api.delete(`/${endPoint}/${_id}`);
  },
};
function AdminNoticeList() {
  /*react-query */
  const queryClient = useQueryClient();
  /*삭제할 공지 */
  const [targetNotice, setTargetNotice] = useState<NoticeType>();
  //공지글 읽어오기
  const {
    isLoading,
    data: paginatedNotices,
    isError,
  } = useQuery<NoticesPaginateType, AxiosError>(['notices'], apiNotice.GETALL, {
    refetchOnWindowFocus: false,
    retry: 0,
    staleTime: 60 * 1000 * 60,
  });
  const updateMutation = useMutation(apiNotice.UPDATE, {
    onSuccess: (_data) => {
      queryClient.invalidateQueries(['notices']);
    },
  });
  const deleteMutation = useMutation(apiNotice.DELETE, {
    onSuccess: (_data) => {
      queryClient.invalidateQueries(['notices']);
    },
  });
  if (isLoading) return <Loading />;
  return (
    <section className="w-full text-b-text-black dark:text-b-text-brightgray p-2">
      {isError && <p>데이터를 불러오는 데 실패하였습니다.</p>}
      <table className="table-auto border-separate border-spacing-4 w-full">
        <thead className=" font-extrabold">
          <tr>
            <th>작성일자</th>
            <th>제목</th>
            <th>작성자</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody className="font-semibold break-keep">
          {paginatedNotices &&
            paginatedNotices.docs.map((notice) => (
              <tr key={notice._id} className="text-center">
                <td className="w-36 py-2">
                  {new Date(notice.createdAt).toLocaleDateString()}
                </td>
                <td className="py-2">
                  <a
                    href={`/notices/${notice._id}`}
                    className="hover:text-b-yellow font-bold"
                  >
                    {notice.title}
                  </a>
                </td>
                <td className="w-36 py-2">{notice.writer?.nickName}</td>
                <td className="w-14 py-2">
                  <button
                    className="border-red-400 border-solid border-2 w-12 rounded-lg py-1 text-red-400 after:content-['삭제'] hover:bg-red-400 hover:text-white"
                    onClick={() => setTargetNotice(notice)}
                  ></button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {targetNotice && (
        <ConfirmModal
          title={`${targetNotice.title} 공지를 삭제하시겠습니까?`}
          yesColor="red-400"
          yesText="삭제"
          onClickToggleModal={() => {
            setTargetNotice(undefined);
          }}
          onClickYes={() => {
            deleteMutation.mutate(targetNotice._id);
            if (deleteMutation.isError) {
              alert(deleteMutation.error);
            }
          }}
        />
      )}
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
