const { loadFilesSync } = require('@graphql-tools/load-files')
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const fs = require('fs')
const path = require('path')

const getTypeDefs = () => {
  const gqlFiles = loadFilesSync(path.join(__dirname, '../src'), {
    extensions: ['gql', 'graphql']
  })
  const typeDefs = mergeTypeDefs(gqlFiles, { all: true })
  return typeDefs
}

const getResolvers = () => {
  const resolverFiles = loadFilesSync(path.join(__dirname, '../src'), {
    extensions: ['js']
  })
  return mergeResolvers(resolverFiles)
}

module.exports = {
  mergeSchema: makeExecutableSchema({
    typeDefs: getTypeDefs(),
    resolvers: getResolvers()
  })
}
