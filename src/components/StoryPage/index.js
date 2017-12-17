import React from 'react';
import {
  QueryRenderer,
  graphql,
} from 'react-relay';

import environment from '../../createRelayEnvironment';

import { StoryDetail } from '../';

const query = graphql`
  query StoryPageQuery($storyId: ID!) {
    node(id: $storyId) {
      ...StoryDetail_story
    }
  }
`;

const StoryPage = ({ match, history }) => {
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
              <div className="project-page">
                <StoryDetail
                  projectId={projectId}
                  storyId={storyId}
                  story={props.node}
                  history={history}
                />
              </div>
            );
          }

          return <div>Loading</div>;
        }
      }
    />
  );
};

export default StoryPage;
