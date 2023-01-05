import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
// type
import { GetItemType } from 'types/productType';
// components
import { Pagination } from 'components/Pagination';
import Loading from '../Loading';
import { getDealList } from '../../api/product-api';
import ItemCard from './ItemCard';

export default function MyLendDealList() {
  const [page, setPage] = useState(1);
  const target = 'lender';
  const stateOfTransaction = '1,2';

  const {
    isLoading,
    isError,
    data: lendDealList,
  } = useQuery(
    [`lendDealList/${page}`, `${localStorage.getItem('userId')}`],
    async () => getDealList(target, page, stateOfTransaction),
    {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000 * 5,
    },
  );

  if (isLoading) return <Loading />;

  return (
    <div className="w-4/5 p-12">
      {lendDealList?.data.docs.length > 0 ? (
        lendDealList?.data.docs.map((item: GetItemType) => (
          <ItemCard key={item._id} type="lend" item={item} />
        ))
      ) : (
        <div className="flex items-center justify-center h-1/2 text-xl font-bold">
          <p>게시물이 존재하지 않습니다.</p>
        </div>
      )}
      {lendDealList?.data.docs.length > 0 && (
        <Pagination
          page={page}
          setPage={setPage}
          totalPage={lendDealList?.data.totalPages}
          hasNextPage={lendDealList?.data.hasNextPage}
          hasPrevPage={lendDealList?.data.hasPrevPage}
        />
      )}
    </div>
  );
}
