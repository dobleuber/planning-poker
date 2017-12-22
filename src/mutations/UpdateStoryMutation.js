import {
  commitMutation,
  graphql,
} from 'react-relay';
import environment from '../createRelayEnvironment';

const mutation = graphql`
  mutation UpdateStoryMutation($input: UpdateStoryInput!) {
    updateStory(input: $input) {
      story {
        id
        name
      }
    }
  }
`;

export default (id, name, url, estimation, projectId) => {
  const optimisticResponse = {
    updateStory: {
      story: {
        id,
        name,
        url,
        estimation,
      },
    },
  };

  const variables = {
    input: {
      id,
      name,
      url,
      estimation: estimation || null,
      projectId,
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
