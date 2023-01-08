import React, { lazy, Suspense, useEffect, useRef } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createGlobalStyle } from 'styled-components';
import { useIsLoginStore } from 'store/LoginJoinStore';
import reset from 'styled-reset';
import api from './api/customAxios';
// componets
import ScrollToTop from 'components/ScrollToTop';
import NotFound from 'components/NotFound';
import Loading from 'components/Loading';
import TrueNav from './components/nav/TrueNav';
import Nav from './components/nav/Nav';
import Chat from './components/chat/Chat';
import ErrorBoundary from './components/ErrorBoundary';

// pages
const Main = lazy(() => import('./pages/Main'));
const MyPage = lazy(() => import('./pages/MyPage'));
const SubmainPage = lazy(() => import('./pages/SubmainPage'));
const ProductsList = lazy(() => import('./pages/ProductsList'));
const Writing = lazy(() => import('./pages/Writing'));
const PostUpdate = lazy(() => import('./pages/PostUpdate'));
const PostDetail = lazy(() => import('./pages/PostDetail'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const LoginJoin = lazy(() => import('./pages/LoginJoin'));
const AdminMain = lazy(() => import('./pages/AdminMain'));
const Notices = lazy(() => import('./pages/Notices'));
const ReadNotice = lazy(() => import('./pages/Notice'));
const UserInformation = lazy(() => import('./pages/UserInformation'));

const GlobalStyle = createGlobalStyle`
  ${reset};
  body {
    font-family: 'IBM Plex Sans KR', sans-serif;
  }
`;

const queryClient = new QueryClient();

// 지도 관련 설정
declare global {
  interface Window {
    kakao: any;
  }
}

function App() {
  const { isLogin, setIsLoginTrue, setIsLoginFalse } = useIsLoginStore();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    const getUserInfo = async () => {
      try {
        const userInfo = await api.get('/user/me');
        const id = localStorage.getItem('userId');

        if (userInfo.status === 200 && id === userInfo.data._id) {
          setIsLoginTrue();
        } else {
          setIsLoginFalse();
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUserInfo();
  }, [isLogin]);

  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <div className="App h-screen w-screen">
          <BrowserRouter>
            <ErrorBoundary>
              <Suspense fallback={<Loading />}>
                <div className="w-screen max-w-screen-lg m-auto">
                  {isLogin ? <TrueNav /> : <Nav />}
                </div>
                {/* ScrollToTop : navigate했을 때, 스크롤 위치가 그대로 적용되는 문제 방지*/}
                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path="/submain/*" element={<SubmainPage />} />
                  <Route path="/mypage/*" element={<MyPage />} />
                  <Route path="/login" element={<LoginJoin />} />
                  <Route path="/admin" element={<AdminMain />} />
                  <Route path="/write" element={<Writing />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/read/:id" element={<PostDetail />} />
                  <Route path="/update/:id" element={<PostUpdate />} />
                  <Route path="/notices" element={<Notices />} />
                  <Route path="/notices/:id" element={<ReadNotice />} />
                  <Route path="/user/:id" element={<UserInformation />} />
                  <Route
                    path="/products/lend/:categoryId"
                    element={<ProductsList postType="lend" />}
                  />
                  <Route
                    path="/products/borrow/:categoryId"
                    element={<ProductsList postType="borrow" />}
                  />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/chat/:roomId" element={<Chat />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </BrowserRouter>
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </React.Fragment>
  );
}

export default App;
