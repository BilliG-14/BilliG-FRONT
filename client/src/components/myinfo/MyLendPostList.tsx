import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../api/customAxios';
// components
import GiveItemCard from './GiveItemCard';
import { Pagination } from 'components/Pagination';
import Loading from '../Loading';

export default function MyLendPostList() {
  const [page, setPage] = useState(1);
  const {
    isLoading,
    isError,
    data: giveList,
  } = useQuery(
    [`giveList/${page}`, `${localStorage.getItem('userId')}`],
    async () => {
      return api.get(
        `/product/page?author=${localStorage.getItem(
          'userId',
        )}&postType=lend&per=10&page=${page}&stateOfTransaction=0`,
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
      {giveList?.data.docs.length > 0 ? (
        giveList?.data.docs.map((item: Item) => (
          <GiveItemCard key={item._id} item={item} />
        ))
      ) : (
        <div className="flex items-center justify-center h-1/2 text-xl font-bold">
          <p>게시물이 존재하지 않습니다.</p>
        </div>
      )}
      {giveList?.data.docs.length > 0 && (
        <Pagination
          page={page}
          setPage={setPage}
          totalPage={giveList?.data.totalPages}
          hasNextPage={giveList?.data.hasNextPage}
          hasPrevPage={giveList?.data.hasPrevPage}
        />
      )}
    </div>
  );
}

export type Item = {
  address: string;
  author: string;
  category: string;
  createdAt: string;
  description: string;
  hashtag: string[];
  imgUrl: string[];
  period: { start: string; end: string };
  postType: string;
  price: { priceDay: number; priceTime: number };
  stateOfTransaction: number;
  title: string;
  tradeWay: { direct: boolean; delivery: boolean };
  updateAt: string;
  _id: string;
};
