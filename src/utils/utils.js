import { GraphQLClient } from 'graphql-request';

export const getClientInstance = () => {
    return new GraphQLClient('http://localhost:4000/graphql' , {
        headers: {
            "x-auth-token" : localStorage.getItem('auth-token') 
        }
    });
}