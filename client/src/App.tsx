import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import reset from 'styled-reset';
import './App.css';
import BorrowWriting from 'pages/BorrowWriting';
import GiveWriting from 'pages/GiveWriting';
import MenuButton from 'components/MenuButton';

const GlobalStyle = createGlobalStyle`
  ${reset}
`;
function App() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MenuButton />} />
            <Route path="/write/give" element={<GiveWriting />} />
            <Route path="/write/borrow" element={<BorrowWriting />} />
          </Routes>
        </BrowserRouter>
      </div>
    </React.Fragment>
  );
}

export default App;
