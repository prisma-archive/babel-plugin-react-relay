const graphql = require('graphql')

const GREETINGS = {
  hello: 'Hello world',
};

const GreetingsType = new graphql.GraphQLObjectType({
  name: 'Greetings',
  fields: () => ({
    hello: {type: graphql.GraphQLString},
  }),
});

module.exports = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      greetings: {
        type: GreetingsType,
        resolve: () => GREETINGS,
      },
    }),
  }),
});
