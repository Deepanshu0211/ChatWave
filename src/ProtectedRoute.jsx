import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, ...rest }) => {
  // Check if user is authenticated, replace `isAuthenticated` with your actual logic
  const isAuthenticated = true; // For example purposes, assume user is always authenticated

  return isAuthenticated ? <Route {...rest} element={element} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
