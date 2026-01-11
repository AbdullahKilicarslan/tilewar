import { createContext, useContext, useState, useEffect } from 'react';
import { useHubContext } from './HubContext';
import generalTools from '../tools/generalTools';
import deckGenerate from '../components/map/tools/deckGenerate';

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
  const [myPlayerDeck, setMyPlayerDeck] = useState([]);
  const [myPlayerDeckDraw, setMyPlayerDeckDraw] = useState([]);
  const [myPlayerDeckDiscard, setMyPlayerDeckDiscard] = useState([]);

  const [myPlayerDeckOnHand, setMyPlayerDeckOnHand] = useState([]);

  const [tourCount, setTourCount] = useState(1);

  const [strongholdPositions, setStrongholdPositions] = useState([]);
  const [mapData, setMapData] = useState(null);

  const [unitData, setUnitData] = useState([]);

  useEffect(() => {
    if (mapDataHub) {
      setMapData(mapDataHub.map.map);

    }
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
    let deck2 = deckGenerate.generateByName('Deck' + hostUser[0].deck);
    setMyPlayerDeck([...deck2])
    setMyPlayerDeckDraw([...deck2].slice(5));
    setMyPlayerDeckOnHand([...deck2].slice(0, 5));
    if (map) {
      //sadece host yapacak
      let sp = generalTools.shuffleArray(map.strongholds).slice(0, sortedUsers.length)
      for (let i = 0; i < sp.length; i++) {
        sp[i].peerId = sortedUsers[i].id;
        sp[i].color = sortedUsers[i].color;
      }
      setStrongholdPositions(sp);
      handleSendGameStatus({ type: 'strongholdPositions', strongholdPositions: sp });

      setMapData(map.map);
      handleSendGameStatus({ type: 'map', map: map });
    }

  }

  const SetActivePlayer = (playerId) => {
    setActivePlayerId(playerId);
    handleSendGameStatus({ type: 'activePlayer', activePlayerId: playerId });

   /* var myPlayerDeckOnHand = [...myPlayerDeckOnHand];
    setMyPlayerDeckDiscard([...myPlayerDeckOnHand].push(myPlayerDeckOnHand))

   var draw = [...myPlayerDeckDraw];

    setMyPlayerDeckDraw([...draw].slice(5, draw.length - 5));*/

    setMyPlayerDeckDiscard((prev) => [...prev, ...myPlayerDeckOnHand, ]);

    setMyPlayerDeckOnHand([...myPlayerDeckDraw].slice(0,5));
    setMyPlayerDeckDraw([...myPlayerDeckDraw].slice(5));


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
    strongholdPositions,

    myPlayerDeck,
    myPlayerDeckOnHand,
    myPlayerDeckDraw,
    myPlayerDeckDiscard,


    unitData,
    setUnitData
  };


  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}; 