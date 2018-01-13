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
        selection
        card {
          id
        }
      }
    }
  }
`;

export default (id, cardId, selection, callback) => {
  const optimisticResponse = {
    updateCardSelection: {
      cardSelection: {
        id,
        selection,
        card: {
          id: cardId,
        },
      },
    },
  };

  const variables = {
    input: {
      id,
      cardId,
      selection,
      clientMutationId: '',
    },
  };

  commitMutation(
    environment,
    {
      mutation,
      variables,
      optimisticResponse,
      onCompleted: (res, error) =>
        callback && callback(res, error),
      onError: err => console.error(err),
    },
  );
};
