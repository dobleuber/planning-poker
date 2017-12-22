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
  selectedCard,
}) => {
  const selected = selectedCard && selectedCard.id === card.id;
  const selectCard = () => {
    if (selected) {
      return;
    }

    const params = {
      id: estimationId,
      cardId: card.id,
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

  fragment Card_selectedCard on Card {
    id
  }
`);
