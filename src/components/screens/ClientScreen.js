import React, { useState,useEffect } from 'react';
import { Link2, ShieldCheck, TowerControl as Tower } from 'lucide-react';
import './css/ClientScreen.css';
import { useScreenContext } from '../../contexts/ScreenContext';
import { useHubContext } from '../../contexts/HubContext';

const ConnectionScreen = () => {
    const { OpenLobbyScreen ,setIsHost} = useScreenContext();
    const {  hostId, connectRoom  } = useHubContext();


    const [connectionId, setConnectionId] = useState('');

    useEffect(() => {
        setIsHost(false);
    }, []);

    const handleConnect = () => {
        if (connectionId.length > 0) {
            if (hostId == '') {
                alert("Sunucu bağlantısı tekrar kuruluyor, lütfen tekrar deneyin.");
            }
            else {
               connectRoom(connectionId);
                OpenLobbyScreen();
            }
        } else {
            alert("Lütfen geçerli bir Diyar Kimliği (ID) girin!");
        }
    };

    return (
        <div className="connection-wrapper">
            <div className="connection-card">
                <h1 className="connection-title">TILE WAR</h1>
                <p className="connection-subtitle">Diyara Bağlanmak İçin Mührünü Bas</p>

                <div className="id-input-group">
                    <label className="id-label">
                        <Link2 size={16} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                        DİYAR KİMLİĞİ (CONNECTION ID)
                    </label>
                    <input
                        className="medieval-id-input"
                        placeholder="XXXX-XXXX"
                        value={connectionId}
                        onChange={(e) => setConnectionId(e.target.value.toUpperCase())}
                        maxLength={36}
                    />
                </div>

                <button className="connect-btn" onClick={handleConnect}>
                    <Tower size={18} style={{ marginRight: '10px', verticalAlign: 'middle' }} />
                    KALE KAPISINI AÇ
                </button>

                <div style={{ marginTop: '1.5rem', opacity: 0.6, fontSize: '0.8rem' }}>
                    <ShieldCheck size={14} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                    Güvenli bağlantı sağlandı.
                </div>
            </div>
        </div>
    );
};

export default ConnectionScreen;