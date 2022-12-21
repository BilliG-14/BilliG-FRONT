import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import ConfirmModal from 'components/Modal';
import { useCallback, useRef, useState } from 'react';

type Category = {
  _id: string;
  name: string;
};

/*Category CRUD */
const apiCategory = {
  GET: async () => {
    const { data } = await axios.get(
      'https://port-0-village-dpuqy925lbn63gyo.gksl2.cloudtype.app/category',
    );
    return data;
  },
  CREATE: async (catogoryName: string) => {
    await axios.post(
      'https://port-0-village-dpuqy925lbn63gyo.gksl2.cloudtype.app/category',
      JSON.stringify({ name: catogoryName }),
      {
        headers: { 'Content-Type': `application/json` },
      },
    );
  },
  UPDATE: async ({ _id, name }: Category) => {
    await axios.patch(
      `https://port-0-village-dpuqy925lbn63gyo.gksl2.cloudtype.app/category/${_id}`,
      JSON.stringify({ name: name }),
      {
        headers: { 'Content-Type': `application/json` },
      },
    );
  },
  DELETE: async (_id: string) => {
    await axios.delete(
      `https://port-0-village-dpuqy925lbn63gyo.gksl2.cloudtype.app/category/${_id}`,
    );
  },
};

export default function AdminCategorySection() {
  const queryClient = useQueryClient();
  const selectedCategory = useRef<Category>({ _id: '', name: '' });
  const selectedDiv = useRef<HTMLDivElement>(null);
  const elemCreateInput = useRef<HTMLInputElement>(null);
  const elemUpdateInput = useRef<HTMLInputElement>(null);
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);
  /*get category */
  const { isLoading, data, isError } = useQuery<Category[], AxiosError>(
    ['categories'],
    apiCategory.GET,
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
  const createMutation = useMutation(apiCategory.CREATE, {
    onSuccess: () => {
      // post요청 성공 시 category 맵핑된 useQuery api 함수를 실행
      queryClient.invalidateQueries(['categories']);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const updateMutation = useMutation(apiCategory.UPDATE, {
    onSuccess: (_data) => {
      console.log(_data);
      queryClient.invalidateQueries(['categories']);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const deleteMutation = useMutation(apiCategory.DELETE, {
    onSuccess: (_data) => {
      queryClient.invalidateQueries(['categories']);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  /*버튼 클릭 시 실행할 함수 */
  const handleCreate = useCallback(
    (newCategoryName: string) => {
      createMutation.mutate(newCategoryName);
      alert(`${newCategoryName} 생성되었습니다.`);
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
            {isLoading ? (
              <p>Loading...</p>
            ) : isError ? (
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
                          console.log(selectedCategory.current);
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
            handleDelete(selectedCategory.current._id);
          }}
        />
      )}
    </section>
  );
}
