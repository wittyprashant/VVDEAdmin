import React from 'react'
import {  Navigate } from 'react-router-dom'
import { usePermify } from '@permify/react-role';

const AuthenticatedRoute = ({ children, redirectTo }) => {
    const { setUser } = usePermify();

    const auth = JSON.parse( localStorage.getItem("userDetail") )
    console.log('Auth : ' + auth);
    console.log('Test');
    
    if(auth && auth.roleId){
        setUser({
            id: auth.userId,
            roles: [ auth.roleId],
         })
    }
    // return auth?.token === null || typeof(auth?.token) === "undefined" ? children : <Navigate to={redirectTo} />;
    return auth?.token === null || typeof(auth?.token) === "undefined" ? children : <Navigate to={redirectTo} />;
}

export default AuthenticatedRoute