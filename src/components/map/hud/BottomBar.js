import React, { useState } from 'react';
import { Library, History, Swords, Flame, Map as MapIcon, Zap, Coins, X } from 'lucide-react';
import './css/BottomBar.css';
import { useGameContext } from '../../../contexts/GameContext';

const getCardIcon = (type) => {
  switch (type) {
    case 'Military': return <Swords size={40} />;
    case 'Economy': return <Coins size={40} />;
    case 'Terrain': return <MapIcon size={40} />;
    case 'Magic': return <Zap size={40} />;
    default: return <Flame size={40} />;
  }
};

const getGroupedCards = (cards) => {
  if (!cards) return {};
  return cards.reduce((acc, card) => {
    acc[card.type] = (acc[card.type] || 0) + 1;
    return acc;
  }, {});
};

const BottomBar = () => {
  const { myPlayerDeckOnHand, myPlayerDeckDiscard, myPlayerDeckDraw } = useGameContext();
  const [showDeckPreview, setShowDeckPreview] = useState(false);
  const [showHistoryPreview, setShowHistoryPreview] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  const renderCard = (card) => (
    <div key={card.id} className={`game-card ${card.type.toLowerCase()}`}>
      <div className="card-cost-cyan">{card.apCost}</div>
      <div className="card-image-section">{getCardIcon(card.type)}</div>
      <div className="card-type-banner">{card.type}</div>
      <div className="card-desc-section"><p>{card.description}</p></div>
      <div className="card-footer-title">{card.name}</div>
    </div>
  );

  const renderPreviewPanel = (cards, title, positionClass) => {
    const grouped = getGroupedCards(cards);
    return (
      <div className={`preview-panel ${positionClass}`}>
        <h4>{title} ({cards?.length || 0})</h4>
        <div className="grouped-list-container">
          {Object.entries(grouped).map(([type, count]) => (
            <div key={type} className={`group-item ${type.toLowerCase()}`}>
              <span className="group-name">{type}</span>
              <span className="group-count">x{count}</span>
            </div>
          ))}
        </div>
        <p className="click-hint">Görmek için tıkla</p>
      </div>
    );
  };

  return (
    <div className="hud-bottom-bar">
      {/* FULLSCREEN MODAL */}
      {activeModal && (
        <div className="fullscreen-card-modal">
          <div className="modal-header">
            <h2>{activeModal === 'DECK' ? 'KALAN ORDU' : 'GEÇMİŞ HAMLELER'}</h2>
            <button className="close-modal-btn" onClick={() => setActiveModal(null)}><X size={44} /></button>
          </div>
          <div className="modal-content">
            <div className="modal-grid">
              {(activeModal === 'DECK' ? myPlayerDeckDraw : myPlayerDeckDiscard)?.map(card => renderCard(card))}
            </div>
          </div>
        </div>
      )}

      {/* SOL BUTON - DESTE */}
      <div 
        className="hud-icon-container left-btn" 
        onMouseEnter={() => setShowDeckPreview(true)} 
        onMouseLeave={() => setShowDeckPreview(false)}
        onClick={() => setActiveModal('DECK')}
      >
        <Library size={30} />
        <span className="icon-label">DESTE ({myPlayerDeckDraw?.length || 0})</span>
        {showDeckPreview && !activeModal && renderPreviewPanel(myPlayerDeckDraw, "KALAN ORDU", "left-preview")}
      </div>

      {/* ORTA - ELDEKİ KARTLAR */}
      <div className="hand-container">
        {myPlayerDeckOnHand && myPlayerDeckOnHand.map(card => renderCard(card))}
      </div>

      {/* SAĞ BUTON - GEÇMİŞ */}
      <div 
        className="hud-icon-container right-btn" 
        onMouseEnter={() => setShowHistoryPreview(true)} 
        onMouseLeave={() => setShowHistoryPreview(false)}
        onClick={() => setActiveModal('HISTORY')}
      >
        <History size={30} />
        <span className="icon-label">GEÇMİŞ ({myPlayerDeckDiscard?.length || 0})</span>
        {showHistoryPreview && !activeModal && renderPreviewPanel(myPlayerDeckDiscard, "GEÇMİŞ", "right-preview")}
      </div>
    </div>
  );
};

export default BottomBar;