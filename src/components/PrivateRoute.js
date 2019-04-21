import React , { useContext } from 'react';
import authContext from '../context/authContext';
import { Redirect , Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component , ...rest}) => {
    const { isAthenticated } = useContext(authContext);
    return (
        <Route
            {...rest}
            render={props => isAthenticated ? <Component {...props} /> : <Redirect to='/login'/>}
        />
    )
};

export default PrivateRoute;