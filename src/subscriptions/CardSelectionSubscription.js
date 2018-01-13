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
      const updatedFieldsValue = cardSelectionField.getValue('updatedFields');
      const cardValue = cardField.getValue('label');
      console.log(updatedFieldsValue, cardValue);
    },
    onCompleted: () => {},
    onError: error => console.log(error),
  };

  return requestSubscription(environment, subcriptionConfig);
};
