import React, { Component } from 'react';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay';

import './Estimate.css';

import { Card } from '../';

class Estimate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { story } = this.props;
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
              story.project.deckType.cards.edges.map(({ node }) =>
                <Card key={node.__id} card={node} />)
            }
          </div>
        </div>
      </div>
    );
  }
}

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
