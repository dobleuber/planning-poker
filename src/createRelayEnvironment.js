import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';

import { SubscriptionClient } from 'subscriptions-transport-ws';

import Security from './utils/security';

const projectId = 'cjau9r6in15k80101rlm6gdwd';
// const server = 'http://localhost:60000/relay/v1/cjahyy6ne02qr0147iwxiyzjy';

const regionId = 'us-west-2';

const source = new RecordSource();
const store = new Store(source);

const fetchQuery = (
  operation,
  variables,
) => fetch(`https://api.graph.cool/relay/v1/${projectId}`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Security.authToken}`,
  },
  body: JSON.stringify({
    query: operation.text,
    variables,
  }),
}).then(response => response.json());

const setupSubscription = (config, variables, cacheConfig, observer) => {
  const query = config.text;

  const subscriptionClient = new SubscriptionClient(
    `wss://subscriptions.${regionId}.graph.cool/v1/${projectId}`,
    { reconnect: true },
  );

  const subscriptionId = subscriptionClient.subscribe({ query, variables }, (error, result) => {
    observer.onNext({ data: result });
  });

  return {
    dispose: () => subscriptionClient.unsubscribe(subscriptionId),
  };
};

const network = Network.create(fetchQuery, setupSubscription);

const environment = new Environment({
  network,
  store,
});

export default environment;
