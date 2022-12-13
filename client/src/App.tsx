import Button from 'components/Button';
import React from 'react';
import './App.css';
import logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>빌려줘14죠@@@!@!@!@@!</p>
        <h1 className="text-3xl font-bold underline text-red-600">
          Simple React Typescript Tailwind Sample!!!
        </h1>
        <Button />
      </header>
    </div>
  );
}

export default App;
