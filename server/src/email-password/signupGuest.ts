import { FunctionEvent, fromEvent } from 'graphcool-lib';
import { GraphQLClient } from 'graphql-request';
import * as bcrypt from 'bcryptjs';

interface User {
  id: string
}

interface EventData {
  username: string
}

const SALT_ROUNDS = 10

export default async (event: FunctionEvent<EventData>) => {
  console.log(event)

  try {
    const graphcool = fromEvent(event);
    const api = graphcool.api('simple/v1')

    const { username } = event.data
    const password = 'temporal'

    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    const hash = await bcrypt.hash(password, SALT_ROUNDS)

    const userId = await createGuestUser(api, username, hash);

    const token = await graphcool.generateNodeToken(userId, 'User')

    return { data: {id: userId, token } }
  } catch (e) {
    console.log(e)
    return { error: 'An unexpected error occurred during user guest creation.' }
  }
}

async function createGuestUser(api: GraphQLClient, username: string, password: string): Promise<string> {
  const mutation = `
    mutation createGuestUser($username: String!, $password: String!) {
      createUser(
        username: $username,
        password: $password
      ) {
        id
      }
    }
  `

  const variables = {
    password,
    username
  }

  return api.request<{ createUser: User }>(mutation, variables)
    .then(r => r.createUser.id)
}
