# babel-plugin-react-relay [![npm version](https://badge.fury.io/js/babel-plugin-react-relay.svg)](https://badge.fury.io/js/babel-plugin-react-relay)
Babel plugin for [Relay](https://github.com/facebook/relay) which works out of the box with your GraphQL endpoint

#### How does this relate to [babel-relay-plugin](https://www.npmjs.com/package/babel-relay-plugin)?

This package uses `babel-relay-plugin` internally but **makes usage more convenient** and extends its functionality. For example you no longer need to have a `build/babelRelayPlugin.js` script.

(The version is the same as `babel-relay-plugin` by the way.)

## Install

```sh
$ npm install -D babel-plugin-react-relay
```

## Configuration

> Note: We recently switched over to [graphql-config](https://github.com/graphcool/graphql-config), so this might be a breaking change for you.

### Step 1: Add plugin to `.babelrc`

Add the following to your `.babelrc` file or the corresponding babel configuration.

```json
{
	"plugins": ["react-relay"]
}
```

### Step 2: Configure your GraphQL schema

This plugin uses the [graphql-config](https://github.com/graphcool/graphql-config) format and already works out of the box if you're using another GraphQL dev tool such as [this great IntelliJ Plugin](https://github.com/jimkyndemeyer/js-graphql-intellij-plugin).

Add one of the following source options to your `package.json` file. **See [here](https://github.com/graphcool/graphql-config#usage) for more configuration details.**

For your convenience, here is the easiest way to configure your GraphQL endpoint:

```sh
export GRAPHQL_ENDPOINT="https://your.api/graphql"
```

## Troubleshooting

### Using `graphql-js` as configuration option

For those intending to directly reference their backend `schema.js`, you will need to ensure a single version of `graphql` exists in `node_modules`. However as of this writing, `babel-relay-plugin` and `graphql-config-parser` reference incompatible versions of `graphql` ([context](https://github.com/facebook/relay/issues/1400)). A workaround is to force the graphql dependency within `npm-shrinkwrap.json` at your project's root (make sure to adapt as currently relevant):

```
{
  "dependencies": {
    "babel-relay-plugin": {
      "version": "0.9.3",
      "from": "babel-relay-plugin@0.9.3",
      "dependencies": {
        "graphql": {
          "version": "0.7.1",
          "from": "graphql@0.6.2"
        }
      }
    }
  }
}
```

Then run `npm prune`, `npm install` and `npm dedupe` for good measure.

## License

[MIT License](http://opensource.org/licenses/MIT)


## Help & Community [![Slack Status](https://slack.graph.cool/badge.svg)](https://slack.graph.cool)

Join our [Slack community](http://slack.graph.cool/) if you run into issues or have questions. We love talking to you!

![](http://i.imgur.com/5RHR6Ku.png)
