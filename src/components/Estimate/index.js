import React, { Component } from 'react';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay';

import './Estimate.css';

import { Card } from '../';

import updateCardSelectionMutation from '../../mutations/UpdateCardSelectionMutation';


class Estimate extends Component {
  static selectCard({ estimationId, cardId }) {
    updateCardSelectionMutation(estimationId, cardId);
  }

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { estimation } = this.props;
    const { story, card } = estimation;
    const { name, url } = story;

    const selectedCardId = card && card.id;

    return (
      <div className="estimate">
        <div className="row">
          <div className="label">Name</div>
          <div className="field">{name}</div>
        </div>
        <div className="row">
          <div className="label">url</div>
          <div className="field">{url}</div>
        </div>
        <div className="row">
          <div className="card-container">
            {
              story.project.deckType.cards.edges.map(({ node }) => (
                <Card
                  key={node.__id}
                  card={node}
                  estimationId={estimation.id}
                  onSelectCard={Estimate.selectCard}
                  selectedCardId={selectedCardId}
                />
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default createFragmentContainer(Estimate, graphql`
  fragment Estimate_estimation on CardSelection {
    id
    story {
      name
      url
      project {
        deckType {
          id
          name
          cards {
            edges {
              node {
                ...Card_card
              }
            }
          }
        }
      }
    }

    card {
      id
      label
    }
  }
`);
