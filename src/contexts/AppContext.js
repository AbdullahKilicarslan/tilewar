import { createContext, useContext, useState } from 'react';

// Context oluştur
const AppContext = createContext();

// Custom hook - her yerden kolayca kullanmak için
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

// Provider component
export const AppProvider = ({ children }) => {
  const [data, setData] = useState('');
  const [trigger, setTrigger] = useState(0);
  const [gameScreen, setGameScreen] = useState(false);

  const myFunction = () => {
    console.log('Global fonksiyon çalıştı!', data);
  };


  const value = {
    data,
    setData,
    trigger,
    setTrigger,
    myFunction
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};