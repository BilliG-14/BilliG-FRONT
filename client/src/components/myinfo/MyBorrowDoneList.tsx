import { useState } from 'react';
import DoneItemCard from './DoneItemCard';
import { useQuery } from '@tanstack/react-query';
import api from '../../api/customAxios';
import { Item } from 'components/myinfo/MyLendPostList';

export default function MyBorrowDoneList() {
  const [page, setPage] = useState(1);
  const { isLoading, data: borrowDoneList } = useQuery(
    [`borrowDoneList/${page}`],
    async () => {
      return api.get(
        `/product/page?borrower=${localStorage.getItem(
          'userId',
        )}&postType=lend&per=10&page=${page}&stateOfTransaction=3`,
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
      {borrowDoneList?.data.docs.map((item: Item) => (
        <DoneItemCard key={item._id} item={item} />
      ))}
    </div>
  );
}
