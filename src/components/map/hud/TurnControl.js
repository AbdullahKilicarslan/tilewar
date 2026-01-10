import React from 'react';
import { Hourglass, Zap, Crown } from 'lucide-react';
import './css/TurnControl.css';

import { useGameContext } from '../../../contexts/GameContext';

const TurnControl = ({
  currentTurn = 14,
  maxAP = 5,
  currentAP = 3,
  playerName = "LORD ARTHUR"
}) => {

  const { myPlayerId, activePlayerId,gameUsers,setActivePlayerId,setTourCount } = useGameContext();


const handleEndTurn = () => {
  // 1. Mevcut aktif oyuncunun listedeki yerini bul
  const currentIndex = gameUsers.findIndex(user => user.id === activePlayerId);

  if (currentIndex !== -1) {
    // 2. Bir sonraki indeksi hesapla (Liste sonundaysa başa dönmesi için % kullanıyoruz)
    const nextIndex = (currentIndex + 1) % gameUsers.length;
    
    // 3. Bir sonraki oyuncunun ID'sini al
    const nextPlayerId = gameUsers[nextIndex].id;

    
    // 4. Yeni aktif oyuncuyu belirle
    setActivePlayerId(nextPlayerId);
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
          {[...Array(maxAP)].map((_, i) => (
            <div
              key={i}
              className={`ap-orb ${i >= currentAP ? 'spent' : ''}`}
            />
          ))}
          <span className="ap-text">{currentAP}/{maxAP}</span>
        </div>
      </div>


      {
        <button className="end-turn-btn" onClick={handleEndTurn}>
          <div className="turn-info-badge">TUR: {currentTurn}</div>
          <Hourglass size={32} style={{ marginBottom: '5px' }} />
          <span style={{ textAlign: 'center' }}>TURU<br />BİTİR</span>
        </button>
      }
    </div>
  );
};

export default TurnControl;