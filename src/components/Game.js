import { createContext, useContext, useState } from 'react';
import HexMap from './Sub/HexMap'; // HexMap.js dosyasının aynı klasörde olduğunu varsayıyoruz
import PeerJSChat from './Sub/PeerJSChat'; // HexMap.js dosyasının aynı klasörde olduğunu varsayıyoruz


import {  useAppContext } from '../contexts/AppContext';


export default function Game() {
  const { gameScreen } = useAppContext();

  return (
    <>
      <PeerJSChat />
      {gameScreen ?
        <HexMap />
        : <></>}
    </>
  );
}
