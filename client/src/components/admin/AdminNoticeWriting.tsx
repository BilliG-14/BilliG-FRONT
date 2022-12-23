import { useMutation, useQueryClient } from '@tanstack/react-query';
import ConfirmModal from 'components/Modal';
import { useRef, useState } from 'react';
import { apiReports } from './AdminNoticeSection';

export default function AdminNoticeWriting() {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const handleClick = () => {
    if (!titleRef.current?.value) {
      alert('제목을 입력해주세요');
      return;
    }
    if (!contentRef.current?.value) {
      alert('내용을 입력해주세요');
      return;
    }
    createMutation.mutate({
      title: titleRef.current.value,
      content: contentRef.current.value,
    });
    setOpenModal(!isOpenModal);
    titleRef.current.value = '';
    contentRef.current.value = '';
  };
  const createMutation = useMutation(apiReports.CREATE, {
    onSuccess: () => {
      // post요청 성공 시 category 맵핑된 useQuery api 함수를 실행
      queryClient.invalidateQueries(['notices']);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return (
    <div className="w-full">
      <form className="mt-6 flex flex-col w-3/4 mx-auto font-bold">
        <div>
          <label htmlFor="title" className="text-lg">
            제목
          </label>
          <input
            className="w-full h-10 border-solid border-2 rounded-lg px-4
        focus:outline-none focus:border-4"
            id="title"
            ref={titleRef}
            type="text"
            placeholder="제목을 입력해주세요"
          ></input>
        </div>
        <div className="my-3">
          <label htmlFor="content" className="font-bold text-lg text-left">
            내용
          </label>
          <textarea
            id="content"
            ref={contentRef}
            className="block w-full h-56 border-solid border-2 rounded-lg  p-4
        focus:outline-none focus:border-4"
            placeholder="내용을 입력해주세요"
          ></textarea>
        </div>
        <button
          className="w-1/6 h-10 hover:text-white border border-b-yellow hover:bg-b-yellow focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm mx-auto"
          onClick={(e) => {
            e.preventDefault();
            handleClick();
          }}
        >
          등록하기
        </button>
        {isOpenModal && (
          <ConfirmModal
            title={`공지가 등록되었습니다.`}
            onClickToggleModal={() => {
              setOpenModal(!isOpenModal);
            }}
          />
        )}
      </form>
    </div>
  );
}
