import React, { useEffect, useState, createContext, useContext } from 'react';
import { joinRoom, selfId } from 'trystero';
import { useGameContext } from './GameContext';

const config = { appId: 'tilewar-ersdfsdf34sdf' };
const HubContext = createContext();

// Custom hook - her yerden kolayca kullanmak için
export const useHubContext = () => {
  const context = useContext(HubContext);
  if (!context) {
    throw new Error('useHubContext must be used within AppProvider');
  }
  return context;
};

export const HubProvider = ({ children }) => {



  const [hostId, setHostId] = useState(null);
  const [myPeerId, setMyPeerId] = useState(null);
  const [hostMapId, setHostMapId] = useState(null);
  const [clientMapScreen, setClientMapScreen] = useState(false);

  const [room, setRoom] = useState(null);
  const [users, setUsers] = useState([]);


  //useEffect(() => { setMyPeerId(selfId); }, [selfId]);

  const [activePlayerIdHub, setActivePlayerIdHub] = useState('');
  const [strongholdPositionsHub, setStrongholdPositionsHub] = useState([]);


  const generateGuid = () => {
    return Math.random().toString(36).substring(2, 6).toUpperCase() + "-" + Math.random().toString(36).substring(2, 6).toUpperCase();
  };
  const connectRoom = (newHostId = null) => {
    if (!newHostId)
      newHostId = generateGuid();
    setHostId(newHostId);

    const myRoom = joinRoom(config, newHostId);

    setMyPeerId(selfId);

    const [sendMessage, receiveMessage] = myRoom.makeAction('chat');
    // Gelen mesajları dinle
    receiveMessage((data, peerId) => {
    });


    const [sendMessageReadyStatus, receiveMessageReadyStatus] = myRoom.makeAction('readyStatus');
    const [sendMessageMapStatus, receiveMessageMapStatus] = myRoom.makeAction('mapStatus');
    const [sendMessageMapScreenStatus, receiveMessageMapScreenStatus] = myRoom.makeAction('screenStatus');
    const [sendMessageGameStatus, receiveMessageGameStatus] = myRoom.makeAction('GameStatus');



    //readyStatus
    receiveMessageReadyStatus((data, peerId) => {
      setUsers((prevUsers) => {
        return prevUsers.map(user => {
          if (user.id === peerId) {
            return {
              ...user,
              name: data.name,
              deck: data.deck,
              ready: data.ready,
              color: data.color
            };
          }
          return user;
        });
      });

    });

    //mapStatus
    receiveMessageMapStatus((data, peerId) => {
      setHostMapId(data.selectedMap);
    });

    //mapScreenStatus
    receiveMessageMapScreenStatus((data, peerId) => {
      setClientMapScreen(data.status);
    });

    receiveMessageGameStatus((data, peerId) => {
      console.log('Hub: Mesaj geldi:', data);
      if (data.type === 'activePlayer') {
        setActivePlayerIdHub(data);
      }
      if (data.type === 'StrongholdPositions') {
        setStrongholdPositionsHub(data);
      }
    });

    // 3. Yeni bir eş (peer) bağlandığında veya ayrıldığında
    myRoom.onPeerJoin((peerId) => {
      setUsers((prev) => [...prev, { id: peerId, name: 'Yeni Oyuncu...', deck: 'Standart', ready: false }]);
    });

    myRoom.onPeerLeave((peerId) => {
      setUsers((prev) => prev.filter((p) => p.id !== peerId));
    });

    setRoom({ sendMessage, sendMessageReadyStatus, sendMessageMapStatus, sendMessageMapScreenStatus, sendMessageGameStatus });
  }

  const handleSend = (msg) => {
    if (room && msg) {
      room.sendMessage({ ...msg, sentAt: Date.now() });
    }
  };
  const handleSendReadyStatus = (msg) => {
    if (room && msg) {
      room.sendMessageReadyStatus({ ...msg, sentAt: Date.now() });
    }
  };
  const handleSendMapStatus = (msg) => {
    if (room && msg) {
      room.sendMessageMapStatus({ ...msg, sentAt: Date.now() });
    }
  };
  const handleSendMapScreenStatus = (msg) => {
    if (room && msg) {
      room.sendMessageMapScreenStatus({ ...msg, sentAt: Date.now() });
    }
  };
  const handleSendGameStatus = (msg) => {
    if (room && msg) {
      room.sendMessageGameStatus({ ...msg, sentAt: Date.now() });
    }
  };
  const value = {
    handleSend,
    handleSendReadyStatus,
    handleSendMapStatus,
    handleSendMapScreenStatus,
    handleSendGameStatus,

    connectRoom,
    hostId,
    users,
    hostMapId,
    setHostMapId,
    clientMapScreen,
    myPeerId,


    activePlayerIdHub,
    strongholdPositionsHub
  };

  return (
    <HubContext.Provider value={value}>
      {children}
    </HubContext.Provider>
  );
};