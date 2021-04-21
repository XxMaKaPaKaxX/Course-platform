import React from 'react';
import StoreProvider from './store/StoreProvider';
import './App.scss';


const App = () => {
  return (
    <StoreProvider>
      <h1>Działa</h1>
    </StoreProvider>
  );
}

export default App;
