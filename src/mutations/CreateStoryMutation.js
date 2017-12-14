import {
  commitMutation,
  graphql,
} from 'react-relay';
import environment from '../createRelayEnvironment';

const mutation = graphql`
  mutation CreateStoryMutation($input: CreateStoryInput!) {
    createStory(input: $input) {
      story {
        id
      }
    }
  }
`;

export default (name, url, estimation, projectId, callback) => {
  const variables = {
    input: {
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
      variables,
      onCompleted: res => callback(res),
      onError: err => console.log(err),
    },
  );
};
