import React from 'react';
import './SelectedCard.css';

const SelectedCard = (props) => {
  const {
    position,
    userName,
    card,
    index,
  } = props;

  const top = position.y - 39;
  const left = position.x - 32;
  const label = card && card.label;

  return (
    <div
      className="selected-card"
      style={{ top, left, zIndex: index }}
    >
      <div className="selected-card__label">{label}</div>
      <div className="selected-card__user" title={userName} >{userName}</div>
    </div>
  );
};

export default SelectedCard;
