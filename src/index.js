import getBabelRelayPlugin from 'babel-relay-plugin'
import { parse, resolveSchema } from 'graphql-config-parser'
import { loopWhile } from 'deasync'

const config = parse()

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

if (error) {
  throw error
}

export default function (babel) {
  if (schema.data) {
    return getBabelRelayPlugin(schema.data)(babel)
  } else {
    return {
      visitor: {}
    }
  }
}
