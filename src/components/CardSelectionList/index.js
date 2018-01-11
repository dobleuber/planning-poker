import React, { Component } from 'react';
import { createFragmentContainer, graphql } from 'react-relay';

import './CardSelectionList.css';
import { SelectedCard } from '../';

class CardSelectionList extends Component {
  componentDidMount() {

  }

  render() {
    const { selections } = this.props;
    const h = 500;
    const k = 250;
    const step = (2 * Math.PI) / selections.edges.length;
    let angle = 0;
    return (
      <div className="card-selection-list">
        { selections.edges.map(({ node }) => {
            const x = h + (Math.cos(angle) * h * 0.7);
            const y = k + (Math.sin(angle) * k * 0.7);
            angle += step;
            const { card, user } = node;
            return (
              <SelectedCard
                key={node.id}
                position={{ x, y }}
                userName={user.username}
                card={card}
              />
            );
          })}
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
