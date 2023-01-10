import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from './../../api/customAxios';
import { PostIdType } from 'types/productType';
import PostModal from './PostModal';

export function ProductReceiveButton(props: PostIdType) {
  const queryClient = useQueryClient();

  // 거래완료->수령완료 상태 변경 함수
  // 게시글 id prop으로 받아오기
  const { postId, stateNumber } = props;
  const [showModal, setShowModal] = useState(false);

  const stateUpdate = useMutation(
    (state: number) =>
      api.patch(`/product/${postId}`, {
        stateOfTransaction: state,
      }),
    {
      onSuccess: (res) => {
        alert('수령완료처리 되었습니다.');
        queryClient.invalidateQueries(['postData']);
      },
      onError: (error) => {
        alert(`수령완료 처리 중 오류가 발생했습니다. \n에러내용: ${error}`);
      },
    },
  );

  function changeState() {
    stateUpdate.mutate(2);
    setShowModal(false);
  }

  return (
    <>
      <button
        type="button"
        className="w-1/2 h-[50px] focus:outline-none  bg-green-600 hover:bg-green-800 disabled:bg-gray-300 text-white  disabled:text-gray-400 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 transition duration-300"
        onClick={() => setShowModal(true)}
        // stateNumber가 2보다 크다면 수령완료 disable
        disabled={stateNumber >= 2 ? true : false}
      >
        {stateNumber === 3 ? '거래종료' : '수령완료'}
      </button>
      {showModal ? (
        <PostModal
          setShowModal={setShowModal}
          changeState={changeState}
          type="receive"
          title="물품 수령 확인"
          descriptionOne="대여물품을 수령하셨나요?"
          descriptionTwo="반드시 대여물품을 수령하신 후에 아래의 [수령완료] 버튼을
                눌러주세요!"
          cautionDescription="주의! [수령완료]버튼을 누르면 거래상태를 변경할 수 없습니다."
        />
      ) : null}
    </>
  );
}
