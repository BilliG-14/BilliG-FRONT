import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import { RiAlarmWarningFill, RiCloseFill } from 'react-icons/ri';
import { useState, useRef, useCallback } from 'react';
import ConfirmModal from 'components/Modal';
import Loading from 'components/Loading';
import Footer from 'components/footer/Footer';
import { UserType } from 'types/userType';
import { getUserById } from '../api/user-api';
import { apiReports } from 'api/report-api';
import RecentPosts from 'components/userInfo/RecentPosts';

export default function UserInformation() {
  // url id 받기
  const queryClient = useQueryClient();
  const [openReport, setOpenReport] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
    setOpenReport(false);
  }, [isOpenModal]);
  /*get category */
  const { id } = useParams();
  const {
    isLoading,
    data: user,
    isError,
  } = useQuery<UserType, AxiosError>(['userInfo', id], getUserById(id), {
    retry: 0, // 실패시 재호출 몇번 할지
    staleTime: 60 * 1000 * 60,
  });
  /*신고 */
  const createMutation = useMutation(apiReports.CREATE, {
    onSuccess: () => {
      queryClient.invalidateQueries(['reports']);
    },
  });
  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="w-full text-center text-2xl pt-60">
        회원정보를 불러올 수 없습니다.
      </div>
    );
  return (
    <div className="w-screen relative pb-[70px] min-h-[76vh]">
      <div className="max-w-screen-lg mx-auto">
        <div
          id-="img_nick_intro"
          className="mb-4 mt-8 p-1 w-[790px] mx-auto border-gray-200 border-solid border rounded-lg"
        >
          <div className="flex items-center">
            <img
              src={
                user.image
                  ? user.image
                  : `${process.env.PUBLIC_URL}/img/default_user.png`
              }
              alt="사용자 이미지"
              className="rounded-full h-28 w-28 object-cover m-2"
            />
            <div className="flex flex-col ml-4 ">
              <div className="mb-1">
                <span className="font-bold text-xl">{user.nickName}</span>
                <button
                  className="text-xl text-red-500 hover:text-2xl"
                  onClick={() => {
                    setOpenReport(true);
                  }}
                >
                  <RiAlarmWarningFill className="" />
                </button>
              </div>
              <p className=" text-sm text-gray-500">
                신고 당한 횟수 : {user.reports.length}
              </p>
            </div>
          </div>
          <p className="px-4 py-2 text-b-text-black text-base">
            {user.intro ? user.intro : '아직 자기소개를 작성하지 않았습니다.'}
          </p>
        </div>
        <div id="post" className="w-[800px] mx-auto">
          <p className="ml-2 font-bold text-lg">{user.nickName}님의 게시물</p>
          <RecentPosts userId={user._id} />
        </div>
        {openReport && (
          <div className="fixed w-screen h-screen left-0 top-0 flex justify-center items-center">
            <div className="bg-white w-1/3 h-[400px] z-20 rounded-2xl p-8 relative">
              <button
                className="absolute right-6 text-2xl text-gray-500"
                onClick={() => {
                  setOpenReport(false);
                }}
              >
                <RiCloseFill />
              </button>
              <div className="w-full text-2xl font-extrabold">
                <span className="text-b-yellow mr-1">{user.nickName}</span>
                <span>님 신고하기</span>
              </div>
              <div className="w-full mt-7 text-xl font-extrabold">
                <span className="text-red-500">신고 사유</span>를 적어주세요
              </div>
              <div className="w-full mt-2">
                <textarea
                  ref={textAreaRef}
                  className="w-full h-[200px] border-2 p-4 font-bold border-b-yellow rounded-xl focus:outline-none"
                ></textarea>
              </div>
              <div className="flex justify-end p-2">
                <button
                  className=" bg-red-500 text-white p-2 rounded-md text-base font-bold hover:bg-gradient-to-r from-red-600"
                  onClick={() => {
                    setOpenModal(!isOpenModal);
                  }}
                >
                  신고하기
                </button>
                {isOpenModal && (
                  <ConfirmModal
                    title={`${user.nickName}님을 정말 신고합니까?`}
                    content={`허위 신고의 경우 서비스 이용이 제한 될 수 있습니다.`}
                    yesColor="red-400"
                    yesText="신고"
                    onClickYes={() => {
                      createMutation.mutate({
                        target: user._id,
                        details: textAreaRef.current?.value,
                      });
                      alert('신고가 접수되었습니다.');
                    }}
                    onClickToggleModal={onClickToggleModal}
                  />
                )}
              </div>
            </div>
            <div
              className="bg-black opacity-40 fixed w-screen h-screen"
              onClick={() => {
                setOpenReport(false);
              }}
            ></div>
          </div>
        )}
      </div>
      <div className="w-full h-[70px] absolute bottom-0 flex flex-col justify-end">
        <Footer />
      </div>
    </div>
  );
}
