import Category from 'components/category-submain/Category';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
`;

function App() {
  return (
    <div className="App h-screen">
      <h1 className="font-extrabold text-5xl mt-9">B illi G</h1>
      <GlobalStyle />
      <Category />
    </div>
  );
}

export default App;
