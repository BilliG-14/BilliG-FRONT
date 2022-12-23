import Postcode from 'components/PostCode';
import { useRef, useState, useEffect } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import api from '../../api/customAxios';
import { useNavigate } from 'react-router-dom';

export default function EditMyinfoPage() {
  // * image state
  const [imgSrc, setImgSrc] = useState(
    `${process.env.PUBLIC_URL}/img/default_user.png`,
  );
  const [imagePath, setImagePath] = useState('');

  type UpdateInfo = {
    nickName: string | undefined;
    intro: string | undefined;
    image: string | undefined;
    phoneNumber: string | undefined;
    address1: string | undefined;
    address2: string | undefined;
  };

  // * Ref
  const imgRef = useRef<HTMLInputElement | null>(null);
  const nicknameRef = useRef<HTMLInputElement | null>(null);
  const introRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const address1Ref = useRef<HTMLInputElement | null>(null);
  const address2Ref = useRef<HTMLInputElement | null>(null);
  const img1Ref = useRef<HTMLImageElement | null>(null);
  const img2Ref = useRef<HTMLImageElement | null>(null);
  const navigate = useNavigate();

  // * useQuery
  const { isLoading, data: userInfo } = useQuery(
    ['userInfo'],
    async () => {
      return api.get(`/user/${localStorage.getItem('userId')}`);
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000 * 5,
      onSuccess: (data) => {
        console.log(data);
      },
    },
  );
  // * useMutation
  const client = useQueryClient();
  const updateUserInfoMutation = useMutation(
    ['userInfo'],
    async (updateData: UpdateInfo) => {
      await api.patch(`user`, updateData);
    },
    {
      onSuccess: () => {
        console.log('성공???');
        client.invalidateQueries(['userInfo']);
      },
    },
  );
  // img 미리보기
  const onUploadImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImgSrc(URL.createObjectURL(e.target.files[0]));
    img1Ref.current?.classList.add('hidden');
    img2Ref.current?.classList.remove('hidden');

    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    const imageUrl = await api.patch('user/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    setImagePath(imageUrl.data.image);
  };

  //  img 제거
  const onDeleteImg = () => {
    URL.revokeObjectURL(imgSrc);
    setImgSrc(`${process.env.PUBLIC_URL}/img/default_user.png`);
  };

  const onUploadImgBtnClick = () => {
    if (!imgRef.current) {
      return;
    }
    imgRef.current?.click();
  };

  if (isLoading) return <p>Loading...</p>;
  const {
    name,
    email,
    image,
    intro,
    nickName,
    phoneNumber,
    address1,
    address2,
  } = userInfo?.data;

  return (
    <div className="w-4/5 p-12">
      <section className="img_nick_intro flex mb-4">
        <div className="flex flex-col w-32">
          <img
            src={image ? image : imgSrc}
            alt={name}
            ref={img1Ref}
            className="rounded-full h-32 w-32 object-cover mb-5"
          />
          <img
            src={imgSrc}
            alt={name}
            ref={img2Ref}
            className="rounded-full h-32 w-32 object-cover mb-5 hidden"
          />
          <input
            id="profileImg"
            type="file"
            accept="image/*"
            ref={imgRef}
            onChange={onUploadImg}
            className="hidden"
          />
          <button
            className="bg-b-yellow hover:opacity-80 text-white rounded-md font-bold w-32 h-8"
            onClick={onUploadImgBtnClick}
          >
            이미지 업로드
          </button>
          <button
            className="text-b-yellow hover:bg-b-bg-gray rounded-md font-bold w-32 h-8 mt-2"
            onClick={onDeleteImg}
          >
            이미지 제거
          </button>
        </div>
        <div className="nick_intro pl-7 w-full">
          <form action="submit" className="flex flex-col">
            <input
              type="text"
              placeholder="닉네임"
              name="nickName"
              ref={nicknameRef}
              defaultValue={nickName}
              className="w-3/5 text-2xl font-medium border border-solid border-gray-300 py-2 px-2 mb-2 rounded-lg focus:border-b-yellow focus:outline-none"
            />
            <input
              type="text"
              placeholder="소개글을 적어보세요."
              name="intro"
              ref={introRef}
              defaultValue={intro}
              className="w-3/5 font-medium border border-solid border-gray-300 py-2 px-2 rounded-lg focus:border-b-yellow focus:outline-none"
            />
          </form>
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
          <form
            action="submit"
            className="w-full flex items-center justify-start text-base leading-normal"
          >
            <input
              type="text"
              placeholder="연락처를 입력하세요. ex) 010-1234-5678"
              name="phoneNumber"
              ref={phoneRef}
              defaultValue={phoneNumber}
              className="w-3/5 font-medium border border-solid border-gray-300 py-2 px-2 rounded-lg focus:border-b-yellow focus:outline-none"
            />
          </form>
        </div>
        <div className="user_address flex items-center h-18 py-4 border-b border-solid border-gray-200">
          <div className="w-40 text-lg leading-normal font-bold">
            <h3>주소</h3>
          </div>
          <form
            action="submit"
            className="w-full flex flex-col justify-start text-base leading-normal"
          >
            <Postcode address1Ref={address1Ref} address1={address1} />
            <input
              type="text"
              placeholder="상세주소"
              name="address2"
              ref={address2Ref}
              defaultValue={address2}
              className="w-3/5 font-medium border border-solid border-gray-300 py-2 px-2 rounded-lg focus:border-b-yellow focus:outline-none mt-1"
            />
          </form>
        </div>
      </section>
      <div className="edit_btn flex justify-center mt-8">
        <button
          className="w-2/6 h-12 hover:text-white border border-b-yellow hover:bg-b-yellow focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={() => {
            const updateData: UpdateInfo = {
              nickName: nicknameRef.current?.value,
              intro: introRef.current?.value,
              image: imagePath || image,
              phoneNumber: phoneRef.current?.value,
              address1: address1Ref.current?.value,
              address2: address2Ref.current?.value,
            };

            updateUserInfoMutation.mutate(updateData);
            alert('회원 정보가 변경되었습니다.');
            navigate('/mypage');
            img1Ref.current?.classList.remove('hidden');
            img2Ref.current?.classList.add('hidden');
          }}
        >
          저장하기
        </button>
      </div>
    </div>
  );
}
