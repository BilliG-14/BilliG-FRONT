import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../api/customAxios';
// Type
import { Item } from 'components/myinfo/MyLendPostList';
// componets
import DoneItemCard from './DoneItemCard';
import { Pagination } from '../Pagination';
import Loading from '../Loading';

export default function MyLendDoneList() {
  const [page, setPage] = useState(1);
  const {
    isLoading,
    isError,
    data: lendDoneList,
  } = useQuery(
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

  if (isLoading) return <Loading />;

  return (
    <div className="w-4/5 p-12">
      {lendDoneList?.data.docs.length > 0 ? (
        lendDoneList?.data.docs.map((item: Item) => (
          <DoneItemCard key={item._id} item={item} />
        ))
      ) : (
        <div className="flex items-center justify-center h-1/2 text-xl font-bold">
          <p>게시물이 존재하지 않습니다.</p>
        </div>
      )}
      {lendDoneList?.data.docs.length > 0 && (
        <Pagination
          page={page}
          setPage={setPage}
          totalPage={lendDoneList?.data.totalPages}
          hasNextPage={lendDoneList?.data.hasNextPage}
          hasPrevPage={lendDoneList?.data.hasPrevPage}
        />
      )}
    </div>
  );
}
