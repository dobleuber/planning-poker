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

export default (name, description, userCreatorId, deckTypeId, callback) => {
  const variables = {
    input: {
      name,
      description,
      userCreatorId,
      deckTypeId,
      clientMutationId: '',
    },
  };

  commitMutation(
    environment,
    {
      mutation,
      variables,
      onCompleted: (res, err) => callback(err, res),
      onError: err => callback(err),
    },
  );
};
