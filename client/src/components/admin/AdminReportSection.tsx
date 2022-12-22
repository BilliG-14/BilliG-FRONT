import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import ConfirmModal from 'components/Modal';
import { useCallback, useState } from 'react';

type Report = {
  _id: string;
  reporter: string;
  target: string;
  details: string;
};
/*Report CRUD */
const baseUrl = 'https://port-0-village-dpuqy925lbn63gyo.gksl2.cloudtype.app';
const endPoint = 'report';
const token = localStorage.getItem('token');
const apiReports = {
  GET: async () => {
    const { data } = await axios({
      url: `/${endPoint}`,
      method: 'get',
      baseURL: `${baseUrl}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  },
  DELETE: async (_id: string) => {
    const { data } = await axios({
      url: `/${endPoint}/${_id}`,
      method: 'delete',
      baseURL: `${baseUrl}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
export default function AdminReportSection() {
  const queryClient = useQueryClient();
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);
  const { isLoading, data, isError } = useQuery<any[], AxiosError>(
    ['reports'],
    apiReports.GET,
    {
      refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
      retry: 0, // 실패시 재호출 몇번 할지
      staleTime: 60 * 1000 * 60,
      onSuccess: (_data) => {
        // 성공시 호출
        console.log(_data);
      },
      onError: (e: Error) => {
        console.log(e.message);
      },
    },
  );
  const deleteMutation = useMutation(apiReports.DELETE, {
    onSuccess: (_data) => {
      queryClient.invalidateQueries(['reports']);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  if (isLoading) {
    return <p>데이터를 불러오는 중입니다...</p>;
  }
  if (isError) {
    return <p>데이터를 불러오지 못했습니다.</p>;
  }
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
          {data.map((report) => (
            <tr key={report._id} className="text-center">
              <td>{report.reporter.name}</td>
              <td className="text-red-500">{report.target?.name}</td>
              <td>{report.details}</td>
              <td className="w-14">
                <button
                  className="border-red-400 border-solid border-2 w-12 rounded-lg h-7 leading-7 text-red-400 after:content-['삭제'] shadow-lg hover:bg-red-400 hover:text-white"
                  onClick={() => setOpenModal(!isOpenModal)}
                ></button>
              </td>
              {isOpenModal && (
                <ConfirmModal
                  title={`${report.reporter.name}님의 신고내역을 삭제하시겠습니까?`}
                  yesColor="red-400"
                  yesText="삭제"
                  onClickToggleModal={onClickToggleModal}
                  onClickYes={() => {
                    deleteMutation.mutate(report._id);
                  }}
                />
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
