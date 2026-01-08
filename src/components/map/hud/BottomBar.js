import React, { useState } from 'react';
import { Library, History, Swords, Flame, Castle } from 'lucide-react';
import './css/BottomBar.css';
import Card from './Card';

const BottomBar = () => {
  const [showDeck, setShowDeck] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const hand = [
    { id: 1, name: "Gümüş Şövalye", cost: 3, type: "unit", icon: <Swords /> },
    { id: 2, name: "Meteor Yağmuru", cost: 5, type: "spell", icon: <Flame /> },
    { id: 3, name: "Gözcü Kulesi", cost: 2, type: "structure", icon: <Castle /> },
    { id: 4, name: "Kutsal Işık", cost: 1, type: "spell", icon: <Flame /> },
    { id: 5, name: "Balista", cost: 4, type: "unit", icon: <Swords /> },
  ];

  const deckPreview = [
    { name: "Mızrakçı", count: 2 },
    { name: "Şifa İksiri", count: 1 },
    { name: "Kuşatma", count: 1 },
  ];

  const historyPreview = [
    { name: "Süvari Baskını", turn: "3. Tur" },
    { name: "Okçu Atışı", turn: "2. Tur" },
  ];

  return (
    <div className="hud-bottom-bar">

     {/* SOL: Kalan Deste Konteynırı */}
      <div 
        className="hud-icon-container"
        data-label="DESTE"
        onMouseEnter={() => setShowDeck(true)}
        onMouseLeave={() => setShowDeck(false)}
      >
        <Library size={36} />
        {showDeck && (
          <div className="preview-panel left-preview">
            <h4>KALAN ORDU</h4>
            <ul>
              <li><span>Mızrakçı</span> <span>x2</span></li>
              <li><span>Şifa</span> <span>x1</span></li>
            </ul>
          </div>
        )}
      </div>

      {/* ORTA: Elindeki Kartlar */}
      <div className="hand-container">
        {hand.map((card) => (
          <Card card={card} />
        ))}
      </div>

     {/* SAĞ: Kullanılan Kartlar Konteynırı */}
      <div 
        className="hud-icon-container"
        data-label="GEÇMİŞ"
        onMouseEnter={() => setShowHistory(true)}
        onMouseLeave={() => setShowHistory(false)}
      >
        <History size={36} />
        {showHistory && (
          <div className="preview-panel right-preview">
            <h4>GEÇMİŞ HAMLELER</h4>
            <ul>
              <li><span>Okçu Atışı</span> <span style={{fontSize:'0.7rem'}}>T3</span></li>
            </ul>
          </div>
        )}
      </div>

    </div>
  );
};

export default BottomBar;