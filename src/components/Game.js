import { createContext, useContext, useState } from 'react';
import HexMap from './Sub/HexMap'; // HexMap.js dosyasının aynı klasörde olduğunu varsayıyoruz
import MainHub from './Hub/MainHub'; // HexMap.js dosyasının aynı klasörde olduğunu varsayıyoruz

import MainMenu from './Screens/FirstScreen'; // HexMap.js dosyasının aynı klasörde olduğunu varsayıyoruz
import HostScreen from './Screens/HostScreen'; // HexMap.js dosyasının aynı klasörde olduğunu varsayıyoruz
import LobbyScreen from './Screens/LobbyScreen'; // HexMap.js dosyasının aynı klasörde olduğunu varsayıyoruz

import { useAppContext } from '../contexts/AppContext';
import { useScreenContext } from '../contexts/ScreenContext';


export default function Game() {
  const { gameScreen } = useAppContext();
  const { isMainMenuScreen, isHostScreen, isLobyScreen,isMapScreen } = useScreenContext();

  return (
    <>
      {isMainMenuScreen && <MainMenu />}
      {isHostScreen && <HostScreen />}
      {isLobyScreen && <LobbyScreen />}
      {isMapScreen && <HexMap />}
      {/* {gameScreen ?
        <HexMap />
        :  <PeerJSChat />} */}
    </>
  );
}
