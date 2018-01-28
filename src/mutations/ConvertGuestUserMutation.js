import {
  commitMutation,
  graphql,
} from 'react-relay';

import environment from '../createRelayEnvironment';

const mutation = graphql`
  mutation ConvertGuestUserMutation($id: ID!, $email: String!, $password: String!, $username: String!) {
    convertGuestUser(id: $id, email: $email, password: $password, username: $username) {
      id
      token
    }
  }
`;

export default (id, email, password, username, callback) => {
  const variables = {
    id,
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
        const { token } = response.signupUser;
        const userId = response.signupUser.id;
        callback(null, userId, token);
      } else {
        callback(err);
      }
    },
    onError: err => callback(err),
  });
};
