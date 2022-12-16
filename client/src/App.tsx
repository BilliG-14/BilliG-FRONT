import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from 'pages/Main';
import LoginJoin from './pages/LoginJoin';
import AdminMain from './pages/AdminMain';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import BorrowWriting from 'pages/BorrowWriting';
import GiveWriting from 'pages/GiveWriting';
import Submain from './pages/Submain';
<<<<<<< HEAD
import Search from './pages/Search';
import MyInfo from './pages/MyInfo';
=======
import GivePostDetail from './pages/GivePostDetail';
import BorrowPostDetail from './pages/BorrowPostDetail';
>>>>>>> 488975395b5aae2d6587d2eba812ceaa17ba4092

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
            <Route path="/write/give" element={<GiveWriting />} />
            <Route path="/write/borrow" element={<BorrowWriting />} />
<<<<<<< HEAD
            <Route path="/submain" element={<Submain />} />
            <Route path="/search" element={<Search />} />
            <Route path="/myinfo" element={<MyInfo />} />
=======
            <Route path="/read/give" element={<GivePostDetail />} />
            <Route path="/read/borrow" element={<BorrowPostDetail />} />
>>>>>>> 488975395b5aae2d6587d2eba812ceaa17ba4092
          </Routes>
        </BrowserRouter>
      </div>
    </React.Fragment>
  );
}

export default App;
