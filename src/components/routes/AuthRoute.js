import React, {useEffect} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {getAuthUserAction} from "../actions/authActions";
import {useDispatch, useSelector} from "react-redux";

const AuthRoute = ({component: Component, ...props}) => {
    const dispatch = useDispatch();
    const getAuthUser = () => dispatch(getAuthUserAction());
    const {user, loading} = useSelector(state => state.auth);

    useEffect(() => {
        getAuthUser();
        // eslint-disable-next-line
    }, []);

    if (loading){
        return <h1>Cargando...</h1>
    }else{
        return (
            <Route {...props}
                   render={props => !user && !loading ?
                       <Redirect to={'/'}/>
                       : <Component/>
                   }>
            </Route>
        );
    }

};
export default AuthRoute;