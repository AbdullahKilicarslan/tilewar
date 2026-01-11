import { createContext, useContext, useState, useEffect } from 'react';
import { useHubContext } from './HubContext';
import generalTools from '../tools/generalTools';

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
  const { users, handleSendGameStatus, activePlayerIdHub, strongholdPositionsHub, mapDataHub } = useHubContext();


  const [gameUsers, setGameUsers] = useState([]);
  const [activePlayerId, setActivePlayerId] = useState('');
  const [myPlayerName, setMyPlayerName] = useState('');
  const [myPlayerId, setMyPlayerId] = useState('2');

  const [tourCount, setTourCount] = useState(1);

  const [strongholdPositions, setStrongholdPositions] = useState([]);
  const [mapData, setMapData] = useState(null);


  useEffect(() => {
    if (mapDataHub)
      setMapData(mapDataHub.map);
  }, [mapDataHub]);

  useEffect(() => {
    setActivePlayerId(activePlayerIdHub.activePlayerId);
  }, [activePlayerIdHub]);

  useEffect(() => {
    if (strongholdPositionsHub)
      setStrongholdPositions(strongholdPositionsHub.strongholdPositions);
  }, [strongholdPositionsHub]);

  const StartGame = (hostUser, map) => {
    const sortedUsers = [...users, ...hostUser].sort((a, b) => {
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;
      return 0;
    });
    setGameUsers(sortedUsers);
    setMyPlayerId(hostUser[0].id);
    setMyPlayerName(hostUser[0].name);
    setActivePlayerId(sortedUsers[0].id);

    if (map) {
      //sadece host yaacak
      let sp = generalTools.shuffleArray(map.strongholds).slice(0, sortedUsers.length)
      for (let i = 0; i < sp.length; i++) {
        sp[i].peerId = sortedUsers[i].id;
        sp[i].color = sortedUsers[i].color;
      }
      setStrongholdPositions(sp);
      handleSendGameStatus({ type: 'strongholdPositions', strongholdPositions: sp });

      setMapData(map.map);
      handleSendGameStatus({ type: 'map', map: map.map });
    }

  }

  const SetActivePlayer = (playerId) => {
    setActivePlayerId(playerId);
    handleSendGameStatus({ type: 'activePlayer', activePlayerId: playerId });
  }


  const value = {

    gameUsers,
    StartGame,
    myPlayerName,
    setMyPlayerName,
    tourCount,
    setTourCount,
    myPlayerId,

    SetActivePlayer,
    activePlayerId,
    setActivePlayerId,
    mapData,
    strongholdPositions
  };


  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}; 