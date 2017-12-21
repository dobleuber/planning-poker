import {
  commitMutation,
  graphql,
} from 'react-relay';
import environment from '../createRelayEnvironment';

const mutation = graphql`
  mutation UpdateCardSelectionMutation($input: UpdateCardSelectionInput!) {
    updateCardSelection(input: $input) {
      cardSelection {
        id
      }
      user {
        id
      }
      story {
        id
      }
      card {
        id
      }
    }
  }
`;

export default (id, cardId, callback) => {
  const variables = {
    input: {
      id,
      cardId,
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
