const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },

    subtitle: {
        type: String,
        required: true,
    },

    category: {
        type: String,
        required: true,
    },

    author: {
        type: String,
        required: true,
    },

    publisher: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        required: true,
    },

    publishedDate: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    }

});

const Book = mongoose.model('Book' , schema);

module.exports = Book;