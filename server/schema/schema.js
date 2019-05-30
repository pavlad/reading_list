const graphql = require('graphql')
const _ = require('lodash')
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql

// dummy data
var books = [
  { name: 'Cool book 1', genre: 'Fantasy', id: '1', authorId: '3' },
  { name: 'Cool book 2', genre: 'Crime', id: '2', authorId: '2' },
  { name: 'Cool book 3', genre: 'Fantasy', id: '3', authorId: '1' }
]

var authors = [
  { name: 'Cool author 1', age: 21, id: '1' },
  { name: 'Cool author 2', age: 95, id: '2' },
  { name: 'Cool author 3', age: 77, id: '3' }
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, { id: parent.authorId })
      }
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorId: parent.id })
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: { 
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(books, { id: args.id })
      }
     },
     books: {
       type: GraphQLList(BookType),
       resolve(parent, args) {
         return books
       }
     },
     author: {
       type: AuthorType,
       args: { id: { type: GraphQLID } },
       resolve(parent, args) {
         return _.find(authors)
       }
     },
     authors: {
       type: GraphQLList(AuthorType),
       resolve(parent, args) {
         return authors
       }
     }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
