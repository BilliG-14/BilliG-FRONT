import Nav from '../components/nav/Nav';
import MyInfoHeader from 'components/myinfo/MyInfoHeader';
import MyInfoSideBar from '../components/myinfo/MyinfoSideBar';
import { useRef } from 'react';
import { useMyIntroEditStore } from '../store/MypageStore';
import MyinfoPage from 'components/myinfo/MyinfoPage';
import EditMyinfoPage from '../components/myinfo/EditMyinfoPage';

export default function MyPage() {
  const { isMyinfo, toggleIntro } = useMyIntroEditStore();

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
          {isMyinfo ? <EditMyinfoPage /> : <MyinfoPage />}
        </div>
      </section>
    </div>
  );
}
