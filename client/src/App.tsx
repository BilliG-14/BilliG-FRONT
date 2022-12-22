import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Main from 'pages/Main';
import LoginJoin from './pages/LoginJoin';
import AdminMain from './pages/AdminMain';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import BorrowWriting from './pages/BorrowWriting';
import LendWriting from './pages/LendWriting';
import Submain from './pages/Submain';
import LendPostDetail from './pages/LendPostDetail';
import BorrowPostDetail from './pages/BorrowPostDetail';
import Search from './pages/Search';
import MyPage from './pages/MyPage';
import MyGivePostListPage from './pages/MyGivePostListPage';
import MyBorrowPostListPage from './pages/MyBorrowPostListPage';
import MyDoneListPage from 'pages/MyDoneListPage';
import ScrollToTop from 'components/ScrollToTop';
import { useIsLoginStore } from 'store/LoginJoinStore';
import axios from 'axios';

const queryClient = new QueryClient();
const GlobalStyle = createGlobalStyle`
  ${reset}
`;

function App() {
  const { isLogin, setIsLoginTrue, setIsLoginFalse } = useIsLoginStore();
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token === null) {
      setIsLoginFalse();
      return;
    }

    const getUserInfo = async () => {
      try {
        const userInfo = await axios.get(
          'https://port-0-village-token-dpuqy925lbn63gyo.gksl2.cloudtype.app/user',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(userInfo);
      } catch (error) {
        console.log(error);
      }
    };

    getUserInfo();
    // localStorage에 token이 있으나, isLogin이 false가 됫으면
    // token이 만료됬는지를 확인 할 수 있어야함.
    // token이 있다고 무조건 true로 할 순 없음.
  }, [isLogin]);

  return (
    <React.Fragment>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <div className="App h-screen w-screen">
          <BrowserRouter>
            {/* ScrollToTop : navigate했을 때, 스크롤 위치가 그대로 적용되는 문제 방지*/}
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/login" element={<LoginJoin />} />
              <Route path="/admin" element={<AdminMain />} />
              <Route path="/write/lend" element={<LendWriting />} />
              <Route path="/write/borrow" element={<BorrowWriting />} />
              <Route path="/submain" element={<Submain />} />
              <Route path="/search" element={<Search />} />
              <Route path="/read/lend" element={<LendPostDetail />} />
              <Route path="/read/borrow" element={<BorrowPostDetail />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/mypage/givelist" element={<MyGivePostListPage />} />
              <Route
                path="/mypage/borrowlist"
                element={<MyBorrowPostListPage />}
              />
              <Route path="/mypage/donegivelist" element={<MyDoneListPage />} />
              <Route
                path="/mypage/doneborrowlist"
                element={<MyDoneListPage />}
              />
            </Routes>
          </BrowserRouter>
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </React.Fragment>
  );
}

export default App;
