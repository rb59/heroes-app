import React, { useEffect, useReducer } from 'react';
import { AuthContext } from './auth/AuthContext';
import { authReducer } from './auth/authReducer';
import { AppRouter } from './routers/AppRouter';
// import PropTypes from 'prop-types';

const init = () => {
    return JSON.parse(localStorage.getItem('user')) || {
        logged: false
    }
};
const HeroesApp = () => {

    const [user, dispatch] = useReducer(authReducer, {}, init);

    useEffect(() => {
        localStorage.setItem('user',JSON.stringify(user));
        
    }, [user]);
    return (
        <AuthContext.Provider value={{user,dispatch}}>
            <AppRouter />
        </AuthContext.Provider>
    );
};

// HeroesApp.propTypes = {

// };

export default HeroesApp;
