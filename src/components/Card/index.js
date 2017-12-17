import React, { Component } from 'react';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay';

import './Card.css';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
    };

    this.selectCard = this.selectCard.bind(this);
  }

  selectCard() {
    this.setState({
      selected: !this.state.selected,
    });
  }

  render() {
    const { card } = this.props;
    const { label } = card;
    const { selected } = this.state;
    const cardClass = selected ? 'card selected' : 'card';
    return (
      <button className={cardClass} onClick={this.selectCard}>
        <div className="card__label">{label}</div>
      </button>
    );
  }
}

export default createFragmentContainer(Card, graphql`
  fragment Card_card on Card {
    id
    label
    value
  }
`);
