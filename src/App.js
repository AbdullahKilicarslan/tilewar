import React from 'react';
import Game from './components/Game'; // HexMap.js dosyasının aynı klasörde olduğunu varsayıyoruz

import './App.css';
import { AppProvider } from './contexts/AppContext';

function App() {
  return (

    <div className="App">
      <AppProvider>
        <Game />
      </AppProvider>
    </div>
  );
}

export default App;