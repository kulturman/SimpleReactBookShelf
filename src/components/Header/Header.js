import React , { useContext } from "react";
import { NavLink } from 'react-router-dom';
import authContext from '../../context/authContext';
import { withRouter } from 'react-router-dom';

const header = props => {
    const { isAthenticated , logout } = useContext(authContext);
    return (
        <div className="navbar navbar-default">
            <div className="container">
                <div className="navbar-header">
                    <NavLink to="/" className="navbar-brand" exact>
                        Bookshelf
                    </NavLink>
                    <button
                        className="navbar-toggle"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbar-main"
                    >
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                    </button>
                </div>
                <div className="navbar-collapse collapse" id="navbar-main">
                    <ul className="nav navbar-nav">
                        {
                            !isAthenticated && (
                                <li className="nav-item">
                                    <NavLink className="nav-link" to='/login' exact>
                                        Login
                                    </NavLink>
                                </li>
                            )
                        }

                        {
                            isAthenticated && (
                                <React.Fragment>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to='/new/book' exact>
                                            Add a book
                                        </NavLink>
                                    </li>
                                </React.Fragment>
                            )
                        }
                    </ul>

                    {
                        isAthenticated ? (
                            <ul className="nav navbar-nav  pull-right">
                                <li className="nav-item pull-right">
                                    <a className="nav-link" href='' exact onClick = {
                                        e => {
                                            e.preventDefault();
                                            props.history.push('/');
                                            logout();
                                        }
                                    }>
                                        Logout
                                    </a>
                                </li>
                            </ul>
                        ) : null
                    }
                    
                </div>
            </div>
        </div>
    );
};

export default withRouter(header);
