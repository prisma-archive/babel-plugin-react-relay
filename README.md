# babel-plugin-react-relay [![npm version](https://badge.fury.io/js/babel-plugin-react-relay.svg)](https://badge.fury.io/js/babel-plugin-react-relay)
Babel plugin for [Relay](https://github.com/facebook/relay) `react-relay` with support for multiple source types (`json`, `schema`, `url`)

#### How does this relate to [babel-relay-plugin](https://www.npmjs.com/package/babel-relay-plugin)?

This package uses `babel-relay-plugin` internaly but **makes usage more convenient** and extends its functionality. For example you no longer need to have a `build/babelRelayPlugin.js` script.

## Install

```sh
$ npm install -D babel-plugin-react-relay
```

## Configuration

### Step 1: Add babel plugin

Add the following to your `.babelrc` file or the corresponding babel configuration.

```json
{
	"plugins": ["react-relay"]
}
```

### Step 2: Configure source

Add one the following source options to your `package.json` file.

#### JSON

`json` imports an static GraphQL schema exported as a JSON file

```json
{
  "graphql": {
    "json": "./exported-schema.json"
  }
}
```


#### URL

`url` is similar to `json` but expects the schema path to be an URL

```json
{
  "graphql": {
    "url": "http://localhost:3000/schema.json"
  }
}
```

#### Schema

`schema` expects a Javascript schema definition based on [graphql-js](https://github.com/graphql/graphql-js)

```json
{
  "graphql": {
    "schema": "./schema-definition.js"
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