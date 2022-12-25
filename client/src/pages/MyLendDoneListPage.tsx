import Nav from '../components/nav/Nav';
import MyInfoHeader from 'components/myinfo/MyInfoHeader';
import MyInfoSideBar from '../components/myinfo/MyinfoSideBar';
import { useIsLoginStore } from 'store/LoginJoinStore';
import TrueNav from '../components/nav/TrueNav';
import MyLendDoneList from '../components/myinfo/MyLendDoneList';

export default function MyLendDoneListPage() {
  const { isLogin } = useIsLoginStore();
  return (
    <div className="h-full w-screen max-w-screen-lg m-auto">
      {isLogin ? <TrueNav /> : <Nav />}
      <MyInfoHeader />
      <section className="max-w-screen-lg h-full">
        <div className="flex h-full">
          <MyInfoSideBar />
          <MyLendDoneList />
        </div>
      </section>
    </div>
  );
}
