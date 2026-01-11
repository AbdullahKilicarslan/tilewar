import React, { useState, useEffect } from 'react';
import { User, Scroll, Sword, CheckCircle, Circle, Map as MapIcon, Palette } from 'lucide-react';
import './css/MainMenu.css';
import './css/LobbyScreen.css';
import { useScreenContext } from '../../contexts/ScreenContext';
import { useHubContext } from '../../contexts/HubContext';
import { useGameContext } from '../../contexts/GameContext';
import mapGenerate from '../map/tools/mapGenerate';

const LobbyScreen = () => {
    const { OpenMapScreen, isHost } = useScreenContext();
    const { users, hostMapId, setHostMapId, clientMapScreen, myPeerId, handleSendReadyStatus, handleSendMapStatus, handleSendMapScreenStatus, } = useHubContext();
    const { StartGame } = useGameContext();

    const [userName, setUserName] = useState('');
    const [selectedDeck, setSelectedDeck] = useState('1');
    const [selectedColor, setSelectedColor] = useState('#ffffff');
    const [isReady, setIsReady] = useState(false);
    const [isReadyAll, setIsReadyAll] = useState(false);

    // --- HATA GİDERİLEN KISIM: selectedMap State Tanımı ---
    const [selectedMap, setSelectedMap] = useState(1);

    const [hostMapScreen, setHostMapScreen] = useState(false);


    const colorOptions = [
        { name: 'Kraliyet', code: '#8b0000' },
        { name: 'Deniz', code: '#236cb6' },
        { name: 'Orman', code: '#274619' },
        { name: 'Altın', code: '#d4af37' },
        { name: 'Gece', code: '#4b0082' },
    ];

    const maps = [
        { id: 1, name: "Kayıp Vadi", img: "https://picsum.photos/id/10/100/60" },
        { id: 2, name: "Demir Kalesi", img: "https://picsum.photos/id/11/100/60" },
        { id: 3, name: "Buzlu Geçit", img: "https://picsum.photos/id/12/100/60" },
    ];

    useEffect(() => {
        var map = hostMapScreen ? mapGenerate.generateByName("Map" + selectedMap) : null;
      
        if (clientMapScreen || hostMapScreen) //eğer client  ve host ekran açıldıysa 
        {
            OpenMapScreen(); //Oyuncularda ekran açılacak.

            StartGame([{
                id: myPeerId,
                name: userName,
                deck: selectedDeck,
                ready: isReady,
                color: selectedColor
            }], map);
        }
    }, [clientMapScreen, hostMapScreen]);

    useEffect(() => {
        if (users.length > 0)
            setIsReadyAll(users.every(u => u.ready === true) && isReady);
    }, [users, isReady]);

    const handleLobyClick = () => {
        setHostMapScreen(true);//hostta ekran açılacak
        handleSendMapScreenStatus({ type: 'mapScreenStatus', status: true }); // clientlara bildirilcek
    };

    const handleSelectedMap = (mapId) => {
        if (!isHost || isReady) return;
        setSelectedMap(mapId); // Yerel state güncelleme
        setHostMapId(mapId);   // Global/Hub state güncelleme
        handleSendMapStatus({ type: 'mapStatus', selectedMap: mapId });

    };

    const handleUserNameChange = (e) => {
        setUserName(e.target.value)
        handleSendReadyStatus({ type: 'readyStatus', ready: isReady, name: e.target.value, deck: selectedDeck, color: selectedColor });
    };

    const handleColorChange = (color) => {
        if (isReady || isColorTaken(color)) return;
        setSelectedColor(color);
        handleSendReadyStatus({ type: 'readyStatus', ready: isReady, name: userName, deck: selectedDeck, color: color });
    };

    const handleDeckChange = (e) => {
        const newDeck = e.target.value;
        setSelectedDeck(newDeck);
        handleSendReadyStatus({ type: 'readyStatus', ready: isReady, name: userName, deck: newDeck, color: selectedColor });
    };

    const userReady = () => {
        handleSendReadyStatus({ type: 'readyStatus', ready: !isReady, name: userName, deck: selectedDeck, color: selectedColor });
        setIsReady(!isReady);
    };

    const isColorTaken = (colorCode) => {
        // Diğer oyuncuların (users) bu rengi seçip seçmediğine bak
        return users?.some(u => u.color === colorCode);
    };
    return (
        <div className="menu-container">
            <div className="lobby-wrapper">
                <div className="main-lobby-card">
                    <h1 className="lobby-title">TILE WAR</h1>

                    <div className="map-container">
                        <span className="map-label"><MapIcon size={16} /> SAVAŞ ALANI</span>
                        <div className="map-selector">
                            {maps.map(map => (
                                <div
                                    key={map.id}
                                    className={`map-item ${(isHost ? selectedMap : hostMapId) === map.id ? 'active' : ''}`}
                                    onClick={() => handleSelectedMap(map.id)}
                                >
                                    <img src={map.img} alt={map.name} />
                                    <div className="map-name">{map.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="form-section">
                        <div className="medieval-input-wrap">
                            <User size={18} color="#8b4513" />
                            <input className="m-input" placeholder="Karakter İsmi..." value={userName}
                                onChange={(e) => handleUserNameChange(e)} disabled={isReady} />
                        </div>

                        <div className="medieval-input-wrap">
                            <Scroll size={18} color="#8b4513" />
                            <select className="m-input" disabled={isReady} value={selectedDeck} onChange={handleDeckChange}>
                                <option value="1">Deste: Kuzey Krallığı</option>
                                <option value="2">Deste: Barbar İstilası</option>
                                <option value="3">Deste: Gölge Alayı</option>
                            </select>
                        </div>

                        <div className="color-selector-wrapper">
                            <span className="color-label"><Palette size={16} /> SANCAK RENGİ</span>
                            <div className="color-options">
                                {colorOptions.map(c => {
                                    const taken = isColorTaken(c.code);
                                    return (
                                        <div
                                            key={c.code}
                                            className={`color-dot 
                                                        ${selectedColor === c.code ? 'active' : ''} 
                                                        ${(isReady || taken) ? 'disabled' : ''} 
                                                        ${taken ? 'taken' : ''}`} // Alınmış renk için yeni class
                                            style={{ backgroundColor: c.code }}
                                            onClick={() => handleColorChange(c.code)}
                                            title={taken ? "Bu sancak başka bir oyuncu tarafından çekildi!" : c.name}
                                        />
                                    );
                                })}
                            </div>
                        </div>

                        <button className={`ready-toggle-btn ${isReady ? 'is-ready' : ''}`} onClick={userReady}>
                            {isReady ? "ORDUYU DURDUR (İptal)" : "MÜHRÜ BAS & HAZIR OL"}
                        </button>
                    </div>

                    <div className="lobby-player-list">
                        <p className="list-title">MÜTTEFİKLER VE DÜŞMANLAR</p>

                        {users?.map(p => (
                            <div className="p-row" key={p.id}>
                                <div className="p-info">
                                    <div className="p-color-indicator" style={{ backgroundColor: p.color || '#ccc' }} />
                                    <span className="p-name">{p.name || 'İsimsiz'}</span>
                                    <span className="deck-tag">[{p.deck}]</span>
                                </div>
                                <div className={`p-status ${p.ready ? 'ready' : ''}`}>
                                    {p.ready ? <CheckCircle size={14} /> : <Circle size={14} />}
                                    {p.ready ? 'HAZIR' : 'BEKLİYOR'}
                                </div>
                            </div>
                        ))}

                        <div className="p-row current-user">
                            <div className="p-info">
                                <div className="p-color-indicator" style={{ backgroundColor: selectedColor }} />
                                <span className="p-name">Sen: {userName || 'Oyuncu'}</span>
                                <span className="deck-tag">[{selectedDeck}]</span>
                            </div>
                            <div className={`p-status ${isReady ? 'ready' : ''}`}>
                                {isReady ? <CheckCircle size={14} /> : <Circle size={14} />}
                                {isReady ? 'HAZIR' : 'BEKLİYOR'}
                            </div>
                        </div>
                    </div>

                    {isHost && (
                        <button onClick={handleLobyClick} className="war-btn" disabled={!isReadyAll}>
                            <Sword size={24} /> SAVAŞI BAŞLAT
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LobbyScreen;