import React from 'react';
import { Hourglass, Zap, Crown } from 'lucide-react';
import './css/TurnControl.css';

import { useGameContext } from '../../../contexts/GameContext';

const TurnControl = () => {

  const { myPlayerId, activePlayerId, gameUsers, SetActivePlayer, setTourCount } = useGameContext();


  const handleEndTurn = () => {
    // 1. Mevcut aktif oyuncunun listedeki yerini bul
    const currentIndex = gameUsers.findIndex(user => user.id === activePlayerId);
    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % gameUsers.length;
      const nextPlayerId = gameUsers[nextIndex].id;
      SetActivePlayer(nextPlayerId);
    }
    setTourCount(prev => prev + 1);
  };

  return (
    <div className="turn-control-wrapper">

      {/* Aksiyon Puanı Göstergesi */}
      <div className="action-points-panel">
        <span className="ap-label">AKSİYON PUANI</span>
        <div className="ap-display">
          <Zap size={18} color="#00d4ff" fill="#00d4ff" />
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`ap-orb ${i >= 3 ? 'spent' : ''}`}
            />
          ))}
          <span className="ap-text">{5}/{3}</span>
        </div>
      </div>


      {myPlayerId === activePlayerId &&
        <button className="end-turn-btn" onClick={handleEndTurn} disabled={myPlayerId !== activePlayerId}>
          <Hourglass size={32} style={{ marginBottom: '5px' }} />
          <span style={{ textAlign: 'center' }}>TURU<br />BİTİR</span>
        </button>
      }
    </div>
  );
};

export default TurnControl;