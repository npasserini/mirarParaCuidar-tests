import supertest from 'supertest'
import 'should'
import 'should-http'
import config from '../config.json'
export {config}

const url = process.env.URL ||
  (process.env.PORT
    ? `${config.host}:${process.env.PORT}`
    : `${config.host}:${config.port}${config.basePath}`);
export const server = supertest.agent(url)

export function resource(resourceName, description) {
  return describe(`Resource /${resourceName}`, description)
}
