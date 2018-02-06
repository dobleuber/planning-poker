import React from 'react';
import './SelectedCard.css';

const SelectedCard = (props) => {
  const {
    position,
    userName,
    card,
    showEstimation,
  } = props;

  const top = position.y - 39;
  const left = position.x - 32;
  const label = card && card.label;
  const isIcon = card && card.isIcon;
  const hasSelected = card ? ' selected' : '';
  const hasShowClass = card && showEstimation ? ' show-card' : '';

  return (
    <div
      className={`selected-card${hasSelected}${hasShowClass}`}
      style={{ top, left }}
    >
      <div className="flipper">
        <div className="card-face front">
          {
            isIcon ?
              <i className={`fas fa-${label}`} /> :
              <div className="selected-card__label">{label}</div>
          }
          <div className="selected-card__user" title={userName} >{userName}</div>
        </div>
        <div className="card-face back">
          <div className="selected-card__user" title={userName} >{userName}</div>
        </div>
      </div>
    </div>
  );
};

export default SelectedCard;
