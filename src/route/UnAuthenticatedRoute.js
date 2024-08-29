import React from 'react'
import {  Navigate } from 'react-router-dom'

const UnAuthenticatedRoute = ({ children, redirectTo }) => {
    const auth = JSON.parse( localStorage.getItem("userDetail") )
    return auth?.token !== null && typeof(auth?.token) !== "undefined" ? children : <Navigate to={redirectTo} />;
}

export default UnAuthenticatedRoute