import { useState, useEffect, useRef } from 'react';
import * as React from 'react';

import Peer from 'peerjs';
import { Users, Send, Copy, Check } from 'lucide-react';

import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Button, Box, Stack, Typography, ButtonBase } from '@mui/material';

import { useAppContext } from '../../contexts/AppContext';
import { useScreenContext } from '../../contexts/ScreenContext';


import Bg1 from '../../assets/bg/bg-1.png';
import BgBt from '../../assets/bg/bg-bt.png';
import BgPeerr from '../../assets/bg/bg-peer.png';

const MainHub = () => {

  const { setGameScreen, setTrigger } = useAppContext();


  const [peer, setPeer] = useState(null);
  const [myId, setMyId] = useState('');
  const [connections, setConnections] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [targetId, setTargetId] = useState('');
  const [copied, setCopied] = useState(false);
  const connectionsRef = useRef({});


  const [isHost, setIsHost] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  const [bgImage, setBgImage] = useState(Bg1);

  const ImageButton = ({ title, url, onClick, height = '70px', width = '200px' }) => (
    <ButtonBase
      focusRipple
      onClick={onClick}
      style={{
        width: width,
        height: height,
        position: 'relative',
      }}
    >
      {/* Arka Plan Görseli */}
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          backgroundImage: `url(${url})`,
          borderRadius: '8px',
          '&:hover': {
            opacity: 0.8, // Üzerine gelince kararma efekti
          }
        }}
      />
      {/* Görsel Üzerindeki Yazı */}
      <Typography
        component="span"
        variant="subtitle1"
        color="inherit"
        sx={{
          position: 'relative',
          p: 4,
          pt: 2,
          pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
          color: 'white',
          fontWeight: 'bold',
          //backgroundColor: 'rgba(0,0,0,0.3)', // Yazının okunması için hafif gölge
        }}
      >
        {title}
      </Typography>
    </ButtonBase>
  );

  const hostToPeer = () => {

    const newPeer = new Peer();

    newPeer.on('open', (id) => {
      setMyId(id);
      console.log('Benim ID\'m:', id);
    });

    // Gelen bağlantıları dinle
    newPeer.on('connection', (conn) => {
      setupConnection(conn);
    });

    newPeer.on('error', (err) => {
      console.error('Peer hatası:', err);
      addMessage('Sistem', `Hata: ${err.type}`);
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
      addMessage('Sistem', `${peerId.substring(0, 8)} bağlandı`);
    });

    conn.on('data', (data) => {
      addMessage(conn.peer.substring(0, 8), data);
    });

    conn.on('close', () => {
      const peerId = conn.peer;
      delete connectionsRef.current[peerId];
      setConnections(prev => prev.filter(id => id !== peerId));
      addMessage('Sistem', `${peerId.substring(0, 8)} bağlantıyı kapattı`);
    });

    conn.on('error', (err) => {
      console.error('Bağlantı hatası:', err);
    });
  };

  const connectToPeer = () => {
    if (!targetId.trim() || !peer) return;

    setTrigger(targetId);

    if (targetId === myId) {
      addMessage('Sistem', 'Kendinize bağlanamazsınız!');
      return;
    }

    if (connectionsRef.current[targetId]) {
      addMessage('Sistem', 'Bu peer\'e zaten bağlısınız!');
      return;
    }

    const conn = peer.connect(targetId);
    setupConnection(conn);
    setTargetId('');
  };

  const sendMessage = () => {
    if (!message.trim()) return;

    const connArray = Object.values(connectionsRef.current);

    if (connArray.length === 0) {
      addMessage('Sistem', 'Hiçbir peer\'e bağlı değilsiniz!');
      return;
    }

    connArray.forEach(conn => {
      conn.send(message);
    });

    addMessage('Ben', message);
    setMessage('');
  };

  const addMessage = (sender, text) => {
    setMessages(prev => [...prev, { sender, text, time: new Date().toLocaleTimeString('tr-TR') }]);
  };

  const copyId = () => {
    navigator.clipboard.writeText(myId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };


  const OpenGameScreen = () => {
    setGameScreen(true);
  }



  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth={false} sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        // State bazlı dinamik arka plan ayarları
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-image 0.5s ease-in-out', // Geçiş efekti
      }}>
        {isLogin ?
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"

          // Arka plan rengini opsiyonel olarak ekledim
          >
            <ImageButton title={"Oyun Kur"} url={BgBt} onClick={() => { setIsHost(true); setIsLogin(false) }}></ImageButton>
            <ImageButton title={"Oyuna Gir"} url={BgBt} onClick={() => { setIsHost(false); setIsLogin(false) }}></ImageButton>

          </Box>
          : isHost ?
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="100vh"

            // Arka plan rengini opsiyonel olarak ekledim
            >
              <Grid container spacing={2}>
                <Grid size={12} align="center">
                  <ImageButton title={"Sunucuya Bağlan"} url={BgBt} onClick={() => { hostToPeer() }}></ImageButton>

                </Grid>
                <Grid size={12} align="center">

                  <ImageButton title={myId} url={BgPeerr} width='300px' height='150px' ></ImageButton>

                  <ImageButton title={myId} url={BgBt} onClick={() => { setGameScreen(true) }} ></ImageButton>

                </Grid>
              </Grid>
            </Box>

            : <Container >
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid size={8}>
                    8
                  </Grid>
                  <Grid size={4}>
                    4
                  </Grid>
                  <Grid size={12}>
                    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
                      <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                          {/* Header */}
                          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
                            <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
                              <Users size={28} />
                              PeerJS Çoklu Tarayıcı Chat
                            </h1>
                            <div className="bg-white/20 rounded-lg p-3 mt-3">
                              <p className="text-sm mb-1 opacity-90">Benim ID'im:</p>
                              <div className="flex items-center gap-2">
                                <code className="text-sm font-mono bg-black/20 px-3 py-1 rounded flex-1 truncate">
                                  {myId || 'Yükleniyor...'}
                                </code>
                                <button
                                  onClick={copyId}
                                  className="bg-white/20 hover:bg-white/30 p-2 rounded transition-colors"
                                  disabled={!myId}
                                >
                                  {copied ? <Check size={18} /> : <Copy size={18} />}
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Connection Section */}
                          <div className="p-6 bg-gray-50 border-b">
                            <h2 className="text-lg font-semibold mb-3">Peer'e Bağlan</h2>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={targetId}
                                onChange={(e) => setTargetId(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && connectToPeer()}
                                placeholder="Peer ID girin"
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                              <button
                                onClick={connectToPeer}
                                disabled={!targetId.trim() || !peer}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
                              >
                                Bağlan
                              </button>
                            </div>

                            {/* Connected Peers */}
                            <div className="mt-4">
                              <p className="text-sm text-gray-600 mb-2">
                                Bağlı Peer'ler ({connections.length}):
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {connections.length === 0 ? (
                                  <span className="text-gray-400 text-sm">Henüz bağlı peer yok</span>
                                ) : (
                                  connections.map((id) => (
                                    <span
                                      key={id}
                                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-mono"
                                    >
                                      {id.substring(0, 8)}...
                                    </span>
                                  ))
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Messages */}
                          <div className="h-96 overflow-y-auto p-6 bg-white">
                            {messages.length === 0 ? (
                              <div className="text-center text-gray-400 mt-20">
                                <p>Henüz mesaj yok</p>
                                <p className="text-sm mt-2">Başka bir tarayıcıda bu sayfayı açın ve ID'nizi paylaşın</p>
                              </div>
                            ) : (
                              <div className="space-y-3">
                                {messages.map((msg, idx) => (
                                  <div
                                    key={idx}
                                    className={`flex ${msg.sender === 'Ben' ? 'justify-end' : 'justify-start'}`}
                                  >
                                    <div
                                      className={`max-w-xs px-4 py-2 rounded-lg ${msg.sender === 'Ben'
                                        ? 'bg-blue-600 text-white'
                                        : msg.sender === 'Sistem'
                                          ? 'bg-gray-200 text-gray-700 italic'
                                          : 'bg-gray-100 text-gray-800'
                                        }`}
                                    >
                                      <p className="text-xs opacity-70 mb-1">
                                        {msg.sender} • {msg.time}
                                      </p>
                                      <p className="break-words">{msg.text}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Input */}
                          <div className="p-6 bg-gray-50 border-t">
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                placeholder="Mesajınızı yazın..."
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                              <button
                                onClick={sendMessage}
                                disabled={!message.trim() || connections.length === 0}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                              >
                                <Send size={18} />
                                Gönder
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Instructions */}
                        <div className="mt-4 bg-white rounded-lg shadow p-4 text-sm text-gray-600">
                          <p className="font-semibold mb-2">Nasıl Kullanılır:</p>
                          <ol className="list-decimal list-inside space-y-1">
                            <li>Bu sayfayı birden fazla tarayıcı sekmesinde açın</li>
                            <li>Birinci sekmedeki ID'yi kopyalayın (Copy butonuna tıklayın)</li>
                            <li>İkinci sekmede, kopyaladığınız ID'yi yapıştırıp "Bağlan" butonuna tıklayın</li>
                            <li>Artık sekmeler arası mesajlaşabilirsiniz!</li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </Grid>

                </Grid>
              </Box>
            </Container>


        }
      </Container>
    </React.Fragment>


  );
}

export default MainHub;