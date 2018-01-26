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
    onCompleted: (response, err) => {
      if (response.signupUser) {
        const { id, token } = response.signupUser;
        callback(null, id, token);
      } else {
        callback(err);
      }
    },
    onError: err => callback(err),
  });
};
