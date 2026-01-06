import { createContext, useContext, useState } from 'react';

// Context oluştur
const ScreenContext = createContext();

// Custom hook - her yerden kolayca kullanmak için
export const useScreenContext = () => {
  const context = useContext(ScreenContext);
  if (!context) {
    throw new Error('useScreenContext must be used within AppProvider');
  }
  return context;
};

// Provider component
export const ScreenProvider = ({ children }) => {
  const [isMainMenuScreen, setMainMenuScreen] = useState(true);
  const [isHostScreen, setHostScreen] = useState(false);
  const [isClientScreen, setClientScreen] = useState(false);
  const [isLobyScreen, setLobyScreen] = useState(false);
  const [isMapScreen, setMapScreen] = useState(false);

  const [isHost, setIsHost] = useState(true);

  const [peerId, setPeerId] = useState(null);

  const OpenMenuScreen = () => {
    setMainMenuScreen(true);
    setHostScreen(false);
    setClientScreen(false);
    setLobyScreen(false);
    setMapScreen(false);
  }

  const OpenHostScreen = () => {
    setMainMenuScreen(false);
    setHostScreen(true);
    setClientScreen(false);
    setLobyScreen(false);
    setMapScreen(false);
  }
  const OpenClientScreen = () => {
    setMainMenuScreen(false);
    setHostScreen(false);
    setClientScreen(true);
    setLobyScreen(false);
    setMapScreen(false);
  }

  const OpenLobbyScreen = () => {
    setMainMenuScreen(false);
    setHostScreen(false);
    setClientScreen(false);
    setLobyScreen(true);
    setMapScreen(false);
  }
  const OpenMapScreen = () => {
    setMainMenuScreen(false);
    setHostScreen(false);
    setClientScreen(false);
    setLobyScreen(false);
    setMapScreen(true);
  }

  const value = {
    isMainMenuScreen,
    isHostScreen,
    isClientScreen,
    isLobyScreen,
    isMapScreen,

    OpenMenuScreen,
    OpenHostScreen,
    OpenClientScreen,
    OpenLobbyScreen,
    OpenMapScreen,

    peerId,
    setPeerId,

    isHost,
    setIsHost
  };

  return (
    <ScreenContext.Provider value={value}>
      {children}
    </ScreenContext.Provider>
  );
};