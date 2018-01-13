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
}) => {
  const selected = selectedCardId === card.id;
  const selectCard = (event) => {
    event.preventDefault();
    if (selected) {
      return;
    }

    const params = {
      estimationId,
      cardId: card.id,
      selection: card.label,
    };
    onSelectCard(params);
  };

  const { label } = card;
  const cardClass = selected ? 'card selected' : 'card';
  return (
    <button className={cardClass} onClick={selectCard}>
      <div className="card__label">{label}</div>
    </button>
  );
};


export default createFragmentContainer(Card, graphql`
  fragment Card_card on Card{
    id
    label
    value
  }
`);
