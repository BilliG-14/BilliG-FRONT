import { useState, useRef, ChangeEvent } from 'react';
import api from '../../api/customAxios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserInformationPostType, PostIdType } from 'store/PostReadStore';
import { reservationStore } from 'store/PostWriteStore';

export default function DealDoneModal(props: PostIdType) {
  const queryClient = useQueryClient();

  // 게시글 id prop으로 받아오기
  const { postId, postType, authorId } = props;
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState('');

  // 유저 체크했는지 여부 확인 state
  const [userCheck, setUserCheck] = useState<boolean>(false);

  const { reservationDate, setReservationDate } = reservationStore();

  const emailRef = useRef<HTMLInputElement>(null);
  const startRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLInputElement>(null);

  // 오늘부터 선택 가능
  const today = new Date()
    .toLocaleDateString()
    .replace(/\./g, '')
    .replace(/\s/g, '-');

  // 빌리는/빌려주려는 사람이 전달해준 이메일이 실제 유저 이메일인지 확인
  const userEmailPost = useMutation(
    (userEmail: string | undefined) =>
      api.post('/checkEmail', { email: userEmail }),
    {
      onSuccess: (res) => {
        /* 실제 유저라면(받아오는 데이터에 userId 필드가 있다면)
        유저 아이디, 유저를 체크했다는 state 값 변경
        + 글 작성자 이메일은 입력할 수 없게 함 */
        if (res.data?.userId === authorId) {
          alert(
            '글 작성자의 이메일은 입력할 수 없습니다. \n다시 입력해주세요.',
          );
          return;
        } else if (res.data?.userId) {
          setUserId(res.data?.userId);
          setUserCheck(true);
          alert('유저가 확인되었습니다.');
        } else {
          alert('등록된 유저가 없습니다. 이메일을 다시 확인해주세요.');
        }
      },
    },
  );

  // 유저체크
  function userCheckFn() {
    // 이메일 체크하기
    userEmailPost.mutate(emailRef.current?.value);
  }

  // 대여기간 state
  function setDate(e: ChangeEvent<HTMLInputElement>) {
    setReservationDate(startRef.current?.value, endRef.current?.value);
  }

  // 빌려주기 상황 - 유저 체크 완료되었으면 빌리는 유저의 정보를 서버에 저장(게시물 api에 담습니다)
  const borrowerInformation = {
    borrower: userId,
    stateOfTransaction: 1,
    period: reservationDate,
  };

  const borrowerEdit = useMutation(
    (borrowerinfo: UserInformationPostType) =>
      api.patch(`/product/${postId}`, {
        borrower: borrowerinfo.borrower,
        stateOfTransaction: borrowerinfo.stateOfTransaction,
        period: borrowerinfo.period,
      }),
    {
      onSuccess: (res) => {
        alert('차용유저 등록이 완료되었습니다.');
        queryClient.invalidateQueries(['postData']);
      },
      onError: (error) => {
        alert('유저 확인을 다시 한 번 해주세요.');
      },
    },
  );

  // 빌리려고 하는 유저(차용인) 등록
  function changeBorrowState() {
    if (userCheck) {
      if (!startRef.current?.value || !endRef.current?.value) {
        alert('기간 설정을 정확하게 해주세요.');
        return;
      } else {
        borrowerEdit.mutate(borrowerInformation, {
          onSuccess: (res) => {
            setShowModal(false);
            queryClient.invalidateQueries(['postData']);
            console.log(res);
          },
        });
      }
    } else {
      alert('유저 확인을 해주세요.');
    }
  }

  // 빌리기 상황 - 유저 체크 완료되었으면 빌리는 유저의 정보를 서버에 저장(게시물 api에 담습니다)
  const lenderInformation = {
    lender: userId,
    stateOfTransaction: 1,
    period: reservationDate,
  };

  const lenderEdit = useMutation(
    (lenderinfo: UserInformationPostType) =>
      api.patch(`/product/${postId}`, {
        lender: lenderinfo.lender,
        stateOfTransaction: lenderinfo.stateOfTransaction,
        period: lenderinfo.period,
      }),
    {
      onSuccess: (res) => {
        alert('대여유저 등록이 완료되었습니다.');
        queryClient.invalidateQueries(['postData']);
      },
      onError: (error) => {
        alert('유저 확인을 다시 한 번 해주세요.');
      },
    },
  );

  function changeLendState() {
    if (userCheck) {
      if (!startRef.current?.value || !endRef.current?.value) {
        alert('기간 설정을 정확하게 해주세요.');
        return;
      } else {
        lenderEdit.mutate(lenderInformation, {
          onSuccess: () => {
            setShowModal(false);
            queryClient.invalidateQueries(['postData']);
          },
        });
      }
    } else {
      alert('유저 확인을 해주세요.');
    }
  }

  return (
    <>
      <button
        className="w-1/2 h-[50px] focus:outline-none  bg-green-600 hover:bg-green-800 text-white hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 transition duration-300"
        type="button"
        onClick={() => {
          setShowModal(true);
          setUserId('');
          setUserCheck(false);
        }}
      >
        거래하기
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-center pl-6 pb-2 p-3  border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-xl font-semibold">
                    {postType === 'lend'
                      ? '차용유저 정보 확인'
                      : '대여유저 정보 확인'}
                  </h3>
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
                <div className="relative p-6 text-start text-sm">
                  <p className="mb-2 text-red-500  font-semibold">
                    대여완료 전 꼭 확인해주세요!
                  </p>
                  {postType === 'lend' ? (
                    <p className="mb-6 text-[13px] leading-5 font-semibold text-b-text-black">
                      물품을 빌리려고 하는 유저에게 전달받은 이메일을 입력하여
                      <br />
                      빌리지의 유저인지 유저확인을 꼭 하신 후 대여완료 버튼을
                      눌러주세요!
                    </p>
                  ) : (
                    <p className="mb-6 text-[13px] leading-5 font-semibold text-b-text-black">
                      물품을 대여해주는 유저에게 전달받은 이메일을 입력하여
                      <br />
                      빌리지의 유저인지 유저확인을 꼭 하신 후 대여완료 버튼을
                      눌러주세요!
                    </p>
                  )}

                  <div className="flex gap-3 items-center  text-b-text-black">
                    {/* 이메일 input */}
                    <div className="text-sm">
                      {postType === 'lend'
                        ? '빌리는 유저 이메일'
                        : '대여 유저 이메일'}
                    </div>
                    <input
                      type="text"
                      ref={emailRef}
                      className="h-8 p-2 border-solid border  border-gray-300 rounded-md"
                    />
                    <button
                      onClick={userCheckFn}
                      type="button"
                      className="h-8 text-[13px] py-1.5 px-3 font-bold bg-slate-300 hover:bg-slate-500  hover:text-white rounded transition duration-100"
                    >
                      유저 확인
                    </button>
                  </div>

                  <div className="mt-4 mb-2">빌리는 기간 설정</div>
                  <div className="flex mb-1 gap-3 items-center justify-around text-xs font-semibold">
                    <div>시작날짜</div>
                    <div>종료날짜</div>
                  </div>
                  <div className="flex items-center justify-around text-[13px]">
                    <input
                      type="date"
                      ref={startRef}
                      min={today}
                      max="2099-12-31"
                      onChange={setDate}
                      className="w-44 h-8 p-2 border-solid border  border-gray-300 rounded-md"
                    />
                    <input
                      type="date"
                      ref={endRef}
                      min={today}
                      max="2099-12-31"
                      onChange={setDate}
                      className="w-44 h-8 p-2 border-solid border  border-gray-300 rounded-md"
                    />
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
                    onClick={
                      postType === 'lend' ? changeBorrowState : changeLendState
                    }
                  >
                    {postType === 'lend' ? '빌려주기 완료' : '빌리기 완료'}
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
