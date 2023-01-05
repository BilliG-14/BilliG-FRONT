import { Route, Routes } from 'react-router-dom';
// components
import MyInfoHeader from 'components/myinfo/MyInfoHeader';
import MyInfoSideBar from '../components/myinfo/MyinfoSideBar';
import MyinfoPage from 'components/myinfo/MyinfoPage';
import EditMyinfoPage from '../components/myinfo/EditMyinfoPage';
import MyPostDealList from '../components/myinfo/MyPostDealList';

export default function MyPage() {
  return (
    <div className="h-full w-screen max-w-screen-lg m-auto">
      <MyInfoHeader />
      <section className="max-w-screen-lg h-full">
        <div className="flex h-full">
          <MyInfoSideBar />
          <Routes>
            <Route path="/" element={<MyinfoPage />} />
            <Route path="/edit" element={<EditMyinfoPage />} />
            <Route
              path="/lendlist"
              element={
                <MyPostDealList
                  param="lendList"
                  target="author"
                  stateOfTransaction="0"
                  postType="lend"
                />
              }
            />
            <Route
              path="/borrowlist"
              element={
                <MyPostDealList
                  param="borrowList"
                  target="author"
                  stateOfTransaction="0"
                  postType="borrow"
                />
              }
            />
            <Route
              path="/lenddeallist"
              element={
                <MyPostDealList
                  param="lendDealList"
                  target="lender"
                  stateOfTransaction="1,2"
                />
              }
            />
            <Route
              path="/borrowdeallist"
              element={
                <MyPostDealList
                  param="borrowDealList"
                  target="borrower"
                  stateOfTransaction="1,2"
                />
              }
            />
            <Route
              path="/donelendlist"
              element={
                <MyPostDealList
                  param="lendDoneList"
                  target="lender"
                  stateOfTransaction="3"
                />
              }
            />
            <Route
              path="/doneborrowlist"
              element={
                <MyPostDealList
                  param="borrowDoneList"
                  target="borrower"
                  stateOfTransaction="3"
                />
              }
            />
          </Routes>
        </div>
      </section>
    </div>
  );
}
