import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import Submain from './pages/Submain';
import Search from './pages/Search';

const GlobalStyle = createGlobalStyle`
  ${reset}
`;

function App() {
  return (
    <div className="App h-screen">
      <h1 className="font-extrabold text-5xl mt-9">B illi G</h1>
      <GlobalStyle />
      <Submain />
    </div>
  );
}

export default App;
