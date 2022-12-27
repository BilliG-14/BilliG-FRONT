import {
  useMyinfoEditStore,
  usePasswordEditStore,
  useDeleteUserStore,
} from '../../store/MypageStore';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import api from '../../api/customAxios';
// components
import ChangePassword from './ChangePassword';
import ChangePawsswordForm from './ChangePawsswordForm';
import DeleteUser from './DeleteUser';
import DeleteUserForm from './DeleteUserForm';
import Loading from '../Loading';

export default function MyinfoPage() {
  const { toggleIntro } = useMyinfoEditStore();
  const { isPW } = usePasswordEditStore();
  const { isDeleteUser } = useDeleteUserStore();
  const { togglePwfalse } = usePasswordEditStore();
  const navigate = useNavigate();
  const {
    isLoading,
    isError,
    data: userInfo,
  } = useQuery(
    ['userInfo'],
    async () => {
      return api.get(`/user/${localStorage.getItem('userId')}`);
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000 * 5,
    },
  );

  if (isLoading) return <Loading />;

  const {
    name,
    email,
    image,
    intro,
    nickName,
    phoneNumber,
    address1,
    address2,
    reports,
  } = userInfo?.data;
  return (
    <div className="w-4/5 p-12">
      <section className="img_nick_intro flex mb-4">
        <div className="flex flex-col w-40">
          <img
            src={
              image ? image : `${process.env.PUBLIC_URL}/img/default_user.png`
            }
            alt="조이현"
            className="rounded-full h-32 w-32 object-cover mb-5"
          />
        </div>
        <div className="nick_intro pl-7 w-full">
          <div>
            <h2 className="nick text-3xl font-extrabold">{nickName}</h2>
            <p className="intro my-4 font-medium">
              {intro ? intro : '소개글을 작성해보세요.'}
            </p>
          </div>
        </div>
      </section>
      <section className="user_info">
        <div className="user_name flex items-center h-18 py-4 border-b border-solid border-gray-200">
          <div className="w-40 text-lg leading-normal font-bold">
            <h3>이름</h3>
          </div>
          <div className="w-full flex items-center justify-start text-base leading-normal">
            {name}
          </div>
        </div>
        <div className="user_email flex items-center h-18 py-4 border-b border-solid border-gray-200">
          <div className="w-40 text-lg leading-normal font-bold">
            <h3>이메일 주소</h3>
          </div>
          <div className="w-full flex items-center justify-start text-base leading-normal">
            {email}
          </div>
        </div>
        <div className="user_phone flex items-center h-18 py-4 border-b border-solid border-gray-200">
          <div className="w-40 text-lg leading-normal font-bold">
            <h3>핸드폰 번호</h3>
          </div>
          <div className="w-full flex items-center justify-start text-base leading-normal">
            {phoneNumber}
          </div>
        </div>
        <div className="user_address flex items-center h-18 py-4 border-b border-solid border-gray-200">
          <div className="w-40 text-lg leading-normal font-bold">
            <h3>주소</h3>
          </div>
          <div className="w-full flex items-center justify-start text-base leading-normal">
            {`${address1} ${address2}`}
          </div>
        </div>
        <div className="user_penalty flex items-center h-18 py-4 border-b border-solid border-gray-200">
          <div className="w-40 text-lg leading-normal font-bold">
            <h3>제재횟수</h3>
          </div>
          <div className="w-full flex items-center justify-start text-base leading-normal">
            {`${reports.length} 회`}
          </div>
        </div>
      </section>
      {isPW ? <ChangePawsswordForm /> : <ChangePassword />}
      {isDeleteUser ? <DeleteUserForm /> : <DeleteUser />}
      <div className="edit_btn flex justify-center mt-8">
        <button
          className="w-2/6 h-12 hover:text-white border border-b-yellow hover:bg-b-yellow focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={() => {
            toggleIntro();
            togglePwfalse();
            navigate('/mypage/edit');
          }}
        >
          수정하기
        </button>
      </div>
    </div>
  );
}
