import React from 'react';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import './App.css';
const GlobalStyle = createGlobalStyle`
  ${reset}
`;
function App() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <ul>
        <li>나는 리스트다.</li>
        <li>나는 리스트다.</li>
        <li>나는 리스트다.</li>
      </ul>
    </React.Fragment>
  );
}

export default App;
