import getBabelRelayPlugin from 'babel-relay-plugin'
import { parse, resolveSchema } from 'graphql-config-parser'
import { loopWhile } from 'deasync'

const config = parse()

export default function (babel) {
  let wait = true
  let schema, error

  resolveSchema(config)
    .then((result) => {
      schema = result
      wait = false
    })
    .catch((err) => {
      error = err
      wait = false
    })

  // TODO find a cleaner way to do this
  loopWhile(() => wait)

  // this error could happen while downloading the schema
  if (error) {
    throw error
  }

  if (schema.errors) {
    throw new Error(JSON.stringify(schema.errors))
  }

  if (schema.data) {
    return getBabelRelayPlugin(schema.data)(babel)
  } else {
    return {
      visitor: {}
    }
  }
}
