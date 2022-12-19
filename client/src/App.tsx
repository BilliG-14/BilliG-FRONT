import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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

const GlobalStyle = createGlobalStyle`
  ${reset}
`;

function App() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <div className="App h-screen w-screen">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<LoginJoin />} />
            <Route path="/admin" element={<AdminMain />} />
            <Route path="/write/lend" element={<LendWriting />} />
            <Route path="/write/borrow" element={<BorrowWriting />} />
            <Route path="/submain" element={<Submain />} />
            <Route path="/search" element={<Search />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/read/lend" element={<LendPostDetail />} />
            <Route path="/read/borrow" element={<BorrowPostDetail />} />
          </Routes>
        </BrowserRouter>
      </div>
    </React.Fragment>
  );
}

export default App;
