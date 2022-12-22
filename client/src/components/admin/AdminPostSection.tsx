import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import ConfirmModal from 'components/Modal';
import { useCallback, useState } from 'react';

/*Category CRUD */
const baseUrl = 'https://port-0-village-dpuqy925lbn63gyo.gksl2.cloudtype.app';
const endPoint = 'product';
const token = localStorage.getItem('token');
const apiProduct = {
  GET: async () => {
    const { data } = await axios.get(`${baseUrl}/${endPoint}`);
    return data;
  },
  DELETE: async (_id: string) => {
    const { data } = await axios({
      url: `/${endPoint}/${_id}`,
      method: 'delete',
      baseURL: `${baseUrl}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
export default function AdminPostSection() {
  const queryClient = useQueryClient();
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);
  const { isLoading, data, isError } = useQuery<any[], AxiosError>(
    ['products'],
    apiProduct.GET,
    {
      refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
      retry: 0, // 실패시 재호출 몇번 할지
      staleTime: 60 * 1000 * 60,
      onSuccess: (_data) => {
        // 성공시 호출
        console.log(_data);
      },
      onError: (e: Error) => {
        console.log(e.message);
      },
    },
  );
  const deleteMutation = useMutation(apiProduct.DELETE, {
    onSuccess: (_data) => {
      queryClient.invalidateQueries(['products']);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  if (isLoading) {
    return <p>데이터를 불러오는 중입니다...</p>;
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
            <th>작성자</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody className="font-semibold">
          {data.map((product) => {
            return (
              <tr key={product._id} className="text-center">
                <td>{product.postType}</td>
                <td>
                  <a href={`/read/${product.postType}/${product._id}`}>
                    <span className="hover:font-bold hover:text-b-yellow">
                      {product.title}
                    </span>
                  </a>
                </td>
                <td>{product.author.name}</td>
                <td className="w-14">
                  <button
                    className="border-red-400 border-solid border-2 w-12 rounded-lg h-7 leading-7 text-red-400 after:content-['삭제'] shadow-lg hover:bg-red-400 hover:text-white"
                    onClick={() => setOpenModal(!isOpenModal)}
                  ></button>
                </td>
                {isOpenModal && (
                  <ConfirmModal
                    title={`${product.title} 게시글을 삭제하시겠습니까?`}
                    yesColor="red-400"
                    yesText="삭제"
                    onClickToggleModal={onClickToggleModal}
                    onClickYes={() => {
                      deleteMutation.mutate(product._id);
                    }}
                  />
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
