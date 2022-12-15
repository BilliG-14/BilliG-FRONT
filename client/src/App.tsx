import React from 'react';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from 'pages/Main';
import LoginJoin from './pages/LoginJoin';
import Submain from './pages/Submain';

const GlobalStyle = createGlobalStyle`
  ${reset}
`;

function App() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <div className="App h-screen">
        <BrowserRouter>
          <Routes>
            {/* 아래 부분은 승연님이 작성하신 feat-FE-join의 부분이고,
             이걸 그대로 두면 충돌이 나므로 주석처리했습니다.
             원래는 라우팅을 제대로 손봐야하는데, 제 브랜치에서 이걸 건드리는것은
             뭔가 아닌것 같아서 ^^; 일단 주석처리하고 nav먼저 만들어놨습니다. */}
            {/* <Route path="/" element={<Main />} />
            <Route path="/login" element={<LoginJoin />} /> */}
            <Route path="/" element={<Submain />} />
          </Routes>
        </BrowserRouter>
      </div>
    </React.Fragment>
  );
}

export default App;
