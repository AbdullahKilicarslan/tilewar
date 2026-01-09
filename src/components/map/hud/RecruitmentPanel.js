import React from 'react';
import { Users, Shield, Coins, Cpu, Zap, Sword } from 'lucide-react';
import './css/RecruitmentPanel.css';

const RecruitmentPanel = ({ currentGold = 500, currentTech = 50, currentAP = 5 }) => {
  return (
    <div className="recruitment-panel">
      <div className="panel-section-title">YÖNETİM & ALIM</div>
      
      <div className="recruit-btn-group">
        <button className="recruit-button">
          <div className="btn-main-info">
            <Users size={20} />
            <span className="btn-label">İŞÇİ AL</span>
          </div>
          <div className="cost-container">
            <div className="cost-item cost-gold"><Coins size={12}/> 50</div>
            <div className="cost-item cost-ap"><Zap size={12}/> 1</div>
          </div>
        </button>

        <button className="recruit-button">
          <div className="btn-main-info">
            <Shield size={20} />
            <span className="btn-label">ASKER AL</span>
          </div>
          <div className="cost-container">
            <div className="cost-item cost-gold"><Coins size={12}/> 100</div>
            <div className="cost-item cost-tech"><Cpu size={12}/> 20</div>
            <div className="cost-item cost-ap"><Zap size={12}/> 2</div>
          </div>
        </button>
      </div>

      <div className="panel-section-title">MEVCUT BİRLİKLER</div>
      
      <div className="unit-list">
        <div className="unit-card">
          <div className="unit-img" style={{color: '#d4af37'}}><Sword size={20}/></div>
          <div className="unit-info">
            <span className="name">Mızrakçı Bölüğü</span>
            <span className="count">12 Birim</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentPanel;