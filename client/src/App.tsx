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
import SubmainLend from './pages/SubmainLend';
import PostDetail from './pages/PostDetail';
import Search from './pages/Search';
import MyPage from './pages/MyPage';
import MyGivePostListPage from './pages/MyGivePostListPage';
import MyBorrowPostListPage from './pages/MyBorrowPostListPage';
import MyDoneListPage from 'pages/MyDoneListPage';
import ScrollToTop from 'components/ScrollToTop';
import { useIsLoginStore } from 'store/LoginJoinStore';
import api from './api/customAxios';
import MyPageEdit from './pages/MyPageEdit';
import Nav from 'components/nav/Nav';
import UserInformation from 'pages/UserInformation';
import ProductsLendList from 'pages/ProductsLendList';

const GlobalStyle = createGlobalStyle`
  ${reset}
`;

const queryClient = new QueryClient();

function App() {
  const {
    isLogin,
    isLoading,
    setIsLoginTrue,
    setIsLoginFalse,
    setIsLoadingTrue,
    setIsLoadingFalse,
  } = useIsLoginStore();

  useEffect(() => {
    setIsLoadingFalse();
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoadingTrue();
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
    setIsLoadingTrue();
  }, [isLogin]);

  if ((!isLoading && !isLogin) || (!isLoading && isLogin))
    return <p>loading....</p>;

  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
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
              <Route path="/submain/lend" element={<SubmainLend />} />
              <Route path="/search" element={<Search />} />
              <Route path="/read/:id" element={<PostDetail />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/mypage/givelist" element={<MyGivePostListPage />} />
              <Route
                path="/mypage/borrowlist"
                element={<MyBorrowPostListPage />}
              />
              <Route path="/mypage/edit" element={<MyPageEdit />} />
              <Route path="/mypage/donegivelist" element={<MyDoneListPage />} />
              <Route
                path="/mypage/doneborrowlist"
                element={<MyDoneListPage />}
              />
              <Route path="/user/:id" element={<UserInformation />} />
              <Route
                path="/products/lend/:categoryId"
                element={<ProductsLendList />}
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
