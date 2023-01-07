import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getDealList } from '../../api/product-api';
// type
import { PostDataType } from 'types/productType';
// components
import ItemCard from './ItemCard';
import { Pagination } from 'components/Pagination';

interface MyPostDealListProps {
  param: string;
  target: string;
  stateOfTransaction: string;
  postType?: string;
}

export default function MyPostDealList({
  param,
  target,
  stateOfTransaction,
  postType,
}: MyPostDealListProps) {
  const [page, setPage] = useState(1);

  const { data } = useQuery(
    [`${param}/${page}`, `${localStorage.getItem('userId')}`],
    async () => getDealList(target, page, stateOfTransaction, postType),
    {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000 * 5,
      suspense: true,
    },
  );

  return (
    <div className="w-4/5 p-12">
      {data?.docs.length > 0 ? (
        data?.docs.map((item: PostDataType) => (
          <ItemCard key={item._id} type="borrow" item={item} />
        ))
      ) : (
        <div className="flex items-center justify-center h-1/2 text-xl font-bold">
          <p>게시물이 존재하지 않습니다.</p>
        </div>
      )}
      {data?.length > 0 && (
        <Pagination
          page={page}
          setPage={setPage}
          totalPage={data?.totalPages}
          hasNextPage={data?.hasNextPage}
          hasPrevPage={data?.hasPrevPage}
        />
      )}
    </div>
  );
}
