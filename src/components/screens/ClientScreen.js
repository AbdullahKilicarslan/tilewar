import React, { useState, useEffect } from 'react';
import { Link2, ShieldCheck, TowerControl as Tower } from 'lucide-react';
import './css/ClientScreen.css';
import { useScreenContext } from '../../contexts/ScreenContext';
import { useHubContext } from '../../contexts/HubContext';

const ConnectionScreen = () => {
    const { OpenLobbyScreen, setIsHost } = useScreenContext();
    const { hostId, connectRoom } = useHubContext();
    const [connectionId, setConnectionId] = useState('');

    useEffect(() => {
        setIsHost(false);
    }, []);

    const handleConnect = () => {
        if (connectionId.length > 0) {
            if (hostId === '') {
                alert("Sunucu bağlantısı tekrar kuruluyor, lütfen tekrar deneyin.");
            } else {
                connectRoom(connectionId);
                OpenLobbyScreen();
            }
        } else {
            alert("Lütfen geçerli bir Diyar Kimliği (ID) girin!");
        }
    };

    return (
        <div className="connection-wrapper">
            <div className="main-card shield-card">
                <h1 className="game-title">KADİM TOPRAKLAR</h1>
                <div className="title-underline"></div>
                
                <p className="connection-subtitle">Diyara Bağlanmak İçin Mührünü Bas</p>

                <div className="id-input-group">
                    <label className="id-label">
                        <Link2 size={16} className="label-icon" />
                        DİYAR KİMLİĞİ
                    </label>
                    <input
                        className="medieval-id-input"
                        placeholder="XXXX-XXXX"
                        value={connectionId}
                        onChange={(e) => setConnectionId(e.target.value.toUpperCase())}
                        maxLength={36}
                    />
                </div>

                <button className="medieval-btn connect-btn-shield" onClick={handleConnect}>
                    <Tower size={24} className="btn-icon" />
                    <span>KALE KAPISINI AÇ</span>
                </button>

                <div className="security-note">
                    <ShieldCheck size={14} />
                    <span>Güvenli bağlantı sağlandı</span>
                </div>

                <div className="wax-seal">T&W</div>
            </div>
        </div>
    );
};

export default ConnectionScreen;