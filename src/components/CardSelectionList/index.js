import React, { Component } from 'react';
import { createFragmentContainer, graphql } from 'react-relay';

import './CardSelectionList.css';
import { SelectedCard } from '../';

import CardSelectionSubscription from '../../subscriptions/CardSelectionSubscription';

class CardSelectionList extends Component {
  static setCardPositions(edges) {
    const k = 500;
    const h = 150;
    const step = (2 * Math.PI) / edges.length;
    let angle = (1 / 2) * Math.PI;
    let initialTop;

    return edges.map(({ node }, index) => {
      const { card, user } = node;
      let x = k + (Math.cos(angle) * k * 0.7);
      let y = h + (Math.sin(angle) * h * 0.7);
      initialTop = initialTop || y;
      y = card ? y : initialTop + 80;
      x = card ? x : (index + 1) * 90;
      angle += step;
      return {
        node,
        card,
        user,
        position: {
          x,
          y,
        },
      };
    });
  }

  componentDidMount() {
    const { storyId } = this.props;
    this.subscription = CardSelectionSubscription(storyId);
  }

  componentWillUnmount() {
    this.subscription.dispose();
  }

  render() {
    const { selections } = this.props;
    return (
      <div className="card-selection-list">
        {
          CardSelectionList.setCardPositions(selections.edges)
          .map(({
            node,
            card,
            user,
            position,
          }) => (
            <SelectedCard
              key={node.id}
              position={position}
              userName={user.username}
              card={card}
            />))
        }
      </div>
    );
  }
}

export default createFragmentContainer(CardSelectionList, graphql`
  fragment CardSelectionList_selections on CardSelectionConnection{
    edges {
      node {
        ... on CardSelection {
          id
          card {
            id
            label
            value
          }

          user {
            id
            username
          }
        }
      }
    }
  }
`);
