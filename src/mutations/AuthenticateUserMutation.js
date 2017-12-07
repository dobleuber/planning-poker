import {
  commitMutation,
  graphql,
} from 'react-relay';

import environment from '../createRelayEnvironment';

const mutation = graphql`
  mutation AuthenticateUserMutation($email: String!, $password: String!) {
    authenticateUser(email: $email, password: $password) {
      id
      token
    }
  }
`;

export default (email, password, callback) => {
  const variables = {
    email,
    password,
  };

  commitMutation(
    environment,
    {
      mutation,
      variables,
      onCompleted: (response) => {
        console.log(response);
        if (response.authenticateUser) {
          const { id, token } = response.authenticateUser;
          callback(id, token);
        }
      },
      onError: err => console.error(err),
    },
  );
};
