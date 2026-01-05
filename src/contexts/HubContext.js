import { createContext, useContext, useState,useRef } from 'react';
import Peer from 'peerjs';
// Context oluştur
const HubContext = createContext();

// Custom hook - her yerden kolayca kullanmak için
export const useHubContext = () => {
  const context = useContext(HubContext);
  if (!context) {
    throw new Error('useHubContext must be used within AppProvider');
  }
  return context;
};

// Provider component
export const HubProvider = ({ children }) => {


  const [peer, setPeer] = useState(null);
  const [hostId, setHostId] = useState('');
  const [connections, setConnections] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [targetId, setTargetId] = useState('');
  const [copied, setCopied] = useState(false);
  const connectionsRef = useRef({});


  const hostToPeer = () => {

    const newPeer = new Peer();

    newPeer.on('open', (id) => {
      setHostId(id);
    });

    // Gelen bağlantıları dinle
    newPeer.on('connection', (conn) => {
      setupConnection(conn);
    });

    newPeer.on('error', (err) => {
      console.error('Peer hatası:', err);
     // addMessage('Sistem', `Hata: ${err.type}`);
    });

    setPeer(newPeer);

    return () => {
      Object.values(connectionsRef.current).forEach(conn => conn.close());
      newPeer.destroy();
    };
  }

  const setupConnection = (conn) => {
    conn.on('open', () => {
      const peerId = conn.peer;
      connectionsRef.current[peerId] = conn;
      setConnections(prev => [...prev.filter(id => id !== peerId), peerId]);
     // addMessage('Sistem', `${peerId.substring(0, 8)} bağlandı`);
    });

    conn.on('data', (data) => {
    //  addMessage(conn.peer.substring(0, 8), data);
    });

    conn.on('close', () => {
      const peerId = conn.peer;
      delete connectionsRef.current[peerId];
      setConnections(prev => prev.filter(id => id !== peerId));
    //  addMessage('Sistem', `${peerId.substring(0, 8)} bağlantıyı kapattı`);
    });

    conn.on('error', (err) => {
      console.error('Bağlantı hatası:', err);
    });
  };


  const value = {
    hostToPeer,
    hostId
  };

  return (
    <HubContext.Provider value={value}>
      {children}
    </HubContext.Provider>
  );
};