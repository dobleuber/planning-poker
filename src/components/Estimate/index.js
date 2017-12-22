import React from 'react';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay';

import './Estimate.css';

import { Card } from '../';


const Estimate = ({ story, estimation, selectCard }) => {
  const { name, url } = story;
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
        <div className="label">card</div>
        <div className="field">{estimation.selectedCard.id}</div>
      </div>
      <div className="row">
        <div className="card-container">
          {
            story.project.deckType.cards.edges.map(({ node }) => (
              <Card
                key={node.__id}
                card={node}
                estimationId={estimation.id}
                onSelectCard={selectCard}
                selectedCard={estimation.selectedCard}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default createFragmentContainer(Estimate, graphql`
  fragment Estimate_story on Story {
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

  fragment Estimate_estimation on CardSelection {
    id
    selectedCard: card {
      ...Card_selectedCard
      id
      label
    }
  }
`);
