import Nav from '../components/nav/Nav';
import MyInfoHeader from 'components/myinfo/MyInfoHeader';
import MyInfoSideBar from '../components/myinfo/MyinfoSideBar';
import MyinfoPage from 'components/myinfo/MyinfoPage';
import { useIsLoginStore } from 'store/LoginJoinStore';
import TrueNav from '../components/nav/TrueNav';
import { Route, Routes } from 'react-router-dom';
import MyLendPostList from '../components/myinfo/MyLendPostList';
import MyBorrowPostList from '../components/myinfo/MyBorrowPostList';
import EditMyinfoPage from '../components/myinfo/EditMyinfoPage';
import MyLendDealList from '../components/myinfo/MyLendDealList';
import MyBorrowDealList from '../components/myinfo/MyBorrowDealList';
import MyLendDoneList from '../components/myinfo/MyLendDoneList';
import MyBorrowDoneList from '../components/myinfo/MyBorrowDoneList';

export default function MyPage() {
  const { isLogin } = useIsLoginStore();
  return (
    <div className="h-full w-screen max-w-screen-lg m-auto">
      {isLogin ? <TrueNav /> : <Nav />}
      <MyInfoHeader />
      <section className="max-w-screen-lg h-full">
        <div className="flex h-full">
          <MyInfoSideBar />
          <Routes>
            <Route path="/" element={<MyinfoPage />} />
            <Route path="/edit" element={<EditMyinfoPage />} />
            <Route path="/lendlist" element={<MyLendPostList />} />
            <Route path="/borrowlist" element={<MyBorrowPostList />} />
            <Route path="/lenddeallist" element={<MyLendDealList />} />
            <Route path="/borrowdeallist" element={<MyBorrowDealList />} />
            <Route path="/donelendlist" element={<MyLendDoneList />} />
            <Route path="/doneborrowlist" element={<MyBorrowDoneList />} />
          </Routes>
        </div>
      </section>
    </div>
  );
}
