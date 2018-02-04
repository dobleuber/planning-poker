import { commitMutation, graphql } from 'react-relay';

import environment from '../createRelayEnvironment';

const mutation = graphql`
  mutation ClearStoryVotesMutation($storyId: ID!) {
    clearStoryVotes(storyId: $storyId) {
      cardSelectionIds
    }
  }
`;

export default (storyId, callback) => {
  const variables = {
    storyId,
  };

  commitMutation(
    environment,
    {
      mutation,
      variables,
      onCompleted: (res, err) => {
        if (res.cardSelectionIds) {
          callback(err, res.cardSelectionIds);
        } else {
          callback(err);
        }
      },
      onError: err => callback(err),
    },
  );
};
