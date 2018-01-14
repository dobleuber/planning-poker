import {
  graphql,
  requestSubscription,
} from 'react-relay';

import environment from '../createRelayEnvironment';

const cardSelectionSubcription = graphql`
  subscription CardSelectionSubscription {
    CardSelection {
      mutation
      updatedFields
      node {
        id
        isActive
        card {
          id
          label
          value
        }
        story {
          id
        }
        user {
          id
          username
        }
      }

      previousValues {
        id
        isActive
        updatedAt
      }
    }
  }
`;

export default () => {
  const subcriptionConfig = {
    subscription: cardSelectionSubcription,
    variables: {},
    updater: (proxyStore) => {
      const cardSelectionField = proxyStore.getRootField('CardSelection');
      const updateCardSelection = cardSelectionField.getLinkedRecord('node');
      const cardField = updateCardSelection.getLinkedRecord('card');
      if (cardField) {
        const cardSelectionId = updateCardSelection.getValue('id');
        const cardSelection = proxyStore.get(cardSelectionId);
        cardSelection.setLinkedRecord(cardField, 'card');
      } else {
        const updateCardSelectionId = updateCardSelection.getValue('id');
        const storyField = updateCardSelection.getLinkedRecord('story');
        const storyId = storyField.getValue('id');
        const story = proxyStore.get(storyId);
        const selections = story.getLinkedRecord('selections');
        const edges = selections.getLinkedRecords('edges');
        const exists = edges.find((edge) => {
          const node = edge.getLinkedRecord('node');
          return node.getValue('id') === updateCardSelectionId;
        });
        if (!exists) {
          const newEdges = [...edges, cardSelectionField];
          selections.setLinkedRecords(newEdges, 'edges');
        }
      }
      // updateCardSelection.getLinkedRecord('story').getLinkedRecord('selections')
    },
    onCompleted: () => {},
    onError: error => console.log(error),
  };

  return requestSubscription(environment, subcriptionConfig);
};
