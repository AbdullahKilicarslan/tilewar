import React from 'react';
import { Sword, Settings, LogOut, ShieldAlert } from 'lucide-react';
import './css/MainMenu.css';
import { useScreenContext } from '../../contexts/ScreenContext';

const MainMenu = () => {
    const { OpenHostScreen ,OpenClientScreen} = useScreenContext();

    return (
        <div className="menu-container">
            <div className="main-card">
                {/* Dekoratif Köşeler */}
                <div className="corner top-left"></div>
                <div className="corner top-right"></div>

                <h1 className="game-title">KADİM TOPRAKLAR</h1>
                <div className="title-underline"></div>

                <div className="menu-options">
                    <button className="medieval-btn" onClick={OpenHostScreen}>
                        <Sword className="btn-icon" />
                        <span>Oyun Kur</span>

                    </button>

                    <button className="medieval-btn" onClick={OpenClientScreen}>
                        <ShieldAlert className="btn-icon" />
                        <span>Oyuna Katıl</span>
                    </button>


                </div>

                {/* Kırmızı Mühür */}
                <div className="wax-seal">K&T</div>
            </div>
        </div>
    );
};

export default MainMenu;