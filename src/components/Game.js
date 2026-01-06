import { createContext, useContext, useState } from 'react';
import HexMap from './sub/HexMap'; // HexMap.js dosyasının aynı klasörde olduğunu varsayıyoruz
import MainHub from './hub/MainHub'; // HexMap.js dosyasının aynı klasörde olduğunu varsayıyoruz

import MainMenu from './screens/FirstScreen'; // HexMap.js dosyasının aynı klasörde olduğunu varsayıyoruz
import HostScreen from './screens/HostScreen'; // HexMap.js dosyasının aynı klasörde olduğunu varsayıyoruz
import LobbyScreen from './screens/LobbyScreen'; // HexMap.js dosyasının aynı klasörde olduğunu varsayıyoruz
import ClientScreen from './screens/ClientScreen'; // HexMap.js dosyasının aynı klasörde olduğunu varsayıyoruz

import { useAppContext } from '../contexts/AppContext';
import { useScreenContext } from '../contexts/ScreenContext';


export default function Game() {
  const { gameScreen } = useAppContext();
  const { isMainMenuScreen, isHostScreen, isLobyScreen, isMapScreen, isClientScreen } = useScreenContext();

  return (
    <>
      {isMainMenuScreen && <MainMenu />}
      {isHostScreen && <HostScreen />}
      {isClientScreen && <ClientScreen />}
      {isLobyScreen && <LobbyScreen />}
      {isMapScreen && <HexMap />}

      {/* {gameScreen ?
        <HexMap />
        :  <PeerJSChat />} */}
    </>
  );
}
