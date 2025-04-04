import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Component for protected routes
const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  // Show loading or redirect if not authenticated
  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/connexion" />;
};

export default PrivateRoute;
