import React from 'react';
import Game from './components/Game'; // HexMap.js dosyasının aynı klasörde olduğunu varsayıyoruz

import './App.css';
import { AppProvider } from './contexts/AppContext';
import { ScreenProvider } from './contexts/ScreenContext';
import { HubProvider } from './contexts/HubContext';
import { GameProvider } from './contexts/GameContext';

function App() {
  return (

    <div className="App">
      <AppProvider>
        <HubProvider>
          <ScreenProvider>
            <GameProvider>
              <Game />
            </GameProvider>
          </ScreenProvider>
        </HubProvider>
      </AppProvider>
    </div>
  );
}

export default App;