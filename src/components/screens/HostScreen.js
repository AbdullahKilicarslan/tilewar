import React from 'react';
import { useState, useEffect, useRef } from 'react';

import { HousePlug } from 'lucide-react';
import './css/HostMenu.css';
import './css/MainMenu.css';
import { useScreenContext } from '../../contexts/ScreenContext';
import { useHubContext } from '../../contexts/HubContext';

const HostScreen = () => {
    const { OpenLobbyScreen } = useScreenContext();
    const { connectRoom, hostId } = useHubContext();


    const [connectPeer, setConnectPeer] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleHostClick = () => {
        connectRoom();
    }
    useEffect(() => {
        copyId();
    }, [hostId]);
    
    const copyId = () => {
        navigator.clipboard.writeText(hostId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    const handleLobyClick = () => {
        OpenLobbyScreen();
    };
    return (
        <div className="menu-container">
            <div className="main-card">
                {/* Dekoratif Köşeler */}
                <div className="corner top-left"></div>
                <div className="corner top-right"></div>

                <h1 className="game-title">TILE WAR</h1>
                <div className="title-underline"></div>

                <div className="menu-options">
                    <button className="medieval-btn" onClick={handleHostClick}>
                        <HousePlug className="btn-icon" />
                        <span>{hostId == null ? 'Sunucuya Bağlan' : 'Sunucuya Bağlanıldı'}</span>
                    </button>
                    {hostId &&
                        <>
                            <button className="medieval-btn" onClick={copyId}>
                                <span>{copied ? "Koplayandı" : hostId}</span>
                            </button>
                            <button className="medieval-btn" onClick={handleLobyClick}>
                                <span>Lobiye Geç</span>
                            </button>
                        </>}


                </div>

                {/* Kırmızı Mühür */}
                <div className="wax-seal">T W</div>
            </div>
        </div>
    );
};

export default HostScreen;