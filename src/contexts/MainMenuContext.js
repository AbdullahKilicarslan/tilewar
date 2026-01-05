import { createContext, useContext, useState } from 'react';

// Context oluştur
const MainMenuContext = createContext();

// Custom hook - her yerden kolayca kullanmak için
export const useMainMenuContext = () => {
  const context = useContext(MainMenuContext);
  if (!context) {
    throw new Error('useMainMenuContext must be used within AppProvider');
  }
  return context;
};

// Provider component
export const MainMenuProvider = ({ children }) => {
  const [isMainMenuScreen, setMainMenuScreen] = useState(true);
  const [isHostScreen, setHostScreen] = useState(false);
  const [isClientScreen, setClientScreen] = useState(false);
  const [isLobyScreen, setLobyScreen] = useState(false);

  const [peerId, setPeerId] = useState(null);


  const value = {
    isMainMenuScreen,
    setMainMenuScreen,

    isHostScreen,
    setHostScreen,

    isClientScreen,
    setClientScreen,

    isLobyScreen,
    setLobyScreen,

    peerId,
    setPeerId
  };

  return (
    <MainMenuContext.Provider value={value}>
      {children}
    </MainMenuContext.Provider>
  );
};