const graphql = require('graphql')
const _ = require('lodash')
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql

// dummy data
var books = [
  { name: 'Cool book 1', genre: 'Fantasy', id: '1' },
  { name: 'Cool book 2', genre: 'Crime', id: '2' },
  { name: 'Cool book 3', genre: 'Fantasy', id: '3' }
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: { 
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return _.find(books, { id: args.id })
      }
     }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
