import {
  graphql,
  requestSubscription,
} from 'react-relay';

import environment from '../createRelayEnvironment';

const newStorySubscription = graphql`
  subscription NewStorySubscription {
    Story {
      mutation
      node {
        name
        url
      }
    }
  }
`;

export default () => {
  const subcriptionConfig = {
    subscription: newStorySubscription,
    variables: {},
    updater: (proxyStore) => {
      const createStoryField = proxyStore.getRootField('Story');
      const newStory = createStoryField.getLinkedRecord('node');
      console.log(newStory);
    },
    onError: error => console.error(error),
  };

  requestSubscription(environment, subcriptionConfig);
};
