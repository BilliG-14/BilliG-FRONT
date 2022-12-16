import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from 'pages/Main';
import LoginJoin from './pages/LoginJoin';
import AdminMain from './pages/AdminMain';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
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
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<LoginJoin />} />
            <Route path="/admin" element={<AdminMain />} />
          </Routes>
        </BrowserRouter>
      </div>
    </React.Fragment>
  );
}

export default App;
