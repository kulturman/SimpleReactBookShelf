const Book = require('../models/book');
const { UserInputError , AuthenticationError } = require('apollo-server');
const validator = require('validator');

const authenticated = next => (root , args , ctx , info) => {
    if(ctx.currentUser) {
        return next(root , args , ctx , info);
    }
    throw new AuthenticationError('You must be authenticated to access this resource');
}

const createBook = async (root , { input }) => {
    const errors = [];
    const fields = [
        'title' , 'subtitle' , 'publishedDate' , 'publisher' , 'image',
        'author' , 'category' , 'description'
    ];

    fields.forEach(field => {
        if(validator.isEmpty(input[field])) {
            errors.push({
                field,
                message: `${field} cannot be empty`
            })
        }
    })

    if(errors.length > 0) {
        const error = new UserInputError();
        error.data = errors;
        throw error;
    }
    const book = new Book({...input});
    return await book.save();
}

module.exports = {
    authenticated,
    createBook
}