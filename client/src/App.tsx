import Category from 'components/category-submain/Category';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
`;

function App() {
  return (
    <div className="App h-screen">
      <GlobalStyle />
      <Category />
    </div>
  );
}

export default App;
