import React from 'react';

const Book = props => {
    return (
        <div className="col-md-6 col-md-offset-3">
            <h2 className="text-center">{props.book.title}</h2>

            <h6 className="text-center">{props.book.subtitle}</h6>

            <div className="m-3">
                <img
                    className="rounded center-block"
                    src={props.book.image}
                    alt=''
                />
            </div>

            <dl>
                <dt>Description</dt>
                <dd>
                    <p>
                        {props.book.description}
                    </p>
                </dd>

                <dt>Autheur(s)</dt>
                <dd>{props.book.author}</dd>

                <dt>Categorie</dt>
                <dd>
                    <span className="mr-1 badge badge-pill badge-default">
                        {props.book.category}
                    </span>
                </dd>

                <dt>Date de publication</dt>
                <dd>{props.book.publishedDate}</dd>

                <dt>Editeur</dt>
                <dd>{props.book.publisher}</dd>
            </dl>
        </div>
    );
};

export default Book;