import {
  commitMutation,
  graphql,
} from 'react-relay';
import environment from '../createRelayEnvironment';

const mutation = graphql`
  mutation CreateProjectMutation($input: CreateProjectInput!) {
    createProject(input: $input) {
      project {
        id
        name
        description
      }
    }
  }
`;

export default (name, description, userCreatorId, callback) => {
  const variables = {
    input: {
      name,
      description,
      userCreatorId,
      clientMutationId: '',
    },
  };

  commitMutation(
    environment,
    {
      mutation,
      variables,
      onCompleted: () => callback(),
      onError: err => console.error(err),
    },
  );
};
