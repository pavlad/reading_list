import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { GET_BOOK } from '../queries/queries'

class BookDetails extends Component {
  displayBookDetails() {
    const { book } = this.props.data

    if (book) {
      const { name, genre, author } = book

      return(
        <div>
          <h2>{name}</h2>
          <p>{genre}</p>
          <p>{author.name}</p>
          <p>All books from this author:</p>
          <ul className="other-books">
            { author.books.map(item => {
              return <li key={item.id}>{item.name}</li>
            })}
          </ul>
        </div>
      )
    } else {
      return <div>No book selected</div>
    }
  }
  render() {
    return(
      <div id="book-details">
        {this.displayBookDetails()}
      </div>
    )
  }
}

export default graphql(GET_BOOK, {
  options: (props) => {
    return {
      variables: {
        id: props.bookId
      }
    }
  }
})(BookDetails)
