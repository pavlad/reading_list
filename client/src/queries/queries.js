import { gql } from 'apollo-boost'

const GET_BOOKS = gql`
  {
    books {
      id
      name
    }
  }
`

const GET_AUTHORS = gql`
  {
    authors {
      name
      id
    }
  }
`

const ADD_BOOK = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      id
      name
      genre
    }
  }
`

const GET_BOOK = gql`
  query($id: ID!) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          id
          name
        }
      }
    }
  }
`

export { GET_AUTHORS, GET_BOOKS, ADD_BOOK, GET_BOOK }