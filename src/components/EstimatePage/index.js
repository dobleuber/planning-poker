import React from 'react';
import {
  QueryRenderer,
  graphql,
} from 'react-relay';

import environment from '../../createRelayEnvironment';

import './EstimatePage.css';

import { Estimate } from '../';

const query = graphql`
  query EstimatePageQuery($storyId: ID!) {
    node(id: $storyId) {
      ...Estimate_story      
    }
  }
`;

const EstimatePage = ({ match }) => {
  const { projectId, storyId } = match.params;
  return (
    <QueryRenderer
      environment={environment}
      query={query}
      variables={{
        storyId,
      }}
      render={({ error, props }) => {
        if (error) {
          return <div>{error.message}</div>;
        } else if (props) {
          return (
            <div className="estimate-page">
              <Estimate projectId={projectId} story={props.node} />
            </div>
          );
        }

        return <div>Loading</div>;
      }}
    />
  );
};

export default EstimatePage;
