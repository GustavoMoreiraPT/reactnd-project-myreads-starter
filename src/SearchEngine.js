import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import { Book } from './Book';

class SearchEngine extends Component {
    state = {
        query: '',
        books: []
    }

    updateQuery = (query) => {
        const { matchedBooks } = this.props;
        this.setState({query: query})
        if(query !== '') {
            console.log("Query is:")
            console.log(query)
            BooksAPI.search(query)
            .then(books => {
                console.log('-----------------------');
                if(!books === undefined || books.error) {
                    this.setState({books: []});
                }
              if(!Array.isArray(books)) {
                  return [];
              } else {
                  console.log("Risky");
                  this.setState({
                      books: books.map(b => {
                        var target = matchedBooks.filter(fb => fb.id === b.id);
                        if (target[0]) {b.shelf = target[0].shelf}
                        return b;
                      })
                    });
              }
            });
        } else {
            console.log('I am on an empty query');
            this.setState({query: ''});
            this.setState({books: []});
        }
      }

    render() {
        const { onBookMoved } = this.props;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={this.state.query}
                            onChange={(event) => this.updateQuery(event.target.value)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <Book
                        books={this.state.books}
                        onBookMoved={onBookMoved}/>
                </div>
            </div>
        );
    }
}

export default SearchEngine;