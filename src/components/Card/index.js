import React from 'react';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay';

import './Card.css';

const Card = ({
  card,
  estimationId,
  onSelectCard,
  selectedCardId,
  showEstimation,
}) => {
  const selected = selectedCardId === card.id;
  const selectCard = (event) => {
    event.preventDefault();
    if (selected || showEstimation) {
      return;
    }

    const params = {
      estimationId,
      cardId: card.id,
      selection: card.label,
    };
    onSelectCard(params);
  };

  const { label, isIcon } = card;
  const cardClass = selected ? 'card selected' : 'card';
  return (
    <button className={cardClass} onClick={selectCard}>
      {isIcon ? <i className={`fas fa-${label}`} /> : <div className="card__label">{label}</div> }
    </button>
  );
};


export default createFragmentContainer(Card, graphql`
  fragment Card_card on Card{
    id
    label
    value
    isIcon
  }
`);
