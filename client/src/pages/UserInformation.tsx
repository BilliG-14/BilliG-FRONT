import { useMutation, useQuery } from '@tanstack/react-query';
import api from 'api/customAxios';
import { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import { RiAlarmWarningFill, RiCloseFill } from 'react-icons/ri';
import { useState, useRef, useCallback } from 'react';
import ConfirmModal from 'components/Modal';
import Loading from 'components/Loading';

type User = {
  _id: string;
  name: string;
  image: string;
  nickName: string;
  email: string;
  password: string;
  phoneNumber: string;
  postalCode: string;
  address1: string;
  address2: string;
  reports: Array<any>;
  suspension: boolean;
  intro: string;
};

/*User CRUD */
const apiUser = {
  GET: (id: string | undefined) => {
    return async () => {
      const { data } = await api.get(`user/${id}`);
      return data;
    };
  },
};
/*Report CRUD */
const apiReport = {
  CREATE: async (newReport: NewReport) => {
    const { data } = await api.post(`/report`, newReport);
    return data;
  },
};
type NewReport = {
  details: string | undefined;
  target: string;
};

export default function UserInformation() {
  // url id 받기
  const [openReport, setOpenReport] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
    setOpenReport(false);
  }, [isOpenModal]);
  /*get category */
  const { id } = useParams();
  console.log(id);
  const { isLoading, data, isError } = useQuery<User, AxiosError>(
    [`user`, id],
    apiUser.GET(id),
    {
      retry: 0, // 실패시 재호출 몇번 할지
      staleTime: 60 * 1000 * 60,
    },
  );
  const createMutation = useMutation(apiReport.CREATE);
  if (isLoading) return <Loading />;
  if (isError) return <div>회원정보를 불러올 수 없습니다.</div>;
  return (
    <>
      <div className="h-full w-screen max-w-screen-lg m-auto flex flex-col items-center">
        <div className="img_nick_intro flex mb-4 mt-8">
          <div className="mx-auto">
            <img
              src={
                data.image
                  ? data.image
                  : `${process.env.PUBLIC_URL}/img/default_user.png`
              }
              alt="사용자 이미지"
              className="rounded-full h-48 w-48 object-cover mb-5"
            />
          </div>
        </div>
        <div className="w-full mx-auto flex justify-center">
          <span className="font-extrabold text-3xl">{data.nickName}</span>
          <button
            className="text-xl text-red-500 hover:text-2xl"
            onClick={() => {
              setOpenReport(true);
            }}
          >
            <RiAlarmWarningFill className="" />
          </button>
        </div>
        <p className="mt-8 border-b-yellow border-solid border-2 rounded-lg w-3/5 h-96 p-10 font-bold">
          {data.intro ? data.intro : '아직 자기소개를 작성하지 않았습니다.'}
        </p>
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
                <span className="text-b-yellow mr-1">{data.nickName}</span>
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
                    title={`${data.nickName}님을 정말 신고합니까?`}
                    content={`허위 신고의 경우 서비스 이용이 제한 될 수 있습니다.`}
                    yesColor="red-400"
                    yesText="신고"
                    onClickYes={() => {
                      createMutation.mutate({
                        target: data._id,
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
    </>
  );
}
