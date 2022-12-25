import { useState } from 'react';
import BorrowItemCard from './BorrowItemCard';
import { useQuery } from '@tanstack/react-query';
import api from '../../api/customAxios';
import { Item } from './MyLendPostList';
import { Pagination } from 'components/Pagination';

export default function MyBorrowDealList() {
  const [page, setPage] = useState(1);
  const { isLoading, data: borrowDealList } = useQuery(
    [`borrowDealList/${page}`],
    async () => {
      return api.get(
        `/product/page?borrower=${localStorage.getItem(
          'userId',
        )}&postType=lend&per=10&page=${page}&stateOfTransaction=1,2`,
      );
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000 * 60,
      retry: 1,
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  if (isLoading) return <p>Loading..</p>;
  return (
    <div className="w-4/5 p-12">
      {borrowDealList?.data.docs.map((item: Item) => (
        <BorrowItemCard key={item._id} item={item} />
      ))}
      <Pagination
        page={page}
        setPage={setPage}
        totalPage={borrowDealList?.data.totalPages}
        hasNextPage={borrowDealList?.data.hasNextPage}
        hasPrevPage={borrowDealList?.data.hasPrevPage}
      />
    </div>
  );
}
