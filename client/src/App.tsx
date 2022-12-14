import './App.css';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import Category from 'components/category-submain/Category';

const GlobalStyle = createGlobalStyle`
  ${reset}
`;

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Category />
    </div>
  );
}

export default App;
