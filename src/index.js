import { resolve } from 'path'
import getBabelRelayPlugin from 'babel-relay-plugin'
import { graphql } from 'graphql'
import { introspectionQuery } from 'graphql/utilities'
import { loopWhile } from 'deasync'
import request from 'sync-request'

const packageJson = require(`${process.cwd()}/package.json`)

const method = Object.keys(packageJson.graphql)[0]
let value = packageJson.graphql[method]

if (value !== null && typeof value === 'object') {
  value = process.env[value.env]
}

let schemaData

switch (method) {

  case 'schema':
    const schemaSource = require(resolve(value))
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
    const schema = require(resolve(value))
    schemaData = schema.data

    break

  case 'url':
    const res = request('GET', value)
    const result = JSON.parse(res.getBody())
    schemaData = result.data

    break

  default:
    throw new Error('Invalid method. Valid keys are `schema, json, url`')
}

console.log(`GraphQL successfully schema loaded from ${value}`)

export default function (babel) {
  if (schemaData) {
    return getBabelRelayPlugin(schemaData)(babel)
  } else {
    return {
      visitor: {}
    }
  }
}
