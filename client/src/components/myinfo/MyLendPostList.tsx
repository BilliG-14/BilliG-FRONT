import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
// components
import { Pagination } from 'components/Pagination';
import Loading from '../Loading';
import { getDealList } from '../../api/product-api';
import { GetItemType } from 'types/productType';
import ItemCard from './ItemCard';

export default function MyLendPostList() {
  const [page, setPage] = useState(1);
  const target = 'author';
  const stateOfTransaction = '0';
  const postType = 'lend';
  const {
    isLoading,
    isError,
    data: giveList,
  } = useQuery(
    [`giveList/${page}`, `${localStorage.getItem('userId')}`],
    async () => getDealList(target, page, stateOfTransaction, postType),
    {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000 * 5,
    },
  );

  if (isLoading) return <Loading />;

  return (
    <div className="w-4/5 p-12">
      {giveList?.data.docs.length > 0 ? (
        giveList?.data.docs.map((item: GetItemType) => (
          <ItemCard key={item._id} type="lend" item={item} />
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
