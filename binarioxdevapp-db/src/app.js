const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./typeDefs')
const resolvers = require('./resolves')

module.exports = new ApolloServer({
    typeDefs,
    resolvers
})