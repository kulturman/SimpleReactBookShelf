const Book = require('../models/book');
const User = require('../models/user');
const { authenticated , createBook } = require('../controllers/bookController');
const { UserInputError } = require('apollo-server');

const resolvers = {
    Query: {
        getBooks: async () => {
            return await Book.find();
        },

        getBook: async (root , { id }) => {
            return await Book.findById(id);
        },

        login: async (root , args) => {
            const {username , password} = args.input;
            const user = await User.findOne({
                username,
                password
            })

            if(!user) {
                const errors = [];
                errors.push({
                    field: "auth",
                    message: 'Wrong username or password'
                })
                const error = new UserInputError();
                error.data = errors;
                throw error;
            }
            return user.generateToken();
        }
    },

    Mutation: {
        createBook: authenticated(createBook)
    }
};

module.exports = resolvers;