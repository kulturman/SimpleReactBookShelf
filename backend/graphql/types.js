const { gql } = require('apollo-server');

const typeDefs = gql`
    type Book {
        _id: ID
        title: String
        subtitle: String
        description: String
        author: String
        publishedDate: String
        image: String
        category: String
        publisher: String
    }

    input CreateBookInput {
        title: String!
        subtitle: String!
        description: String!
        author: String!
        publishedDate: String!
        image: String!
        category: String!
        publisher: String!
    }

    input LoginInput {
        username: String
        password: String
    }

    type Query {
        getBooks: [Book]
        getBook(id: String): Book
        login(input: LoginInput): String
    }

    type Mutation {
        createBook(input: CreateBookInput!) : Book
    }
`;
module.exports = typeDefs;