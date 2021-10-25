import React, { Component } from 'react';
import ShelfSelector from './ShelfSelector';

export class Book extends Component {
    render() {
        const { books, onBookMoved } = this.props;

        if (books !== undefined && books.length > 0) {
            console.log(books);
            return (
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book) => (
                            <li key={book.id} className="book-list-item">
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:  `url(${book.imageLinks !== undefined ? book.imageLinks.thumbnail:""})` }}/>
                                        <ShelfSelector
                                            book={book}
                                            onBookMoved={onBookMoved} />
                                    </div>
                                    {book.authors !== undefined && 
                                     <div className="book-authors"> Written by: {book.authors.map((author) => author)}</div>
                                    }
                                    {book.authors === undefined && 
                                     <div className="book-authors"> Unknown Writer</div>
                                    }
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            );
        } else {
            return <div></div>;
        }
    }
}

export default Book;