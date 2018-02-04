import { fromEvent, FunctionEvent } from 'graphcool-lib'
import { GraphQLClient } from 'graphql-request'

interface CardSelection {
  id: string
};

interface EventData {
  storyId: string
};

async function getallCardSelections(api: GraphQLClient, storyId: string) {
  const query = `
    query getAllUserSelection($storyId: ID!) {
      allCardSelections(filter: {story: {id: $storyId}}) {
        id
      }
    }
  `;

  const variables = {
    storyId,
  };

  return api.request(query, variables);
}

export default async (event: FunctionEvent<EventData>) => {
  console.log(event);

  try {
    const graphcool = fromEvent(event);
    const api = graphcool.api('simple/v1');

    const { storyId } = event.data;

    const cardSelections: any = await getallCardSelections(api, storyId);

    const mutations = cardSelections.allCardSelections.map((selection) => (
      `
      ${selection.id}: updateCardSelection(id: "${selection.id}", cardId: null, selection: null) {
        id
      }
      `
    ));

    const fullMutation: any = 
      `
      mutation {
        ${mutations.join('\n')}
      }
      `;

    const result = await api.request<[CardSelection]>(fullMutation);
    const returnValue = cardSelections.allCardSelections.map((res) => res.id);
    return {data: {cardSelectionIds: returnValue}};
  } catch (e) {
    console.log(e);
    return { error: 'An unexpected error ocurred during mutation'};
  }
}
