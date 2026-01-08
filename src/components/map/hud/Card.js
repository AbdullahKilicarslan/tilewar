import React from 'react';

const Card = ({card}) => {
 return (
        <div key={card.id} className={`game-card ${card.type}`}>
            <div className="card-cost">{card.cost}</div>
            <div className="card-art-area">
                {React.cloneElement(card.icon, { size: 64 })}
            </div>
            <div className="card-title">{card.name}</div>
        </div>
    )
}
export default Card;