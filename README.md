# babel-plugin-react-relay [![npm version](https://badge.fury.io/js/babel-plugin-react-relay.svg)](https://badge.fury.io/js/babel-plugin-react-relay)
Babel plugin for [Relay](https://github.com/facebook/relay)  with support for multiple source types

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

### Step 2: Configure schema source

Add one the following source options to your `package.json` file.

#### JSON

Imports a static GraphQL schema exported as a JSON file

```json
{
  "react-relay-schema": "./exported-schema.json"
}
```


#### URL

You can also provide an URL to a schema endpoint. Use this method if you're using [graph.cool](https://graph.cool/).

```json
{
  "react-relay-schema": "http://localhost:3000/schema.json"
}
```

#### Schema

[graphql-js](https://github.com/graphql/graphql-js) schema definition are also supported.

```json
{
  "react-relay-schema": "./schema-definition.js"
}
```

### Options

#### Environment Variables

Sometimes you need the flexibility to dynamically configure your GraphQL schema source via environment variables. You can easily to that using the following syntax (works for all source types):

```json
{
  "react-relay-schema": {
	"env": "SCHEMA_ENDPOINT"
  }
}
```

This example uses the `$SCHEMA_ENDPOINT` environment variable.

## License

[MIT License](http://opensource.org/licenses/MIT)