import {
  commitMutation,
  graphql,
} from 'react-relay';

import environment from '../createRelayEnvironment';

const mutation = graphql`
  mutation CreateUserMutation($email: String!, $password: String!, $username: String!) {
    signupUser(email: $email, password: $password, username: $username) {
      id
      token
    }
  }
`;

export default (email, password, username, callback) => {
  const variables = {
    email,
    password,
    username,
    clientMutationId: '',
  };

  commitMutation(environment, {
    mutation,
    variables,
    onCompleted: (response) => {
      const { id, token } = response.signupUser;
      callback(id, token);
    },
    onError: err => console.error(err),
  });
};
