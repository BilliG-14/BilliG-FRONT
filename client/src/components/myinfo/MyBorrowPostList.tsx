import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
// Type
import { GetItemType } from 'types/productType';
// components
import BorrowItemCard from './BorrowItemCard';
import { Pagination } from 'components/Pagination';
import Loading from '../Loading';
import { getDealList } from '../../api/product-api';

export default function MyBorrowPostList() {
  const [page, setPage] = useState(1);
  const target = 'author';
  const stateOfTransaction = '0';
  const postType = 'borrow';
  const {
    isLoading,
    isError,
    data: borrowList,
  } = useQuery(
    [`borrowList/${page}`, `${localStorage.getItem('userId')}`],
    async () => getDealList(target, page, stateOfTransaction, postType),
    {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000 * 5,
    },
  );

  if (isLoading) return <Loading />;
  return (
    <div className="w-4/5 p-12">
      {borrowList?.data.docs.length > 0 ? (
        borrowList?.data.docs.map((item: GetItemType) => (
          <BorrowItemCard key={item._id} item={item} />
        ))
      ) : (
        <div className="flex items-center justify-center h-1/2 text-xl font-bold">
          <p>게시물이 존재하지 않습니다.</p>
        </div>
      )}
      {borrowList?.data.docs.length > 0 && (
        <Pagination
          page={page}
          setPage={setPage}
          totalPage={borrowList?.data.totalPages}
          hasNextPage={borrowList?.data.hasNextPage}
          hasPrevPage={borrowList?.data.hasPrevPage}
        />
      )}
    </div>
  );
}
