import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiReports, getReports } from 'api/report-api';
import { AxiosError } from 'axios';
import Loading from 'components/Loading';
import ConfirmModal from 'components/Modal';
import { useState } from 'react';
import { ReportType } from 'types/reportType';

export default function AdminReportSection() {
  const queryClient = useQueryClient();
  //신고내역 선택
  const [targetReport, setTargetReport] = useState<ReportType>();
  /*신고내역 받아오기*/
  const { isLoading, data, isError } = useQuery<ReportType[], AxiosError>(
    ['reports'],
    getReports,
    {
      refetchOnWindowFocus: false,
      retry: 0, // 실패시 재호출 몇번 할지
      staleTime: 60 * 1000 * 60,
    },
  );
  /*신고내역 삭제*/
  const deleteMutation = useMutation(apiReports.DELETE, {
    onSuccess: (_data) => {
      queryClient.invalidateQueries(['reports']);
    },
  });
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <p>데이터를 불러오지 못했습니다.</p>;
  }
  return (
    <section className="w-full text-b-text-black dark:text-b-dark-text p-2">
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
              <td>
                {report.reporter?.name
                  ? report.reporter?.name
                  : '존재하지 않는 계정'}
              </td>
              <td className="text-red-500">
                {report?.target?.name
                  ? report?.target?.name
                  : '존재하지 않는 계정'}
              </td>
              <td>{report.details}</td>
              <td className="w-14">
                <button
                  className="border-red-400 border-solid border-2 w-12 rounded-lg text-red-400 after:content-['삭제'] hover:bg-red-400 hover:text-white py-1"
                  onClick={() => setTargetReport(report)}
                ></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {targetReport && (
        <ConfirmModal
          title={`${targetReport.reporter?.name}님의 ${targetReport.target?.name}신고내역을 삭제하시겠습니까?`}
          yesColor="red-400"
          yesText="삭제"
          onClickToggleModal={() => setTargetReport(undefined)}
          onClickYes={() => {
            deleteMutation.mutate(targetReport._id);
          }}
        />
      )}
    </section>
  );
}
