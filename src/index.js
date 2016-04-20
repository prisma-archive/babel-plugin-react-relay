import { resolve } from 'path'
import getBabelRelayPlugin from 'babel-relay-plugin'
import { graphql } from 'graphql'
import { introspectionQuery } from 'graphql/utilities'
import { loopWhile } from 'deasync'
import request from 'sync-request'

const packageJson = require(`${process.cwd()}/package.json`)
const config = packageJson['react-relay-schema']

if (!config) {
  throw new Error('\nNo relay schema configuration found in package.json.\nPlease provide a schema endpoint for the key "react-relay-schema"')
}

let source
if (typeof config === 'object') {
  source = process.env[config.env]
} else {
  source = config
}

let sourceType
if (source.startsWith('http')) {
  sourceType = 'url'
} else if (source.endsWith('json')) {
  sourceType = 'json'
} else if (source.endsWith('js')) {
  sourceType = 'schema'
} else {
  throw new Error('Invalid relay schema source')
}

let schemaData
switch (sourceType) {

  case 'schema':
    const schemaSource = require(resolve(source))
    let wait = true

    graphql(schemaSource, introspectionQuery)
      .then((result) => {
        schemaData = result.data
        wait = false
      })

    // TODO find a cleaner way to do this
    loopWhile(() => wait)

    break

  case 'json':
    const schema = require(resolve(source))
    schemaData = schema.data

    break

  case 'url':
    const res = request('GET', source)
    if (res.statusCode !== 200) {
      throw new Error(`Couldn't fetch schema from ${source}`)
    }

    const result = JSON.parse(res.getBody())
    schemaData = result.data

    break

  default:
    throw new Error('Invalid method. Valid keys are `schema, json, url`')
}

console.log(`\nRelay schema successfully loaded from ${source}`)

export default function (babel) {
  if (schemaData) {
    return getBabelRelayPlugin(schemaData)(babel)
  } else {
    return {
      visitor: {}
    }
  }
}
