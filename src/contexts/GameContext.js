import { createContext, useContext, useState } from 'react';
import { useHubContext } from './HubContext';

// Context oluştur
const GameContext = createContext();

// Custom hook - her yerden kolayca kullanmak için
export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within AppProvider');
  }
  return context;
};

// Provider component
export const GameProvider = ({ children }) => {
  const {users} = useHubContext();

  
  const [gameUsers, setGameUsers] = useState([]);
  const [activePlayerId, setActivePlayerId] = useState('1');
  const [myPlayerName, setMyPlayerName] = useState('');
  const [myPlayerId, setMyPlayerId] = useState('2');

    const [tourCount, setTourCount] = useState(1);

  const StartGame = (hostUser) => {
    setGameUsers([...users,...hostUser]);

    setMyPlayerId(hostUser[0].id);
    setMyPlayerName(hostUser[0].name);
    setActivePlayerId(hostUser[0].id);
  }
 
  const value = {

    gameUsers,
    StartGame,
    activePlayerId,
    setActivePlayerId,
    myPlayerName,
    setMyPlayerName,
    tourCount,
    setTourCount,
    myPlayerId,
    setMyPlayerName
  };


  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}; 