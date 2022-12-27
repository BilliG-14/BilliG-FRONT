import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from 'api/customAxios';
import { AxiosError } from 'axios';
import ConfirmModal from 'components/Modal';
import { useState } from 'react';
import { useNoticePageStore } from 'store/AdminPageStore';
import AdminNoticeHeader from './AdminNoticeHeader';
import AdminNoticeWriting from './AdminNoticeWriting';

export interface Notice {
  _id: string;
  title: string;
  writer: {
    _id: string;
    nickName: string;
    name: string;
  };
  content: string;
  createdAt: string;
}
export interface UpdatedNotice {
  updated: {
    title: string;
    content: string;
  };
  _id: string;
}
export interface CreatedNotice {
  title: string;
  content: string;
}
const endPoint = 'notice';
export const apiReports = {
  GETALL: async () => {
    const { data } = await api.get(`/${endPoint}`);
    return data;
  },
  GETONE: (id: string | undefined) => async () => {
    const { data } = await api.get(`/${endPoint}/${id}`);
    return data;
  },

  CREATE: async (newNotice: CreatedNotice) => {
    const { data } = await api.post(`/${endPoint}`, newNotice);
    return data;
  },
  UPDATE: async ({ updated, _id }: UpdatedNotice) => {
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
  const [targetNotice, setTargetNotice] = useState<Notice>();
  //공지글 읽어오기
  const {
    isLoading,
    data: notices,
    isError,
  } = useQuery<Notice[], AxiosError>(['notices'], apiReports.GETALL, {
    refetchOnWindowFocus: false,
    retry: 0,
    staleTime: 60 * 1000 * 60,
  });
  const updateMutation = useMutation(apiReports.UPDATE, {
    onSuccess: (_data) => {
      queryClient.invalidateQueries(['notices']);
    },
  });
  const deleteMutation = useMutation(apiReports.DELETE, {
    onSuccess: (_data) => {
      queryClient.invalidateQueries(['notices']);
    },
  });
  return (
    <section className="w-full text-b-text-black p-2">
      {isLoading && <p>데이터를 불러오는 중입니다</p>}
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
          {notices &&
            notices.map((notice) => (
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
                <td className="w-36 py-2">{notice.writer.nickName}</td>
                <td className="w-14 py-2">
                  <button
                    className="border-red-400 border-solid border-2 w-12 rounded-lg h-7 leading-7 text-red-400 after:content-['삭제'] shadow-lg hover:bg-red-400 hover:text-white"
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
