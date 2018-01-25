import {
  commitMutation,
  graphql,
} from 'react-relay';
import environment from '../createRelayEnvironment';

const mutation = graphql`
  mutation UpdateStoryShowEstimationMutation($input: UpdateStoryInput!) {
    updateStory(input: $input) {
      story {
        id
        showEstimation
      }
    }
  }
`;

export default (id, showEstimation) => {
  const optimisticResponse = {
    updateStory: {
      story: {
        id,
        showEstimation,
      },
    },
  };

  const variables = {
    input: {
      id,
      showEstimation,
      clientMutationId: '',
    },
  };

  commitMutation(
    environment,
    {
      mutation,
      optimisticResponse,
      variables,
      onError: err => console.log(err),
    },
  );
};
