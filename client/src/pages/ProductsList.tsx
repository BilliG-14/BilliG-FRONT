import api from 'api/customAxios';
import { AxiosError } from 'axios';
import { Pagination } from 'components/Pagination';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Item } from 'components/myinfo/MyLendPostList';
import ListByCategory from 'components/productsList/ListByCategory';
import { useParams } from 'react-router-dom';
import ProductsListNav from 'components/productsList/ProductsListNav';
import Loading from 'components/Loading';
import { CategoryType } from 'store/PostWriteStore';
import NotFound from 'components/NotFound';

export type Products = {
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
  const [page, setPage] = useState(1);
  const [categoryName, setCategoryName] = useState('분류 없음');
  const per = 8;
  /*아이템 목록에 사용될 통신 */
  const {
    isLoading: isLoadingItem,
    data: products,
    isError: isErrorItem,
  } = useQuery<Products, AxiosError>(
    [
      `product/page`,
      `category=${categoryId}`,
      `per=${per}`,
      `page=${page}`,
      `postType=${postType}`,
    ],
    async () => {
      const res = await api.get(
        `/product/page?category=${categoryId}&per=${per}&page=${page}&postType=${postType}`,
      );
      return res.data;
    },
  );
  /*네비게이션에 사용될 카테고리 목록 통신 */
  const {
    isLoading: isLoadingCategory,
    data: categories,
    isError: isErrorCategory,
  } = useQuery<CategoryType[], AxiosError>(['category'], async () => {
    const res = await api.get('/category');
    return res.data;
  });
  useEffect(() => {
    setPage(1);
    const targetCategory = categories?.find(
      (category) => category._id === categoryId,
    );
    const newCategoryName = targetCategory?.name;
    setCategoryName(newCategoryName ? newCategoryName : '분류없음');
  }, [categoryId]);
  if (!categoryId) return <NotFound />;
  if (isLoadingItem || isLoadingCategory) return <Loading />;
  if (isErrorItem || isErrorCategory) return <NotFound />;
  return (
    <div className="max-w-screen-lg m-auto pb-32">
      {categories && (
        <ProductsListNav postType={postType} categories={categories} />
      )}
      {products && categories && (
        <ListByCategory
          items={products?.docs}
          categoryName={categoryName ? categoryName : '분류 없음'}
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
