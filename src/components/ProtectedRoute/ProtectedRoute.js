import React from 'react';
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route>
      {
        () => localStorage.getItem('token') ? <Component {...props} /> : <Redirect to='/' />
      }
    </Route>
)}
