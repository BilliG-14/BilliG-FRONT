import { useState } from 'react';
import DoneItemCard from './DoneItemCard';
import { useQuery } from '@tanstack/react-query';
import api from '../../api/customAxios';
import { Item } from 'components/myinfo/MyLendPostList';
import { Pagination } from '../Pagination';

export default function MyLendDoneList() {
  const [page, setPage] = useState(1);
  const { isLoading, data: lendDoneList } = useQuery(
    [`lendDoneList/${page}`, `${localStorage.getItem('userId')}`],
    async () => {
      return api.get(
        `/product/page?author=${localStorage.getItem(
          'userId',
        )}&postType=lend&per=10&page=${page}&stateOfTransaction=3`,
      );
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000 * 5,
    },
  );

  if (isLoading) return <p>Loading..</p>;

  return (
    <div className="w-4/5 p-12">
      {lendDoneList?.data.docs.map((item: Item) => (
        <DoneItemCard key={item._id} item={item} />
      ))}
      <Pagination
        page={page}
        setPage={setPage}
        totalPage={lendDoneList?.data.totalPages}
        hasNextPage={lendDoneList?.data.hasNextPage}
        hasPrevPage={lendDoneList?.data.hasPrevPage}
      />
    </div>
  );
}
