import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { GET_BOOKS } from '../queries/queries'

// components
import BookDetails from './BookDetails'

class BookList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedBookId: null
    }
  }

  displayBooks() {
    var data = this.props.data
    if(data.loading){
      return <div>Loading</div>
    } else {
      return data.books.map(book => {
        return(
          <li key={book.id} onClick={() => { this.setState({ selectedBookId: book.id }) }}>{book.name}</li>
        )
      })
    }
  }
  render() {
    return (
      <div>
        <ul id='book-list'>
          { this.displayBooks() }
          <BookDetails bookId={this.state.selectedBookId} />
        </ul>
      </div>
    )
  }
}

export default graphql(GET_BOOKS)(BookList)
