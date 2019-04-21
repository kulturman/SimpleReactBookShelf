import React , { useState } from "react";
import Header from './components/Header/Header';
import Library from './components/Library/Library';
import { Switch , Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import BookPage from './containers/BookPage/BookPage';
import Login from './containers/Login/Login';
import NewBook from './containers/NewBook/NewBook';
import AuthContext from './context/authContext';

const app = () => {
    const [ token , setToken ] = useState(localStorage.getItem('auth-token'));
    const [ isAuth , setIsAuth ] = useState(token != null);
    return (
        <div className="App">
            <AuthContext.Provider value = {{
                isAthenticated: isAuth,
                token,
                login: token => {
                    setIsAuth(true);
                    setToken(token);
                    localStorage.setItem('auth-token' , token);
                },
                logout: () => {
                    setIsAuth(false);
                    setToken(null);
                    localStorage.removeItem('auth-token');
                }
            }}>
                <Header />
                <div className="m-t-1">
                    <Switch>
                        <Route path='/' component={Library} exact/>
                        <Route path='/book/:id' component={BookPage} exact/>
                        <Route path='/login' component={Login} exact/>
                        <PrivateRoute path='/new/book' component={NewBook} exact/>
                    </Switch>
                </div>
            </AuthContext.Provider>
        </div>
    );
}
export default app;
