import {
  commitMutation,
  graphql,
} from 'react-relay';
import environment from '../createRelayEnvironment';

const mutation = graphql`
  mutation UpdateCardSelectionStatusMutation($input: UpdateCardSelectionInput!) {
    updateCardSelection(input: $input) {
      cardSelection {
        id
        isActive
        updatedAt
      }
    }
  }
`;

export default (id, isActive, callback) => {
  const optimisticResponse = {
    updateCardSelection: {
      cardSelection: {
        id,
        isActive,
      },
    },
  };

  const variables = {
    input: {
      id,
      isActive,
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
