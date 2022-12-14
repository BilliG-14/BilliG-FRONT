import React from 'react';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from 'pages/Main';
import LoginJoin from './pages/LoginJoin';
const GlobalStyle = createGlobalStyle`
  ${reset}
`;
function App() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<LoginJoin />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
