import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import Submain from './pages/Submain';
import Nav from '../src/components/nav/Nav';

const GlobalStyle = createGlobalStyle`
  ${reset}
`;

function App() {
  return (
    <div className="App h-screen">
      <GlobalStyle />
      <Nav />
      <Submain />
    </div>
  );
}

export default App;
