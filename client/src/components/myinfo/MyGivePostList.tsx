import { useState } from 'react';
import GiveItemCard from './GiveItemCard';
import { useQuery } from '@tanstack/react-query';
import api from '../../api/customAxios';

export default function MyGivePostList() {
  const { isLoading, data: giveList } = useQuery(
    ['giveList'],
    async () => {
      return api.get(
        `/product/page?author=${localStorage.getItem(
          'userId',
        )}&postType=lend&per=10&page=1`,
      );
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000 * 5,
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
      {[...giveList?.data.docs].map((item: Item) => (
        <GiveItemCard key={item._id} item={item} />
      ))}
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
