import React , { useState , useEffect }  from "react";
import Spinner from "../../components/Spinner/Spinner";
import Book from '../../components/Book/Book';
import { GET_SINGLE_BOOK_QUERY } from '../../graphql/queries';
import { getClientInstance } from '../../utils/utils';

const bookPage = props => {

    const [ book , setBook ] = useState(null);

    const onReturnToLibraryHandler = () => {
        props.history.push('/');
    }

    useEffect(() => {
        const id = props.match.params.id;
        const fetchBook = async () => {
            const client = getClientInstance();
            const { getBook } = await client.request(GET_SINGLE_BOOK_QUERY , { id });
            setBook(getBook);
        };
        fetchBook();
    } , []);

    let content = <Spinner />;
    if (book) {
        content = (
            <Book book={book}/>
        );
    }
    return (
            <div className="row m-3">
                {content}
                <div className="col-md-6 col-md-offset-3">
                    <button type="button" className="btn btn-primary"
                        onClick={onReturnToLibraryHandler}>
                        Retourner à la bibliothèque
                    </button>
                </div>
            </div>
    );
}

export default bookPage;
