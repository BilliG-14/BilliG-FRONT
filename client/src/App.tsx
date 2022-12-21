import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
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
import ChatPage from 'components/ChatPage/ChatPage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser } from './redux/actions/user_action';

const queryClient = new QueryClient();
const GlobalStyle = createGlobalStyle`
  ${reset}
`;

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      //onAuthStateChanged: 현재 로그인한 사용자 가져오기 --> 이 부분은 백엔드 server에 get요청 보내서 db에 user data가 존재하는지 판단하는것으로 변경해야함.
      if (user) {
        //로그인 된 상태
        navigate('/');
        dispatch(setUser(user));
        const uid = user.uid;
      } else {
        //로그인 안 된 상태
        navigate('/login');
        dispatch(clearUser());
      }
    });
  }, []);
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
              {isLoading ? (
                <div>...loading</div>
              ) : (
                <Route path="/chat" element={<ChatPage />} />
              )}

              <Route path="/search" element={<Search />} />
              <Route path="/read/lend/:id" element={<LendPostDetail />} />
              <Route path="/read/borrow/:id" element={<BorrowPostDetail />} />
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
