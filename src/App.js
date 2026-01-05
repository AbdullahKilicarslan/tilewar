import React from 'react';
import Game from './components/Game'; // HexMap.js dosyasının aynı klasörde olduğunu varsayıyoruz

import './App.css';
import { AppProvider } from './contexts/AppContext';
import { MainMenuProvider } from './contexts/MainMenuContext';
import { HubProvider } from './contexts/HubContext';

function App() {
  return (

    <div className="App">
      <AppProvider>
        <HubProvider>
          <MainMenuProvider>
            <Game />
          </MainMenuProvider>
        </HubProvider>
      </AppProvider>
    </div>
  );
}

export default App;