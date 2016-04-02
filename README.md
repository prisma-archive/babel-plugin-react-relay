# babel-plugin-react-relay [![npm version](https://badge.fury.io/js/babel-plugin-react-relay.svg)](https://badge.fury.io/js/babel-plugin-react-relay)
Babel plugin for [Relay](https://github.com/facebook/relay) `react-relay` with support for multiple source types (`json`, `schema`, `url`)

## Install

```sh
$ npm install -D babel-plugin-react-relay
```

## Configuration

Add one the following source options to your `package.json` file.

### Source Types

#### JSON

```json
{
  "graphql": {
    "json": "./exported-schema.json"
  }
}
```

#### Schema

```json
{
  "graphql": {
    "schema": "./schema-definition.js"
  }
}
```

#### URL

```json
{
  "graphql": {
    "url": "http://localhost:3000/schema.json"
  }
}
```

### Options

#### Environment Variables

Sometimes you need the flexibility to dynamically configure your GraphQL schema source via environment variables. You can easily to that using the following syntax (works for all source types):

```json
{
  "graphql": {
    "url": {
    	"env": "SCHEMA_ENDPOINT"
    }
  }
}
```

This example uses the `$SCHEMA_ENDPOINT` environment variable.

## License

[MIT License](http://opensource.org/licenses/MIT)