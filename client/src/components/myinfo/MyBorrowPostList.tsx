import { useState } from 'react';
import BorrowItemCard from './BorrowItemCard';
import { useQuery } from '@tanstack/react-query';
import api from '../../api/customAxios';
import { Item } from './MyLendPostList';
import { Pagination } from 'components/Pagination';

export default function MyBorrowPostList() {
  const [page, setPage] = useState(1);
  const { isLoading, data: borrowList } = useQuery(
    [`borrowList/${page}`, `${localStorage.getItem('userId')}`],
    async () => {
      return api.get(
        `/product/page?author=${localStorage.getItem(
          'userId',
        )}&postType=borrow&per=10&page=${page}&stateOfTransaction=0`,
      );
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000 * 5,
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
      {borrowList?.data.docs.map((item: Item) => (
        <BorrowItemCard key={item._id} item={item} />
      ))}
      <Pagination
        page={page}
        setPage={setPage}
        totalPage={borrowList?.data.totalPages}
        hasNextPage={borrowList?.data.hasNextPage}
        hasPrevPage={borrowList?.data.hasPrevPage}
      />
    </div>
  );
}
