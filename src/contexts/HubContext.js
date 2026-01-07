import React, { useEffect, useState, createContext, useContext } from 'react';
import { joinRoom } from 'trystero';

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
  const [hostMapId, setHostMapId] = useState(null);
  const [clientMapScreen, setClientMapScreen] = useState(false);

  const [room, setRoom] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [peers, setPeers] = useState([]);
  const [users, setUsers] = useState([]);



  const generateGuid = () => {
    return Math.random().toString(36).substring(2, 6).toUpperCase() + "-" + Math.random().toString(36).substring(2, 6).toUpperCase();
  };
  const connectRoom = (newHostId = null) => {
    if (!newHostId)
      newHostId = generateGuid();
    setHostId(newHostId);

    const myRoom = joinRoom(config, newHostId);

    // 2. Mesaj gönderme/alma fonksiyonlarını tanımla
    const [sendMessage, receiveMessage] = myRoom.makeAction('chat');

    // Gelen mesajları dinle
    receiveMessage((data, peerId) => {
      setMessages((prev) => [...prev, { sender: peerId.substring(0, 5), text: data }]);

      if (data && data.type === 'readyStatus') {
        // Burada doğrudan users kullanmak yerine prevUsers (en güncel hali) kullanıyoruz
        setUsers((prevUsers) => {
          return prevUsers.map(user => {
            if (user.id === peerId) {
              return {
                ...user,
                name: data.name,
                deck: data.deck,
                ready: data.ready
              };
            }
            return user;
          });
        });
      }

      if (data && data.type === 'mapStatus') {
        setHostMapId(data.selectedMap);
      }
      if (data && data.type === 'mapScreenStatus') {
        setClientMapScreen(data.status);
      }
    });

    // 3. Yeni bir eş (peer) bağlandığında veya ayrıldığında
    myRoom.onPeerJoin((peerId) => {
      setPeers((prev) => [...prev, peerId]);
      setUsers((prev) => [...prev, { id: peerId, name: null, deck: 'Standart', ready: false }]);
    });

    myRoom.onPeerLeave((peerId) => {
      setPeers((prev) => prev.filter((p) => p !== peerId));
      setUsers((prev) => prev.filter((p) => p.id !== peerId));
    });

    setRoom({ sendMessage });
  }



  const handleSend = (text) => {
    if (room && text) {
      room.sendMessage(text); // Odadaki herkese gönderir
      setMessages((prev) => [...prev, { sender: 'Ben', text: text }]);
      setMessage('');
    }
  };

  const value = {
    connectRoom,
    hostId,
    handleSend,
    users,
    hostMapId,
    setHostMapId,
    clientMapScreen
  };

  return (
    <HubContext.Provider value={value}>
      {children}
    </HubContext.Provider>
  );
};