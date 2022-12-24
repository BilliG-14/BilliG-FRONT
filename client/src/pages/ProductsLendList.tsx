import api from 'api/customAxios';
import { AxiosError } from 'axios';
import { Pagination } from 'components/Pagination';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

type Product = {
  address: string;
  title: string;
  description: string;
  _id: string;
};
type Products = {
  docs: [Product];
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

export default function ProductsLendList() {
  const [page, setPage] = useState(1);
  const endPoint = '/product/page';
  const postType = 'lend';
  const per = 2;
  const { isLoading, data, isError } = useQuery<Products, AxiosError>(
    [`products?per=${per}&page=${page}&postType=${postType}`],
    async () => {
      const res = await api.get(
        `${endPoint}?per=${per}&page=${page}&postType=${postType}`,
      );
      return res.data;
    },
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
  return (
    <div className="h-[800px] w-screen max-w-screen-lg m-auto">
      <div className="h-[800px] w-screen">
        {isLoading && <p>데이터를 불러오는 중입니다.</p>}
        {isError && <p className="m-16">데이터를 불러올 수 없습니다</p>}
        {data &&
          data.docs.map((product) => <p key={product._id}>{product.title}</p>)}
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        totalPage={data?.totalPages}
        hasNextPage={data?.hasNextPage}
        hasPrevPage={data?.hasPrevPage}
      />
    </div>
  );
}
