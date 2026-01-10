import React from 'react';
import { Coins, Apple, Users, Shield, Cpu } from 'lucide-react';
import './css/TopBar.css';
import { useGameContext } from '../../../contexts/GameContext';

const TopBar = () => {
  const { myPlayerName,tourCount } = useGameContext();


  const resources = [
    { label: 'ALTIN', val: 1250, inc: 45, icon: <Coins />, cls: 'gold-res' },
    { label: 'GIDA', val: 450, inc: 12, icon: <Apple />, cls: 'food-res' },
    { label: 'İŞÇİ', val: 24, inc: 2, icon: <Users />, cls: 'work-res' },
    { label: 'BİRLİK', val: 120, inc: 0, icon: <Shield />, cls: 'sold-res' },
    { label: 'TEKNOLOJİ', val: 85, inc: 5, icon: <Cpu />, cls: 'tech-res' }
  ];

  return (
    <div className="top-bar-container">
      <div className="player-name side-info">{myPlayerName}</div>

      <div className="resources-wrapper">
        {resources.map((res, index) => (
          <div key={index} className={`resource-item ${res.cls}`}>
            <div className="resource-icon">
              {React.cloneElement(res.icon, { size: 24 })}
            </div>
            <div className="resource-info-block">
              <span className="resource-label">{res.label}</span>
              <div className="value-row">
                <span className="total-value">{res.val}</span>
                <span className={`income-value ${res.inc >= 0 ? 'positive' : 'negative'}`}>
                  ({res.inc >= 0 ? `+${res.inc}` : res.inc})
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="turn-box side-info">
        <div style={{ fontSize: '0.7rem', color: '#d4af37' }}>TUR</div>
        <div style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>{tourCount}</div>
      </div>
    </div>
  );
};

export default TopBar;