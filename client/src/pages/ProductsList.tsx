import api from 'api/customAxios';
import { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { CategoryType } from 'store/PostWriteStore';
import { PostDataType } from '../store/PostReadStore';
//컴포넌트
import { Pagination } from 'components/Pagination';
import ListByCategory from 'components/productsList/ListByCategory';
import ProductsListNav from 'components/productsList/ProductsListNav';
import Loading from 'components/Loading';
import NotFound from 'components/NotFound';
import Footer from 'components/footer/Footer';
export type Products = {
  docs: [PostDataType];
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
  const [page, setPage] = useState(1);
  const per = 8;
  useEffect(() => {
    setPage(1);
  }, [categoryId]);
  /*아이템 목록에 사용될 통신 */
  const {
    isLoading: isLoadingItem,
    data: products,
    isError: isErrorItem,
  } = useQuery<Products, AxiosError>(
    [
      `product`,
      `category=${categoryId}`,
      `per=${per}`,
      `page=${page}`,
      `postType=${postType}`,
      `stateOfTransaction=${0}`,
    ],
    async () => {
      const res = await api.get(
        `/product/page?category=${categoryId}&per=${per}&page=${page}&postType=${postType}&stateOfTransaction=${0}`,
      );
      return res.data;
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000 * 5,
    },
  );

  if (!categoryId) return <NotFound />;
  if (isLoadingItem) return <Loading />;
  if (isErrorItem) return <NotFound />;
  return (
    <div className="w-screen relative pb-[100px] min-h-[85vh]">
      <div className="max-w-screen-lg m-auto pb-24 min-w-[922px]">
        <ProductsListNav postType={postType} />
        {products && <ListByCategory items={products?.docs} />}
        <Pagination
          page={page}
          setPage={setPage}
          totalPage={products?.totalPages}
          hasNextPage={products?.hasNextPage}
          hasPrevPage={products?.hasPrevPage}
        />
      </div>
      <div className="w-full h-[100px] absolute bottom-0">
        <Footer />
      </div>
    </div>
  );
}
