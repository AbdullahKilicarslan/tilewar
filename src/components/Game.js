import React, {   useEffect } from 'react';
import GameMap from './map/GameMap'; // HexMap.js dosyasının aynı klasörde olduğunu varsayıyoruz
//import MainHub from './hub/MainHub'; // HexMap.js dosyasının aynı klasörde olduğunu varsayıyoruz

import MainMenu from './screens/FirstScreen'; // HexMap.js dosyasının aynı klasörde olduğunu varsayıyoruz
import HostScreen from './screens/HostScreen'; // HexMap.js dosyasının aynı klasörde olduğunu varsayıyoruz
import LobbyScreen from './screens/LobbyScreen'; // HexMap.js dosyasının aynı klasörde olduğunu varsayıyoruz
import ClientScreen from './screens/ClientScreen'; // HexMap.js dosyasının aynı klasörde olduğunu varsayıyoruz

import { useAppContext } from '../contexts/AppContext';
import { useGameContext } from '../contexts/GameContext';
import { useScreenContext } from '../contexts/ScreenContext';


export default function Game() {
  const { gameScreen } = useAppContext();
  const { isMainMenuScreen, isHostScreen, isLobyScreen, isMapScreen, isClientScreen } = useScreenContext();
  const { StartGame } = useGameContext();
  const isDev = false; // Geliştirme modu için true yapabilirsiniz


  useEffect(() => {
    if (!isDev) return;
    StartGame([{
      id: 'host',
      name: 'Veriziazam İsmail',
      deck: '1',
      ready: true,
      color: 'renk'
    }, {
      id: 'host2',
      name: 'Taçsız Kral Mustafa',
      deck: '1',
      ready: true,
      color: 'renk'
    }, {
      id: 'host3',
      name: 'Yeni Çeri Abdullah',
      deck: '1',
      ready: true,
      color: 'renk'
    }
    ]);



  }, []);


  return (
    <>
      {isDev ?
        <GameMap />
        : <>
          {isMainMenuScreen && <MainMenu />}
          {isHostScreen && <HostScreen />}
          {isClientScreen && <ClientScreen />}
          {isLobyScreen && <LobbyScreen />}
          {isMapScreen && <GameMap />}
        </>
      }
    </>
  );
}
