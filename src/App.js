import React from 'react';
import HexMap from './HexMap'; // HexMap.js dosyasının aynı klasörde olduğunu varsayıyoruz
import PeerJSChat from './PeerJSChat'; // HexMap.js dosyasının aynı klasörde olduğunu varsayıyoruz

import './App.css';

function App() {
  return (
    <div className="App">
      <PeerJSChat />
      {/* Oyun Arayüzü (UI) Elemanlarını Buraya Koyabilirsin */}
      <div className="ui-overlay">
        <h1>Civ Clone</h1>
        <p>Altıgenlere tıklayarak keşfet!</p>
      </div>
      <HexMap /> 
    </div>
  );
}

export default App;