import { lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
// components
import Loading from 'components/Loading';
import MyInfoHeader from 'components/myinfo/MyInfoHeader';
import MyInfoSideBar from '../components/myinfo/MyinfoSideBar';
import ErrorBoundary from '../components/ErrorBoundary';
const MyinfoPage = lazy(() => import('components/myinfo/MyinfoPage'));
const EditMyinfoPage = lazy(() => import('components/myinfo/EditMyinfoPage'));
const MyPostDealList = lazy(() => import('components/myinfo/MyPostDealList'));

export default function MyPage() {
  const { pathname } = useLocation();
  return (
    <div className="h-full w-screen max-w-screen-lg m-auto dark:bg-b-bg-dark">
      <MyInfoHeader />
      <section className="max-w-screen-lg h-full dark:bg-b-bg-dark">
        <div className="flex h-full dark:bg-b-bg-dark">
          <MyInfoSideBar />
          <ErrorBoundary key={pathname}>
            <Suspense fallback={<Loading />}>
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
                      postType=""
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
                      postType=""
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
                      postType=""
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
                      postType=""
                    />
                  }
                />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </div>
      </section>
    </div>
  );
}
