import React from 'react';
import { Sword, Settings, LogOut, ShieldAlert } from 'lucide-react';
import './css/MainMenu.css';
import { useMainMenuContext } from '../../contexts/MainMenuContext';

const MainMenu = () => {
    const { setMainMenuScreen, setHostScreen,setClientScreen } = useMainMenuContext();

    const handleHostClick = () => {
        setHostScreen(true);
        setMainMenuScreen(false);
        setClientScreen(false);
    }
     const handleClientClick = () => {
        setHostScreen(false);
        setMainMenuScreen(false);
        setClientScreen(true);
    }
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
                        <Sword className="btn-icon" />
                        <span>Oyun Kur</span>

                    </button>

                    <button className="medieval-btn" onClick={handleClientClick}>
                        <ShieldAlert className="btn-icon" />
                        <span>Oyuna Katıl</span>
                    </button>


                </div>

                {/* Kırmızı Mühür */}
                <div className="wax-seal">T&W</div>
            </div>
        </div>
    );
};

export default MainMenu;