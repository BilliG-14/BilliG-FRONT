import api from 'api/customAxios';
import { AxiosError } from 'axios';
import { Pagination } from 'components/Pagination';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Item } from 'components/myinfo/MyGivePostList';
import ListByCategory from 'components/productsList/ListByCategory';
import { useParams } from 'react-router-dom';
import ProductsListNav from 'components/productsList/ProductsListNav';

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
type ProductsListProps = {
  postType: string;
};
export default function ProductsList(props: ProductsListProps) {
  const { postType } = props;
  const { categoryId } = useParams();
  const [categoryName, setCategoryName] = useState<string>('');
  const [page, setPage] = useState(1);
  const endPoint = '/product/page';
  const per = 8;
  const {
    isLoading,
    data: products,
    isError,
  } = useQuery<Products, AxiosError>(
    [
      `${endPoint}?category=${categoryId}&per=${per}&page=${page}&postType=${postType}`,
    ],
    async () => {
      const res = await api.get(
        `${endPoint}?category=${categoryId}&per=${per}&page=${page}&postType=${postType}`,
      );
      return res.data;
    },
    {
      refetchOnWindowFocus: false,
      retry: 0,
      staleTime: 60 * 1000 * 60,
      onSuccess: (_data) => {
        console.log(_data);
      },
      onError: (e: Error) => {
        console.log(e.message);
      },
    },
  );
  if (isLoading) return <div className=""></div>;
  return (
    <div className="max-w-screen-lg m-auto pb-32">
      <ProductsListNav
        postType={postType}
        currentCategoryId={categoryId ? categoryId : ''}
        setCategoryName={setCategoryName}
        setPage={setPage}
      />
      {products && (
        <ListByCategory
          items={products?.docs}
          categoryName={categoryName}
          postType={postType}
        />
      )}
      <Pagination
        page={page}
        setPage={setPage}
        totalPage={products?.totalPages}
        hasNextPage={products?.hasNextPage}
        hasPrevPage={products?.hasPrevPage}
      />
    </div>
  );
}
