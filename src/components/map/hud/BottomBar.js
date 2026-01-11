import React, { useState } from 'react';
import { Library, History, Swords, Flame, Map as MapIcon, Zap, Coins } from 'lucide-react';
import './css/BottomBar.css';
import { useGameContext } from '../../../contexts/GameContext';

// Eksik olan ikon belirleme fonksiyonu
const getCardIcon = (type) => {
  switch (type) {
    case 'Military': return <Swords size={40} />;
    case 'Economy': return <Coins size={40} />;
    case 'Terrain': return <MapIcon size={40} />;
    case 'Magic': return <Zap size={40} />;
    default: return <Flame size={40} />;
  }
};

const BottomBar = () => {
  const { myPlayerDeckOnHand } = useGameContext();
  const [showDeck, setShowDeck] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="hud-bottom-bar">
      {/* SOL BUTON */}
      <div className="hud-icon-container left-btn" onMouseEnter={() => setShowDeck(true)} onMouseLeave={() => setShowDeck(false)}>
        <Library size={30} />
        <span className="icon-label">DESTE</span>
        {showDeck && <div className="preview-panel left-preview"><h4>KALAN ORDU</h4><ul><li>Askeri x12</li></ul></div>}
      </div>

      {/* KARTLAR */}
      <div className="hand-container">
        {myPlayerDeckOnHand && myPlayerDeckOnHand.slice(0, 5).map((card) => (
          <div key={card.id} className={`game-card ${card.type.toLowerCase()}`}>

            {/* Sol Üst AP */}
            <div className="card-cost-cyan">{card.apCost}</div>

            {/* Üst Görsel */}
            <div className="card-image-section">
              {getCardIcon(card.type)}
            </div>

            {/* Tip Banner */}
            <div className="card-type-banner">
              {card.type}
            </div>

            {/* Açıklama */}
            <div className="card-desc-section">
              <p>{card.description}</p>
            </div>

            {/* Alt İsim */}
            <div className="card-footer-title">
              {card.name}
            </div>
          </div>
        ))}
      </div>

      {/* SAĞ BUTON */}
      <div className="hud-icon-container right-btn" onMouseEnter={() => setShowHistory(true)} onMouseLeave={() => setShowHistory(false)}>
        <History size={30} />
        <span className="icon-label">GEÇMİŞ</span>
        {showHistory && <div className="preview-panel right-preview"><h4>GEÇMİŞ</h4><ul><li>Hamle 1</li></ul></div>}
      </div>
    </div>
  );
};

export default BottomBar;