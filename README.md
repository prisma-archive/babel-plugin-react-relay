# babel-plugin-react-relay [![npm version](https://badge.fury.io/js/babel-plugin-react-relay.svg)](https://badge.fury.io/js/babel-plugin-react-relay)
Babel plugin for [Relay](https://github.com/facebook/relay) `react-relay` with easy schema configuration in `.babelrc`

## Install

```sh
$ npm install -D babel-plugin-react-relay
```

## Configuration

Add the following to your `.babelrc` file.

```json
{
  "plugins": [
    ["react-relay", {
      "file": "./support/schema.json"
    }]
  ]
}
```
