import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from 'api/customAxios';
import { AxiosError } from 'axios';
import Loading from 'components/Loading';
import ConfirmModal from 'components/Modal';
import { Pagination } from 'components/Pagination';
import { useState } from 'react';
import { PostDataType } from '../../types/productType';

//페이지네이션을 위한 타입
export type PostsPaginateType = {
  docs: [PostDataType];
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: number;
  page: number;
  pagingCounter: number;
  prevPage: number;
  totalDocs: number;
};

/*Products CRUD */
const endPoint = 'product';
const apiProduct = {
  GET: (page: number, per: number) => {
    return async () => {
      const { data } = await api.get(
        `${endPoint}/page?per=${per}&page=${page}`,
      );
      return data;
    };
  },
  DELETE: async (_id: string) => {
    const { data } = await api({
      url: `/${endPoint}/${_id}`,
      method: 'delete',
    });
  },
};
export default function AdminPostSection() {
  const queryClient = useQueryClient();
  const [targetPost, setTargetPost] = useState<PostDataType>();
  const [page, setPage] = useState<number>(1);
  const per = 16;
  const {
    isLoading,
    data: postPaginate,
    isError,
  } = useQuery<PostsPaginateType, AxiosError>(
    [`${endPoint}`, `per=${per}`, `page=${page}`],
    apiProduct.GET(page, per),
    {
      refetchOnWindowFocus: false,
      retry: 0, // 실패시 재호출 몇번 할지
      staleTime: 60 * 1000 * 60,
    },
  );
  const deleteMutation = useMutation(apiProduct.DELETE, {
    onSuccess: (_data) => {
      queryClient.invalidateQueries([
        `${endPoint}`,
        `per=${per}`,
        `page=${page}`,
      ]);
    },
  });
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <p>데이터를 불러오지 못했습니다.</p>;
  }
  return (
    <section className="w-full text-b-text-black p-2">
      <table className="table-auto border-separate border-spacing-4 w-full">
        <thead className=" font-extrabold">
          <tr>
            <th>작성일자</th>
            <th>제목</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody className="font-semibold">
          {postPaginate.docs.map((post) => {
            return (
              <tr key={post._id} className="text-center">
                <td>{new Date(post.createdAt).toLocaleString()}</td>
                <td>
                  <a href={`/read/${post._id}`}>
                    <span className="hover:font-bold hover:text-b-yellow">
                      {post.title}
                    </span>
                  </a>
                </td>
                <td className="w-14">
                  <button
                    className="border-red-400 border-solid border-2 w-12 rounded-lg h-7 leading-7 text-red-400 after:content-['삭제'] shadow-lg hover:bg-red-400 hover:text-white"
                    onClick={() => setTargetPost(post)}
                  ></button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {targetPost && (
        <ConfirmModal
          title={`${targetPost.title} 게시글을 삭제하시겠습니까?`}
          yesColor="red-400"
          yesText="삭제"
          onClickToggleModal={() => setTargetPost(undefined)}
          onClickYes={() => {
            deleteMutation.mutate(targetPost._id);
          }}
        />
      )}
      <div className="mt-10 mb-10">
        <Pagination
          setPage={setPage}
          page={page}
          hasNextPage={postPaginate.hasNextPage}
          hasPrevPage={postPaginate.hasPrevPage}
          totalPage={postPaginate.totalPages}
        />
      </div>
    </section>
  );
}
