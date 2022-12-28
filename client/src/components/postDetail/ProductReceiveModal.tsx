import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from './../../api/customAxios';
import { PostIdType } from 'store/PostReadStore';

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
        alert(`수령완료 처리 중 오류가 발생했습니다. ${error}`);
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
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-center pl-6 pb-2 p-3  border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-xl font-semibold">물품 수령 확인</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>

                {/*body*/}
                <div className="relative p-6 text-start">
                  <p className="mb-4 text-[13px] leading-5 font-semibold text-b-text-black">
                    대여물품을 수령하셨나요? <br />
                    반드시 대여물품을 수령하신 후에 아래의 [수령완료] 버튼을
                    눌러주세요!
                  </p>
                  <p className="mb-2 text-sm text-red-500  font-semibold">
                    주의! [수령완료]버튼을 누르면 거래상태를 변경할 수 없습니다.
                  </p>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-5 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    창 닫기
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold text-sm px-6 py-2 rounded shadow hover:bg-emerald-700 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={changeState}
                  >
                    수령완료
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
