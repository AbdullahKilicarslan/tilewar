import React from 'react';
import { User, Shield, Sword, Crown } from 'lucide-react';
import './css/PlayerList.css';

const PlayerList = ({ players, activePlayerId }) => {
  // Örnek data (Eğer props boş gelirse diye):
  const defaultPlayers = [
    { id: 1, name: "Lord Arthur", role: "Saldıran", icon: <Sword size={16}/> },
    { id: 2, name: "Kral Mordred", role: "Savunmacı", icon: <Shield size={16}/> },
    { id: 3, name: "Gölge Şövalye", role: "Gözcü", icon: <User size={16}/> },
  ];

  const list = players || defaultPlayers;

  return (
    <div className="player-list-wrapper">
      {list.map((player) => (
        <div 
          key={player.id} 
          className={`player-list-item ${activePlayerId === player.id ? 'active' : ''}`}
        >
          <div className="active-indicator" />
          
          <div className="player-avatar">
            {activePlayerId === player.id ? <Crown size={20} /> : player.icon}
          </div>

          <div className="player-info">
            <span className="p-name">{player.name}</span>
            <span className="p-status">
                {activePlayerId === player.id ? "HAMLE SIRASI" : player.role}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayerList;