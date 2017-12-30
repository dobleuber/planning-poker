import { commitMutation, graphql } from 'react-relay';

import environment from '../createRelayEnvironment';

const mutation = graphql`
  mutation AddProjectCollaboratorsMutation($input: AddToProjectCollaboratorsUserInput!) {
    addToProjectCollaborators(input: $input) {
      projectsInvolvedProject {
        id
        name
        collaborators {
          edges {
            node {
              ... on User {
                id
                username
              }
            }
          }
        }
      }
    }
  }
`;

export default (projectsInvolvedProjectId, collaboratorsUserId, callback) => {
  const variables = {
    input: {
      projectsInvolvedProjectId,
      collaboratorsUserId,
      clientMutationId: '',
    },
  };

  commitMutation(environment, {
    mutation,
    variables,
    onCompleted: callback,
    onError: err => console.error(err),
  });
};
