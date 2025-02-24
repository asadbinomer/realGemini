import React, { useContext } from 'react';
import { Context } from './context/Context';
import Sidebar from './component/Sidebar/Sidebar';
import Main from './component/Main/Main';

const App = () => {
  
  return (
    <>
      <Sidebar />
      <Main />
    </>
  );
}

export default App;