import {
  commitMutation,
  graphql,
} from 'react-relay';
import environment from '../createRelayEnvironment';

const mutation = graphql`
  mutation CreateCardSelectionMutation($input: CreateCardSelectionInput!) {
    createCardSelection(input: $input) {
      cardSelection {
        id
      }
    }
  }
`;

export default (userId, storyId, callback) => {
  const variables = {
    input: {
      userId,
      storyId,
      clientMutationId: '',
    },
  };

  commitMutation(
    environment,
    {
      mutation,
      variables,
      onCompleted: (res, error) => {
        callback(res, error);
      },
      onError: err => console.error(err),
    },
  );
};
