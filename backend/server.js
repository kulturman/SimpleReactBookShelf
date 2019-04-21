const { ApolloServer } = require('apollo-server');
const typeDefs = require('./graphql/types');
const resolvers = require('./graphql/resolvers');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const { formatErrors } = require('./utils/util');

mongoose.connect('mongodb://localhost:27017/bootcamp-app' , { useNewUrlParser: true })
    .then(() => console.log('Connected to mongoDB'));

const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: err => {
        const { code } = err.extensions;
        if(code == 'BAD_USER_INPUT') {
            const data = formatErrors(err.extensions.exception.data);
            return {
                status: 422,
                message: 'Unprocessable entity',
                data
            }
            
        }
        return err;
    },
    context: async ({ req }) => {
        let currentUser = null;
        const token = req.header('x-auth-token');
        if(token) {
            try {
                const payload = jwt.verify(token , 'NoSecretKey');
                currentUser = await User.findById(payload._id);
            }
            catch(err) {

            }
        }
        return {
            currentUser
        }
    }
});

server.listen()
    .then(({ url }) => console.log(`App running at ${url}`));
