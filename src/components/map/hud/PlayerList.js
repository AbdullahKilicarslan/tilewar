import React from 'react';
import { User, Shield, Sword, Crown } from 'lucide-react';
import './css/PlayerList.css';
import { useGameContext } from '../../../contexts/GameContext';

const PlayerList = () => {

    const { gameUsers,activePlayerId,myPlayerId } =useGameContext();


  // Örnek data (Eğer props boş gelirse diye):
  const defaultPlayers = [
    { id: 1, name: "Lord Arthur", role: "Saldıran", icon: <Sword size={16}/> },
    { id: 2, name: "Kral Mordred", role: "Savunmacı", icon: <Shield size={16}/> },
    { id: 3, name: "Gölge Şövalye", role: "Gözcü", icon: <User size={16}/> },
  ];

 
  return ( 
    <div className="player-list-wrapper">
      {gameUsers.map((player) => (
        <div  
          key={player.id} 
          className={`player-list-item ${activePlayerId === player.id ? 'active' : ''}`}
        >
          <div className="active-indicator" />
          
          <div className="player-avatar">
            {myPlayerId === player.id ? <Crown size={20} /> : (activePlayerId === player.id ? <Sword size={16}/>:<Shield size={16}/>)}
          </div>

          <div className="player-info">
            <span className="p-name">{player.name}</span>
            <span className="p-status">
                {activePlayerId === player.id ? "Saldırıyor" : 'Savunmada'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayerList;