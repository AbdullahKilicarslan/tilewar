import React, { useState } from 'react';
import { Shield, User, Scroll, Sword, CheckCircle, Circle, Map as MapIcon } from 'lucide-react';
import './css/MainMenu.css';
import './css/LobbyScreen.css';

const Lobby = () => {
    const [selectedMap, setSelectedMap] = useState(1);
    const [isReady, setIsReady] = useState(false);

    // Harita Verileri
    const maps = [
        { id: 1, name: "Kayıp Vadi", img: "https://picsum.photos/id/10/100/60" },
        { id: 2, name: "Demir Kalesi", img: "https://picsum.photos/id/11/100/60" },
        { id: 3, name: "Buzlu Geçit", img: "https://picsum.photos/id/12/100/60" },
    ];

    const [otherPlayers] = useState([
        { id: 1, name: "Kral_Arthur", deck: "Kuzey Krallığı", ready: true },
        { id: 2, name: "Mordred_66", deck: "Barbar İstilası", ready: false },
    ]);

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
                                    className={`map-item ${selectedMap === map.id ? 'active' : ''}`}
                                    onClick={() => !isReady && setSelectedMap(map.id)} // Hazırken harita değiştirilemez
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
                            <input className="m-input" placeholder="Karakter İsmi..." disabled={isReady} />
                        </div>
                        <div className="medieval-input-wrap">
                            <Scroll size={18} color="#8b4513" />
                            <select className="m-input" disabled={isReady}>
                                <option>Deste: Kuzey Krallığı</option>
                                <option>Deste: Barbar İstilası</option>
                                <option>Deste: Gölge Alayı</option>
                            </select>
                        </div>

                        <button
                            className={`ready-toggle-btn ${isReady ? 'is-ready' : ''}`}
                            onClick={() => setIsReady(!isReady)}
                        >
                            {isReady ? "ORDUYU DURDUR (İptal)" : "MÜHRÜ BAS & HAZIR OL"}
                        </button>
                    </div>

                    {/* Oyuncu Listesi */}
                    <div className="lobby-player-list">
                        <p style={{ color: '#d4af37', fontSize: '0.7rem', letterSpacing: '2px', marginBottom: '8px', textAlign: 'center' }}>MÜTTEFİKLER VE DÜŞMANLAR</p>

                        {otherPlayers.map(p => (
                            <div className="p-row" key={p.id}>
                                <div>
                                    <span style={{ fontWeight: 'bold' }}>{p.name}</span>
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
                                <span style={{ fontWeight: 'bold', color: '#fff' }}>Sen</span>
                                <span className="deck-info">[Seçili Deste]</span>
                            </div>
                            <span style={{ color: isReady ? '#4caf50' : '#d4af37', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                {isReady ? <CheckCircle size={14} /> : <Circle size={14} />} {isReady ? 'HAZIR' : 'BEKLİYOR'}
                            </span>
                        </div>
                    </div>

                    {/* Ana Savaş Butonu */}
                    <button
                        className="war-btn"
                        disabled={!isReady}
                        style={{
                            opacity: isReady ? 1 : 0.3,
                            filter: isReady ? 'none' : 'grayscale(1)',
                            cursor: isReady ? 'pointer' : 'not-allowed'
                        }}
                    >
                        <Sword size={24} style={{ marginRight: '12px' }} />
                        SAVAŞI BAŞLAT
                    </button>

                    {/* Dekoratif Köşeler */}
                    <div style={{ position: 'absolute', top: '15px', left: '15px', color: '#d4af37', opacity: 0.5, pointerEvents: 'none' }}>✦</div>
                    <div style={{ position: 'absolute', top: '15px', right: '15px', color: '#d4af37', opacity: 0.5, pointerEvents: 'none' }}>✦</div>
                </div>
            </div></div>
    );
};

export default Lobby;