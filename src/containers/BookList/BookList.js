import React , { useState , useEffect } from "react";
import Spinner from '../../components/Spinner/Spinner';
import { Link } from 'react-router-dom';
import { getClientInstance } from '../../utils/utils';
import { GET_BOOKS_QUERY } from '../../graphql/queries';

const bookList = () => {

    const [ books , setBooks ] = useState(null);
    const [ loading , setLoading ] = useState(true);
    let content = null;
    useEffect(() => {
        const fetchBooks = async () => {
            const client = getClientInstance();
            const { getBooks } = await client.request(GET_BOOKS_QUERY);
            setBooks(getBooks);
            setLoading(false);
        };
        fetchBooks();
    } , []);

    if(loading) {
        content = <Spinner />
    }

    else if(books && !loading) {
        content = books.map(book => 
            <div className="col-md-4 col-lg-3 col-sm-1" key={book._id}>
                <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        <Link 
                            to={{
                                pathname: '/book/' + book._id
                            }}>
                            {book.title}
                        </Link>
                    </h3>
                </div>
                <div className="panel-body text-center">
                    <h6 className="card-subtitle mb-2 text-muted">
                        {book.subtitle}
                    </h6>
                    <div className="card-text">
                        <span className="mr-1 badge badge-pill badge-default">
                            {book.category}
                        </span>
                    </div>
                </div>
                <img
                    className="book-thumbnail"
                    src={book.image}
                    alt=""
                />
                <div className="panel-footer">
                    <span>
                    by
                    <span> {book.author}</span>
                    </span>
                </div>
                </div>
            </div>
        )

    }

    return (
        <div className="row m-3">
            {content}
        </div>
    );
}

export default bookList;
