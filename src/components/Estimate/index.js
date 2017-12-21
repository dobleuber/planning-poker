import React from 'react';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay';

import './Estimate.css';

import { Card } from '../';


const Estimate = ({ story, estimation, selectCard }) => {
  const isSelected = fragment => estimation.card && estimation.card.id === fragment.__id;

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
        <div className="card-container">
          {
            story.project.deckType.cards.edges.map(({ node }) => (
              <Card
                key={node.__id}
                card={node}
                selected={isSelected(node, estimation)}
                estimationId={estimation.id}
                onSelectCard={selectCard}
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
`);
