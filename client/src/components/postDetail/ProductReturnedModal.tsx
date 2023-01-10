import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from './../../api/customAxios';
import { PostIdType } from 'types/productType';
import PostModal from './PostModal';

export function ProductReturnedModal(props: PostIdType) {
  const queryClient = useQueryClient();

  // 반납완료->거래종료 상태 변경 함수
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
        alert('반납완료처리 되었습니다.');
        queryClient.invalidateQueries(['postData']);
      },
      onError: (error) => {
        alert(`반납완료 처리 중 오류가 발생했습니다. \n에러내용: ${error}`);
      },
    },
  );

  function changeState() {
    stateUpdate.mutate(3);
    setShowModal(false);
  }

  return (
    <>
      <button
        type="button"
        className="w-1/2 h-[50px] focus:outline-none  bg-rose-500 hover:bg-rose-600 disabled:bg-gray-300 text-white  disabled:text-gray-400 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 transition duration-300"
        onClick={() =>
          stateNumber === 2
            ? setShowModal(true)
            : alert(
                '수령완료 상태가 아닙니다. \n차용인이 수령완료 버튼을 클릭해야 반납완료 버튼을 누를 수 있습니다.',
              )
        }
        disabled={stateNumber === 3 ? true : false}
      >
        {stateNumber === 3 ? '거래종료' : '반납완료'}
      </button>
      {showModal ? (
        <PostModal
          setShowModal={setShowModal}
          changeState={changeState}
          type="return"
          title="물품 반납 확인"
          descriptionOne="대여해주신 물품을 돌려받으셨나요?"
          descriptionTwo="대여해주신 물품을 받으시고, 물품이 파손되거나 구성품이 분실되진 않았는지 확인해주세요."
          descriptionThree="확인이 되셨다면 아래의 [반납완료] 버튼을 눌러주세요!"
          cautionDescription="주의! [수령완료]버튼을 누르면 거래상태를 변경할 수 없습니다."
        />
      ) : null}
    </>
  );
}
