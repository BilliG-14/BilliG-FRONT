import Nav from '../components/nav/Nav';
import MyInfoHeader from 'components/myinfo/MyInfoHeader';
import MyInfoSideBar from '../components/myinfo/MyinfoSideBar';
import { useMyIntroEditStore } from '../store/MypageStore';
import MyinfoPage from 'components/myinfo/MyinfoPage';
import EditMyinfoPage from '../components/myinfo/EditMyinfoPage';

export default function MyPage() {
  const { isMyinfo } = useMyIntroEditStore();

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
