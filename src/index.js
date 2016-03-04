import { resolve } from 'path'
import getbabelRelayPlugin from 'babel-relay-plugin'
import { graphql } from 'graphql'
import { introspectionQuery } from 'graphql/utilities'
import { loopWhile } from 'deasync'

export default function (babel) {
  const path = resolve('./schema.js')
  const schema = require(path)

  let json
  let wait = true

  graphql(schema, introspectionQuery)
    .then((result) => {
      json = result
      wait = false
    })

  loopWhile(() => wait)

  console.log(json);

  return getbabelRelayPlugin(json.data)(babel)
}
