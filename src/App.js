import React from 'react';
import Game from './components/Game'; // HexMap.js dosyasının aynı klasörde olduğunu varsayıyoruz

import './App.css';

function App() {
  return (
    <div className="App">
     <Game />
    </div>
  );
}

export default App;