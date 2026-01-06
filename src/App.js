import React from 'react';
import Game from './components/Game'; // HexMap.js dosyasının aynı klasörde olduğunu varsayıyoruz

import './App.css';
import { AppProvider } from './contexts/AppContext';
import { ScreenProvider } from './contexts/ScreenContext';
import { HubProvider } from './contexts/HubContext';

function App() {
  return (

    <div className="App">
      <AppProvider>
        <HubProvider>
          <ScreenProvider>
            <Game />
          </ScreenProvider>
        </HubProvider>
      </AppProvider>
    </div>
  );
}

export default App;