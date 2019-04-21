import React from "react";
import BookList from '../../containers/BookList/BookList';

const library = () => {
    return (
      <div className="container">
        <div className="page-header">
          <h4>Bibliothèque</h4>
        </div>
        <BookList />
      </div>
    );
}

export default library;
