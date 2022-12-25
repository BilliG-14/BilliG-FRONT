import api from 'api/customAxios';
import { AxiosError } from 'axios';
import { Pagination } from 'components/Pagination';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import CategoryNav from 'components/category-submain/CategoryNav';
import SubmainLendItemCard from '../components/category-submain/SubmainLendItemCard';
import Nav from 'components/nav/Nav';
import { Item } from 'components/myinfo/MyGivePostList';
type Products = {
  docs: [Item];
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
  const categoryId = '63a16fe01027a8c93f03ade0';
  const { isLoading, data, isError } = useQuery<Products, AxiosError>(
    [
      `products?category=${categoryId}&per=${per}&page=${page}&postType=${postType}`,
    ],
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
    <div className="max-w-screen-lg m-auto">
      <Nav />
      <CategoryNav />
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
