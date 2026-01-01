import { createContext, useContext, useState } from 'react';
import HexMap from './components/Sub/HexMap'; // HexMap.js dosyasının aynı klasörde olduğunu varsayıyoruz
import PeerJSChat from './components/Sub/PeerJSChat'; // HexMap.js dosyasının aynı klasörde olduğunu varsayıyoruz


const AppContext = createContext();

function Game() {
  const [trigger, setTrigger] = useState(0);

  return (
    <AppContext.Provider value={{ trigger, setTrigger }}>
      <PeerJSChat />
      <HexMap />
    </AppContext.Provider>
  );
}
