import React, { useState, useEffect } from 'react';
import { Shield, User, Scroll, Sword, CheckCircle, Circle, Map as MapIcon } from 'lucide-react';
import './css/MainMenu.css';
import './css/LobbyScreen.css';
import { useScreenContext } from '../../contexts/ScreenContext';
import { useHubContext } from '../../contexts/HubContext';

const Lobby = () => {

    const { OpenMapScreen, isHost } = useScreenContext();
    const { hostId, handleSend, users, hostMapId, setHostMapId, clientMapScreen } = useHubContext();

    const handleLobyClick = () => {
        OpenMapScreen();
        handleSend({ type: 'mapScreenStatus', status: true });
    };

    const [userName, setUserName] = useState('');
    const [selectedDeck, setSelectedDeck] = useState('Kuzey Krallığı');

    const [selectedMap, setSelectedMap] = useState(1);
    const [isReady, setIsReady] = useState(false);
    const [isReadyAll, setIsReadyAll] = useState(false);


    useEffect(() => {
        if (clientMapScreen)
            OpenMapScreen();
    }, [clientMapScreen]);

    useEffect(() => {
        if (users.length > 0)
            setIsReadyAll(users.every(u => u.ready === true) && isReady);
    }, [users, isReady]);

    const handleSelectedMap = (e) => {
        setSelectedMap(e);
        setHostMapId(e);
        // Değişikliği diğer oyunculara bildir (HubContext'teki handleSend'i kullanır)  
        handleSend({ type: 'mapStatus', selectedMap: e });
    };


    const handleDeckChange = (e) => {
        const newDeck = e.target.value;
        setSelectedDeck(newDeck);

        // Değişikliği diğer oyunculara bildir (HubContext'teki handleSend'i kullanır)
        handleSend({ type: 'readyStatus', ready: isReady, name: userName, deck: newDeck });
    };

    const userReady = () => {
        handleSend({ type: 'readyStatus', ready: !isReady, name: userName, deck: selectedDeck });
        setIsReady(!isReady)
    }

    // Harita Verileri
    const maps = [
        { id: 1, name: "Kayıp Vadi", img: "https://picsum.photos/id/10/100/60" },
        { id: 2, name: "Demir Kalesi", img: "https://picsum.photos/id/11/100/60" },
        { id: 3, name: "Buzlu Geçit", img: "https://picsum.photos/id/12/100/60" },
    ];


    return (
        <div className="menu-container">
            <div className="lobby-wrapper">
                <div className="main-lobby-card">
                    <h1 className="lobby-title">TILE WAR</h1>

                    {/* Harita Seçimi */}
                    <div className="map-container">
                        <span className="map-label"><MapIcon size={16} style={{ verticalAlign: 'middle', marginRight: '5px' }} /> SAVAŞ ALANI</span>
                        <div className="map-selector">
                            {maps.map(map => (
                                <div
                                    key={map.id}
                                    className={`map-item ${hostMapId === map.id ? 'active' : ''}`}
                                    onClick={() => isHost && !isReady && handleSelectedMap(map.id)} // Hazırken harita değiştirilemez
                                >
                                    <img src={map.img} alt={map.name} />
                                    <div className="map-name">{map.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Girişler ve Hazır Butonu */}
                    <div className="form-section">
                        <div className="medieval-input-wrap">
                            <User size={18} color="#8b4513" />
                            <input className="m-input" placeholder="Karakter İsmi..." value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                disabled={isReady} />
                        </div>
                        <div className="medieval-input-wrap">
                            <Scroll size={18} color="#8b4513" />
                            <select
                                className="m-input"
                                disabled={isReady}
                                value={selectedDeck} // State'ten oku
                                onChange={handleDeckChange} // Değişince state'i ve odayı güncelle
                            >
                                <option value="Kuzey Krallığı">Deste: Kuzey Krallığı</option>
                                <option value="Barbar İstilası">Deste: Barbar İstilası</option>
                                <option value="Gölge Alayı">Deste: Gölge Alayı</option>
                            </select>
                        </div>

                        <button
                            className={`ready-toggle-btn ${isReady ? 'is-ready' : ''}`}
                            onClick={() => userReady()}
                        >
                            {isReady ? "ORDUYU DURDUR (İptal)" : "MÜHRÜ BAS & HAZIR OL"}
                        </button>
                    </div>

                    {/* Oyuncu Listesi */}
                    <div className="lobby-player-list">
                        <p style={{ color: '#d4af37', fontSize: '0.7rem', letterSpacing: '2px', marginBottom: '8px', textAlign: 'center' }}>MÜTTEFİKLER VE DÜŞMANLAR</p>

                        {users?.map(p => (
                            <div className="p-row" key={p.id}>
                                <div>
                                    <span style={{ fontWeight: 'bold' }}>{p.name ?? 'İsim bekleniyor...'}</span>
                                    <span className="deck-info">[{p.deck}]</span>
                                </div>
                                <span style={{ color: p.ready ? '#4caf50' : '#d4af37', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    {p.ready ? <CheckCircle size={14} /> : <Circle size={14} />} {p.ready ? 'HAZIR' : 'BEKLİYOR'}
                                </span>
                            </div>
                        ))}

                        {/* Mevcut Kullanıcı (Sen) */}
                        <div className="p-row" style={{ borderLeft: '3px solid #d4af37', background: 'rgba(212,175,55,0.1)' }}>
                            <div>
                                <span style={{ fontWeight: 'bold', color: '#fff' }}>Sen:{userName}</span>
                                <span className="deck-info">[{selectedDeck}]</span>
                            </div>
                            <span style={{ color: isReady ? '#4caf50' : '#d4af37', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                {isReady ? <CheckCircle size={14} /> : <Circle size={14} />} {isReady ? 'HAZIR' : 'BEKLİYOR'}
                            </span>
                        </div>
                    </div>

                    {/* Ana Savaş Butonu */}
                    {isHost && <button onClick={() => handleLobyClick()}
                        className="war-btn"
                        disabled={!isReadyAll}
                        style={{
                            opacity: isReadyAll ? 1 : 0.3,
                            filter: isReadyAll ? 'none' : 'grayscale(1)',
                            cursor: isReadyAll ? 'pointer' : 'not-allowed'
                        }}
                    >
                        <Sword size={24} style={{ marginRight: '12px' }} />
                        SAVAŞI BAŞLAT
                    </button>}

                    {/* Dekoratif Köşeler */}
                    <div style={{ position: 'absolute', top: '15px', left: '15px', color: '#d4af37', opacity: 0.5, pointerEvents: 'none' }}>✦</div>
                    <div style={{ position: 'absolute', top: '15px', right: '15px', color: '#d4af37', opacity: 0.5, pointerEvents: 'none' }}>✦</div>
                </div>
            </div></div>
    );
};

export default Lobby;