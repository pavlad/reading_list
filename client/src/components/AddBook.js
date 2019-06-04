import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { GET_AUTHORS, ADD_BOOK, GET_BOOKS } from '../queries/queries'

class AddBook extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      genre: '',
      authorId: ''
    }
  }

  displayAuthors() {
    var data = this.props.GET_AUTHORS

    if(data.loading) {
      return <option>Loading authors</option>
    } else {
      return data.authors.map(author => {
        return <option key={author.id} value={author.id}>{author.name}</option>
      })
    }
  }

  submitForm(e) {
    e.preventDefault()
    let { name, genre, authorId } = this.state

    this.props.ADD_BOOK({
      variables: {
        name,
        genre,
        authorId
      },
      refetchQueries: [{ query: GET_BOOKS }]
    })
  }

  render() {
    return (
      <form id="add-book" onSubmit={ this.submitForm.bind(this) }>
        <div className="field">
          <label>Book name:</label>
          <input type="text" onChange={(e) => this.setState({ name: e.target.value })}/>
        </div>

        <div className="field">
          <label>Genre:</label>
          <input type="text" onChange={(e) => this.setState({ genre: e.target.value })}/>
        </div>

        <div className="field">
          <label>Author:</label>
          <select onChange={(e) => this.setState({ authorId: e.target.value })}>
            {this.displayAuthors()}
          </select>
        </div>

        <button>+</button>
      </form>
    )
  }
}

export default compose(
  graphql(GET_AUTHORS, { name: 'GET_AUTHORS' }),
  graphql(ADD_BOOK, { name: 'ADD_BOOK' })
)(AddBook)
