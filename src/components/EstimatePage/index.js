import React from 'react';
import {
  QueryRenderer,
  graphql,
} from 'react-relay';

import environment from '../../createRelayEnvironment';

import './EstimatePage.css';

import { Estimate } from '../';

const query = graphql`
  query EstimatePageQuery($estimateId: ID!) {
    estimation: node(id: $estimateId) {
      ...Estimate_estimation
    }

    specialCards: viewer {
      ...Estimate_specialCards
    }
  }
`;

const EstimatePage = ({ match, history }) => {
  const { estimateId, projectId } = match.params;
  return (
    <QueryRenderer
      environment={environment}
      query={query}
      variables={{
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
                estimation={props.estimation}
                specialCards={props.specialCards}
                projectId={projectId}
                history={history}
              />
            </div>
          );
        }

        return <div>Loading</div>;
      }}
    />
  );
};

export default EstimatePage;
