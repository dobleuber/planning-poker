import {
  graphql,
  requestSubscription,
} from 'react-relay';

import environment from '../createRelayEnvironment';

const newStorySubscription = graphql`
  subscription NewStorySubscription {
    Story {
      mutation
      updatedFields
      node {
        id
        name
        url
        estimation
        showEstimation
        project {
          id
        }
      },
    }
  }
`;

export default (projectId, callback) => {
  const subcriptionConfig = {
    subscription: newStorySubscription,
    variables: {},
    updater: (proxyStore) => {
      const updateStoryField = proxyStore.getRootField('Story');
      const updateStory = updateStoryField.getLinkedRecord('node');
      const storyId = updateStory.getValue('id');
      const storyField = proxyStore.get(storyId);
      const updatedFields = updateStoryField.getValue('updatedFields');
      if (updatedFields) {
        updatedFields.forEach((field) => {
          const newValue = updateStory.getValue(field);
          storyField.setValue(newValue, field);
        });
      } else if (callback) {
        const projectField = storyField.getLinkedRecord('project');
        const projectIdField = projectField.getValue('id');
        if (projectId === projectIdField) {
          callback(storyId);
        }
      }
    },
    onCompleted: () => {},
    onError: error => console.error(error),
  };

  return requestSubscription(environment, subcriptionConfig);
};
