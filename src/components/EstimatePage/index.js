import React, { Component } from 'react';
import {
  QueryRenderer,
  graphql,
} from 'react-relay';

import environment from '../../createRelayEnvironment';

import './EstimatePage.css';

import { Estimate } from '../';
import updateCardSelectionMutation from '../../mutations/UpdateCardSelectionMutation';

const query = graphql`
  query EstimatePageQuery($storyId: ID!, $estimateId: ID!) {
    story: node(id: $storyId) {
      ...Estimate_story
    }

    estimation: node(id: $estimateId) {
      ... on CardSelection{
        id
        card {
          id
        }
      }
    }
  }
`;

class EstimatePage extends Component {
  static selectCard({ id, cardId }) {
    updateCardSelectionMutation(id, cardId, res => console.log(res));
  }

  render() {
    const { match } = this.props;
    const { storyId, estimateId } = match.params;
    return (
      <QueryRenderer
        environment={environment}
        query={query}
        variables={{
          storyId,
          estimateId,
        }}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (props) {
            return (
              <div className="estimate-page">
                <Estimate
                  estimateId={estimateId}
                  story={props.story}
                  estimation={props.estimation}
                  selectCard={EstimatePage.selectCard}
                />
              </div>
            );
          }

          return <div>Loading</div>;
        }}
      />
    );
  }
}

export default EstimatePage;
