import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {useContext} from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoute = () => {
    let {user} = useContext(AuthContext);
    // If authorized, return an outlet that will render child elements, outlet renders the child element
    // If not, return element that will navigate to login page
    return user ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;