import React from 'react';
import { User, Shield, Sword, Crown } from 'lucide-react';
import './css/PlayerList.css';
import { useGameContext } from '../../../contexts/GameContext';

const PlayerList = () => {
    const { gameUsers, activePlayerId, myPlayerId } = useGameContext();

    return (
        <div className="player-list-wrapper">
            {gameUsers.map((player) => {
                const isActive = activePlayerId === player.id;
                const isMe = myPlayerId === player.id;
                
                return (
                    <div
                        key={player.id}
                        className={`player-list-item ${isActive ? 'active' : ''}`}
                        /* Aktif oyuncu kartına hafif bir gölge rengi vermek için */
                        style={{ borderLeftColor: player.color }}
                    >
                        {/* Aktiflik Belirteci - Oyuncunun rengini kullanır */}
                        <div 
                            className="active-indicator" 
                            style={{ backgroundColor: player.color, boxShadow: `0 0 10px ${player.color}` }} 
                        />

                        {/* Avatar Alanı - Arka plan oyuncunun rengidir */}
                        <div 
                            className="player-avatar"
                            style={{ 
                                backgroundColor: isActive ? player.color : '#1a0f0a',
                                borderColor: player.color,
                                color: isActive ? '#fff' : player.color 
                            }}
                        >
                            {isMe ? <Crown size={20} /> : (isActive ? <Sword size={16} /> : <Shield size={16} />)}
                        </div>

                        <div className="player-info">
                            <span className="p-name">{player.name}</span>
                            <span className="p-status">
                                {isActive ? "Saldırıyor" : 'Savunmada'}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default PlayerList;