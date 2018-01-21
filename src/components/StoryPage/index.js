import React from 'react';
import {
  QueryRenderer,
  graphql,
} from 'react-relay';

import environment from '../../createRelayEnvironment';

import './StoryPage.css';

import { CardSelectionList, StoryDetail } from '../';

const query = graphql`
  query StoryPageQuery($storyId: ID!) {
    node(id: $storyId) {
      ...StoryDetail_story
      ... on Story {
        selections {
          ...CardSelectionList_selections
        }
      }
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
              <div className="story-page">
                <div className="row">
                  <StoryDetail
                    projectId={projectId}
                    storyId={storyId}
                    story={props.node}
                    history={history}
                  />
                </div>
                {
                  props.node &&
                  <div className="row">
                    <div className="game-container">
                      <CardSelectionList
                        storyId={props.node.id}
                        selections={props.node.selections}
                      />
                    </div>
                  </div>
                }
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
