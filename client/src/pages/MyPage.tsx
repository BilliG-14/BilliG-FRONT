import MyInfoHeader from 'components/myinfo/MyInfoHeader';
import Nav from '../components/nav/Nav';
import MyInfoSideBar from '../components/myinfo/MyinfoSideBar';
import { useRef } from 'react';
import MypageNickIntro from 'components/myinfo/MypageNickIntro';
import { useMyIntroEditStore } from '../store/MypageStore';
import EditMypageNickIntro from 'components/myinfo/EditMypageNickIntro';

export default function MyPage() {
  const { toggleIntro } = useMyIntroEditStore();

  const imgInputRef = useRef<HTMLInputElement | null>(null);

  const onUploadImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const formData = new FormData();
    formData.append('imgFile', e.target.files[0]);
  };
  const onUploadImgBtnClick = () => {
    imgInputRef.current?.click();
  };

  return (
    <div className="h-full w-screen max-w-screen-lg m-auto">
      <Nav />
      <MyInfoHeader />
      <section className="max-w-screen-lg h-full">
        <div className="flex h-full">
          <MyInfoSideBar />
          <div className="w-4/5 p-12">
            <section className="img_nick_intro flex mb-4">
              <div className="flex flex-col w-32">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0AqtMahULe4ViGKzXbAr4C4hel5SGwfl7Pg&usqp=CAU"
                  alt="조이현"
                  className="rounded-full h-32 w-32 object-cover mb-5"
                />
                <input
                  id="profileImg"
                  type="file"
                  accept="image/*"
                  ref={imgInputRef}
                  onChange={onUploadImg}
                  className="hidden"
                />
                <button
                  className="bg-b-yellow hover:opacity-80 text-white rounded-md font-bold w-32 h-8"
                  onClick={onUploadImgBtnClick}
                >
                  이미지 업로드
                </button>
                <button className="text-b-yellow hover:bg-b-bg-gray rounded-md font-bold w-32 h-8 mt-2">
                  이미지 제거
                </button>
              </div>
              <div className="nick_intro pl-7 w-full">
                <div>
                  <h2 className="nick text-3xl font-extrabold">yihyun</h2>
                  <p className="intro my-4 font-medium">
                    맥북2 대여를 전문으로 하고 있습니다. 연락주세요
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
                  조이현
                </div>
              </div>
              <div className="user_email flex items-center h-18 py-4 border-b border-solid border-gray-200">
                <div className="w-40 text-lg leading-normal font-bold">
                  <h3>이메일 주소</h3>
                </div>
                <div className="w-full flex items-center justify-start text-base leading-normal">
                  jyh@gmail.com
                </div>
              </div>
              <div className="user_phone flex items-center h-18 py-4 border-b border-solid border-gray-200">
                <div className="w-40 text-lg leading-normal font-bold">
                  <h3>핸드폰 번호</h3>
                </div>
                <div className="w-full flex items-center justify-start text-base leading-normal">
                  010-2585-3929
                </div>
              </div>
              <div className="user_address flex items-center h-18 py-4 border-b border-solid border-gray-200">
                <div className="w-40 text-lg leading-normal font-bold">
                  <h3>주소</h3>
                </div>
                <div className="w-full flex items-center justify-start text-base leading-normal">
                  서울시 도봉구 도봉산로 22길 월드컵아파트 201동 1101호
                </div>
              </div>
              <div className="user_penalty flex items-center h-18 py-4 border-b border-solid border-gray-200">
                <div className="w-40 text-lg leading-normal font-bold">
                  <h3>제재횟수</h3>
                </div>
                <div className="w-full flex items-center justify-start text-base leading-normal">
                  1 회
                </div>
              </div>
            </section>
            <section className="change_password">
              <div className="change flex items-center h-18 py-4 border-b border-solid border-gray-200">
                <div className="w-40 text-lg leading-normal font-bold">
                  <h3>비밀번호 변경</h3>
                </div>
                <div className="w-full flex items-center justify-start text-base leading-normal">
                  <button className="w-1/6 h-10 hover:text-white border border-b-tag-dir hover:bg-b-tag-dir focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                    변경하기
                  </button>
                </div>
              </div>
            </section>
            <section className="delete_user">
              <div className="change flex items-center h-18 py-4 border-b border-solid border-gray-200">
                <div className="w-40 text-lg leading-normal font-bold">
                  <h3>회원 탈퇴</h3>
                </div>
                <div className="w-full flex items-center justify-start text-base leading-normal">
                  <button className="w-1/6 h-10 hover:text-white border border-b-tag-done hover:bg-b-tag-done focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                    탈퇴하기
                  </button>
                </div>
              </div>
            </section>
            <div className="edit_btn flex justify-center mt-8">
              <button className="w-2/6 h-12 hover:text-white border border-b-yellow hover:bg-b-yellow focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                수정하기
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
