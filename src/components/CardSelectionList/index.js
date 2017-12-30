import React, { Component } from 'react';
import { createFragmentContainer, graphql } from 'react-relay';

class CardSelectionList extends Component {
  componentDidMount() {

  }

  render() {
    const { selections } = this.props;
    return (
      <div>
        { selections.edges.map(({ node }) => {
            const { card, user } = node;
            return (
              <div key={node.id} >
                {user.username} = {card && card.label}
              </div>
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
