import {
  commitMutation,
  graphql,
} from 'react-relay';

import environment from '../createRelayEnvironment';

const mutation = graphql`
  mutation CreateGuestUserMutation($username: String!) {
    signupGuestUser(username: $username) {
      id
      token
    }
  }
`;

export default (username, callback) => {
  const variables = {
    username,
    clientMutationId: '',
  };

  commitMutation(environment, {
    mutation,
    variables,
    onCompleted: (response, err) => {
      if (response.signupGuestUser) {
        const { id, token } = response.signupGuestUser;
        callback(null, id, token);
      } else {
        callback(err);
      }
    },
    onError: err => callback(err),
  });
};
