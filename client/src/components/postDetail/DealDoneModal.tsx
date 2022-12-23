import { useState, useRef } from 'react';
import api from '../../api/customAxios';
import { useMutation } from '@tanstack/react-query';
import { LenderInformationType, PostIdType } from 'store/PostReadStore';

export default function DealDoneModal(props: PostIdType) {
  // 게시글 id prop으로 받아오기
  const { id } = props;
  const emailRef = useRef<HTMLInputElement>(null);

  const [showModal, setShowModal] = useState(false);

  const [userId, setUserId] = useState('');
  // 유저 체크했는지 여부 확인 state
  const [userCheck, setUserCheck] = useState<boolean>(false);

  // 빌리는 사람이 전달해준 이메일이 실제 유저 이메일인지 확인
  const userEmailPost = useMutation(
    (userEmail: string | undefined) =>
      api.post('/checkEmail', { email: userEmail }),
    {
      onSuccess: (res) => {
        /* 실제 유저라면(받아오는 데이터에 userId 필드가 있다면
        유저 아이디, 유저를 체크했다는 state 값 변경 */
        if (res.data.userId) {
          setUserId(res.data.userId);
          setUserCheck(true);
          alert('유저가 확인되었습니다.');
        } else {
          alert('등록된 유저가 없습니다. 이메일을 다시 확인해주세요.');
        }
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  // 유저체크
  function userCheckFn() {
    // 이메일 체크하기
    userEmailPost.mutate(emailRef.current?.value);
  }

  const lenderInformation = {
    lender: userId,
    stateOfTransaction: 1,
  };

  // 유저 체크 완료되었으면 빌리는 유저의 정보를 서버에 저장(게시물 api에 담습니다)
  const lenderEdit = useMutation(
    (lenderinfo: LenderInformationType) =>
      api.patch(`/product/${id}`, {
        lender: lenderinfo.lender,
        stateOfTransaction: lenderinfo.stateOfTransaction,
      }),
    {
      onSuccess: (res) => {
        alert('대여자 등록이 완료되었습니다.');
      },
      onError: (error) => {
        alert('유저 확인을 다시 한 번 해주세요.');
      },
    },
  );

  function changeLenderState() {
    if (userCheck) {
      lenderEdit.mutate(lenderInformation);
      setShowModal(false);
    } else {
      alert('유저 확인을 해주세요.');
    }
  }

  return (
    <>
      <button
        // className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        className="w-1/2 h-[50px] focus:outline-none bg-rose-400 hover:bg-rose-500 text-white hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 transition duration-300"
        type="button"
        onClick={() => setShowModal(true)}
      >
        거래완료
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-center pl-6 pb-2 p-3  border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-xl font-semibold">대여자 정보 확인</h3>
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
                  <p className="mb-2 text-red-500  font-semibold">
                    대여완료 전 꼭 확인해주세요!
                  </p>
                  <p className="mb-6 text-[13px] leading-5 font-thin text-b-text-black">
                    대여자에게 전달받은 이메일을 입력하여 <br />
                    빌리지의 유저인지 유저확인을 꼭 하신 후 대여완료 버튼을
                    눌러주세요!
                  </p>
                  <div className="flex gap-3 items-center">
                    {/* 이메일 input */}
                    <div className="text-sm">대여자 이메일</div>
                    <input
                      type="text"
                      ref={emailRef}
                      className="h-8 p-2 text-sm border-solid border  border-gray-300 rounded-md"
                    />
                    <button
                      onClick={userCheckFn}
                      type="button"
                      className="h-8 text-[13px] py-1.5 px-3 font-bold bg-slate-300 hover:bg-slate-500  hover:text-white rounded transition duration-100"
                    >
                      유저 확인
                    </button>
                  </div>
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
                    onClick={changeLenderState}
                  >
                    대여완료
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
