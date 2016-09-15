'use strict';

var babelRelayPlugin = require('babel-relay-plugin');
var graphqlConfigParser = require('graphql-config-parser');
var deasync = require('deasync');

var config = graphqlConfigParser.parse();

var wait = true;
var schema, error;

graphqlConfigParser.resolveSchema(config).then(function (result) {
  schema = result;
  wait = false;
}).catch(function (err) {
  error = err;
  wait = false;
});

// TODO find a cleaner way to do this
deasync.loopWhile(function () {
  return wait;
});

if (error) {
  throw error;
}

module.exports = function (babel) {
  if (schema.data) {
    return babelRelayPlugin(schema.data)(babel);
  } else {
    return {
      visitor: {}
    };
  }
};
