import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from 'api/customAxios';
import { AxiosError } from 'axios';
import Loading from 'components/Loading';
import ConfirmModal from 'components/Modal';
import { useCallback, useRef, useState } from 'react';

type Category = {
  _id: string;
  name: string;
};

/*Category CRUD */
const endPoint = 'category';
const apiCategory = {
  GET: async () => {
    const { data } = await api.get(`${endPoint}`);
    return data;
  },
  CREATE: async (catogoryName: string) => {
    const { data } = await api.post(`/${endPoint}`, { name: catogoryName });
    return data;
  },
  UPDATE: async ({ _id, name }: Category) => {
    await api.patch(`${endPoint}/${_id}`, { name: name });
  },
  DELETE: async (_id: string) => {
    await api.delete(`${endPoint}/${_id}`);
  },
};

export default function AdminCategorySection() {
  const queryClient = useQueryClient();
  const selectedCategory = useRef<Category>({ _id: '', name: '' });
  const selectedDiv = useRef<HTMLDivElement>(null);
  const elemCreateInput = useRef<HTMLInputElement>(null);
  const elemUpdateInput = useRef<HTMLInputElement>(null);
  //카테고리 삭제 모달 관련 state
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);
  /*get category */
  const { isLoading, data, isError } = useQuery<Category[], AxiosError>(
    ['categories'],
    apiCategory.GET,
    {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000 * 60,
    },
  );
  const createMutation = useMutation(apiCategory.CREATE, {
    onSuccess: () => {
      queryClient.invalidateQueries(['categories']);
    },
  });
  const updateMutation = useMutation(apiCategory.UPDATE, {
    onSuccess: (_data) => {
      queryClient.invalidateQueries(['categories']);
    },
  });
  const deleteMutation = useMutation(apiCategory.DELETE, {
    onSuccess: (_data) => {
      queryClient.invalidateQueries(['categories']);
    },
  });
  /*버튼 클릭 시 실행할 함수 */
  const handleCreate = useCallback(
    (newCategoryName: string) => {
      try {
        createMutation.mutate(newCategoryName);
        alert(`${newCategoryName} 생성되었습니다.`);
      } catch (error) {
        alert('카테고리 생성에 실패하였습니다.');
      }
    },
    [createMutation],
  );
  const handleDelete = useCallback(
    (categoryId: string) => {
      deleteMutation.mutate(categoryId);
    },
    [deleteMutation],
  );
  const handleUpdate = useCallback(
    (categoryId: string, newCategoryName: string) => {
      updateMutation.mutate({ _id: categoryId, name: newCategoryName });
    },
    [updateMutation],
  );
  if (isLoading) return <Loading />;
  return (
    <section className="w-full text-b-text-black p-2">
      <div className="w-2/3 mx-auto mt-12">
        <div>
          <input
            className="w-4/5 h-10 border-solid border-2 rounded-lg px-4
        focus:outline-none focus:border-4 mr-2"
            placeholder="새 카테고리 이름을 입력해주세요"
            ref={elemCreateInput}
          />
          <button
            className="w-1/6 h-10 hover:text-white border-2 text-b-text-black border-b-yellow hover:bg-b-yellow focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm"
            onClick={() => {
              const newCategoryName = elemCreateInput.current?.value;
              if (!newCategoryName) {
                alert('카테고리 이름을 입력해주세요');
                return;
              }
              handleCreate(newCategoryName);
              elemCreateInput.current.value = '';
            }}
          >
            등록하기
          </button>
        </div>
        <div className="flex mt-8">
          <div className="w-1/2 pl-4 text-lg font-bold ">
            {isError ? (
              <p>카테고리를 불러오지 못했습니다</p>
            ) : (
              <ul>
                {data?.map((category) => {
                  return (
                    <li key={category._id} className="hover:text-b-yellow mb-1">
                      <a
                        href="#!"
                        onClick={() => {
                          selectedCategory.current = {
                            _id: category._id,
                            name: category.name,
                          };
                          if (selectedDiv.current) {
                            selectedDiv.current.style.display = 'block';
                          }
                          if (elemUpdateInput.current) {
                            elemUpdateInput.current.defaultValue =
                              selectedCategory.current.name;
                          }
                        }}
                      >
                        {category.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          <div
            className="w-1/2 pl-4 text-lg font-bold hidden"
            ref={selectedDiv}
          >
            <input
              className="w-full h-10 border-solid border-2 rounded-lg px-4
        focus:outline-none focus:border-4 mt-8"
              ref={elemUpdateInput}
            />
            <button
              className="w-full mt-4 h-8 rounded-lg bg-green-500 text-white transition-colors hover:bg-gradient-to-r from-lime-800 to-green-400"
              onClick={() => {
                if (elemUpdateInput.current) {
                  handleUpdate(
                    selectedCategory.current._id,
                    elemUpdateInput.current.value,
                  );
                  alert('수정되었습니다.');
                }
              }}
            >
              수정하기
            </button>
            <button
              className="w-full mt-4 h-8 rounded-lg bg-red-400 text-white hover:bg-gradient-to-r from-rose-700 to-red-300
            "
              onClick={() => {
                setOpenModal(!isOpenModal);
              }}
            >
              삭제하기
            </button>
          </div>
        </div>
      </div>
      {isOpenModal && (
        <ConfirmModal
          title="정말 삭제하시겠습니까?"
          content="한번 삭제한 카테고리는 되돌릴 수 없습니다"
          yesColor="red-400"
          yesText="삭제"
          onClickToggleModal={onClickToggleModal}
          onClickYes={() => {
            if (selectedDiv.current) {
              selectedDiv.current.style.display = 'none';
            }
            try {
              handleDelete(selectedCategory.current._id);
            } catch (error) {
              alert('카테고리 삭제에 실패하였습니다.');
            }
          }}
        />
      )}
    </section>
  );
}
