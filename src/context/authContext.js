import { createContext } from 'react';

const authContext = createContext({
    isAthenticated: false,
    token: null,
    login: () => {},
    logout: () => {},
})

export default authContext;