import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
// components
import { Pagination } from 'components/Pagination';
import Loading from '../Loading';
import { getPostByUserId } from '../../api/product-api';
import { PostDataType } from 'types/productType';
import ListItemCard from 'components/productsList/ListItemCard';

interface RecentPostsProps {
  userId: string;
}

export default function RecentPosts({ userId }: RecentPostsProps) {
  const [page, setPage] = useState(1);
  const stateOfTransaction = '0,1,2,3';
  const {
    isLoading,
    isError,
    data: postList,
  } = useQuery(
    [`postList/${page}`, userId],
    async () => getPostByUserId(userId, page, stateOfTransaction),
    {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000 * 5,
    },
  );

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <p className="flex justify-center font-bold text-lg">
        게시물을 불러올 수 없습니다.
      </p>
    );
  return (
    <div className="w-full">
      {postList.docs.length > 0 ? (
        postList.docs.map((item: PostDataType) => (
          <ListItemCard key={item._id} item={item} />
        ))
      ) : (
        <div className="flex items-center justify-center h-1/2 text-xl font-bold">
          <p>게시물이 존재하지 않습니다.</p>
        </div>
      )}
      <div className="flex justify-center mt-3 mb-6">
        {postList?.docs.length > 0 && (
          <Pagination
            page={page}
            setPage={setPage}
            totalPage={postList.totalPages}
            hasNextPage={postList.hasNextPage}
            hasPrevPage={postList.hasPrevPage}
          />
        )}
      </div>
    </div>
  );
}
