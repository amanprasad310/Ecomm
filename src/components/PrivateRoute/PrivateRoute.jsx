import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRoute() {
    // console.log("chat gp")
    const currentUser = localStorage.getItem('myData');
    // console.log(currentUser);
    return currentUser ? <Outlet /> : <Navigate to="/login" />;
}
