import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';

const server = 'https://api.graph.cool/relay/v1/cjau9r6in15k80101rlm6gdwd';
// const server = 'http://localhost:60000/relay/v1/cjahyy6ne02qr0147iwxiyzjy';

const source = new RecordSource();
const store = new Store(source);
const network = Network.create((
  operation,
  variables,
) => fetch(server, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: operation.text,
    variables,
  }),
}).then(response => response.json()));

const environment = new Environment({
  network,
  store,
});

export default environment;
