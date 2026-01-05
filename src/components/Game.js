import { createContext, useContext, useState } from 'react';
import HexMap from './Sub/HexMap'; // HexMap.js dosyasının aynı klasörde olduğunu varsayıyoruz
import MainHub from './Hub/MainHub'; // HexMap.js dosyasının aynı klasörde olduğunu varsayıyoruz

import MainMenu from './Menus/MainMenu'; // HexMap.js dosyasının aynı klasörde olduğunu varsayıyoruz
import HostScreen from './Menus/HostScreen'; // HexMap.js dosyasının aynı klasörde olduğunu varsayıyoruz
import LobbyScreen from './Menus/LobbyScreen'; // HexMap.js dosyasının aynı klasörde olduğunu varsayıyoruz

import { useAppContext } from '../contexts/AppContext';
import { useMainMenuContext } from '../contexts/MainMenuContext';


export default function Game() {
  const { gameScreen } = useAppContext();
  const { isMainMenuScreen, isHostScreen, isLobyScreen } = useMainMenuContext();

  return (
    <>
      {isMainMenuScreen && <MainMenu />}
      {isHostScreen && <HostScreen />}
      {isLobyScreen && <LobbyScreen />}

      {/* {gameScreen ?
        <HexMap />
        :  <PeerJSChat />} */}
    </>
  );
}
