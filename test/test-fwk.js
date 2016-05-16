import supertest from 'supertest'
import 'should'
import 'should-http'
export config from '../config.json'

const url = process.env.URL ||
  process.env.PORT
    ? `localhost:${process.env.PORT}`
    : config.url
export const server = supertest.agent(url)

export function resource(resourceName, description) {
  return describe(`Resource /${resourceName}`, description)
}
