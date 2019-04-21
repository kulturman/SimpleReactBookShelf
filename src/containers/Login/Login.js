import React, { useState , useContext } from "react";
import Spinner from '../../components/Spinner/Spinner';
import { useFormTextField } from '../../hooks/useFormTextField';
import authContext from '../../context/authContext';
import { LOGIN_REQUEST } from '../../graphql/queries';
import { getClientInstance } from '../../utils/utils';

const login = props => {

    const username = useFormTextField('');
    const password = useFormTextField('');
    const [ loading , setLoading ] = useState(false);
    const [ error , setError] = useState(null);
    const { login } = useContext(authContext);

    const onSubmitHandler = e => {
        e.preventDefault();
        setLoading(true);
        const client = getClientInstance();
        client.request(
            LOGIN_REQUEST , { username: username.value , password: password.value }
        )
        .then((res) => {
            const token = res.login;
            login(token);
            setLoading(false);
            props.history.push('/');
        })
        .catch(({ response }) => {
            if(response.errors) {
                const { data } = response.errors[0];
                setError(data);
            }
            setLoading(false);
        })
    }


    let content = <Spinner />

    if(!loading) {
        content = (
            <div className="container">
                <div className="page-header">
                    <h4>Log in</h4>
                </div>
                <form onSubmit={onSubmitHandler}>
                    <div className="row m-3">
                        <div className="col-md-6 col-md-offset-3">
                            <div
                                className={error ? "form-group has-error" : "form-group"}
                            >
                                <input
                                    type="text"
                                    name='username'
                                    className="form-control"
                                    placeholder="Username"
                                    {...username}
                                />
                                {
                                    error && error.auth && (
                                        <span className='error'> {error.auth[0]} </span>
                                    )
                                }
                            </div><br/>
                            <div className="form-group">
                                <input
                                    type="password"
                                    name='password'
                                    className="form-control"
                                    {...password}
                                    placeholder="Password"
                                />
                            </div>
                        
                        </div>
                    </div>
                    <div className="col-md-6 col-md-offset-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        )
    }

    return (
        <React.Fragment>
            {content}
        </React.Fragment>
    );
}

export default login;
