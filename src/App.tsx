import React from 'react';
import logo from './logo.svg';
import './App.css';
import { MyContext } from './redux';

import SiderButton from './components/sider_button';
import Test from './components/stash_page';
import { Test2 } from './components/stash_page/test2';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      123
      <MyContext.Provider value={{name: "JJ"}}>
        <Test></Test>
      </MyContext.Provider>
      {/* <SiderButton></SiderButton> */}
      <Test2></Test2>
    </div>
  );
}

export default App;
