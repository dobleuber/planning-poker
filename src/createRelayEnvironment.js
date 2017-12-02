import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';


const source = new RecordSource();
const store = new Store(source);
const network = Network.create((
  operation,
  variables,
) => fetch('http://localhost:60000/relay/v1/cjahyy6ne02qr0147iwxiyzjy', {
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
