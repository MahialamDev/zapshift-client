import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation, } from 'react-router';
import LoadingAnimation from '../Components/Loader/LoadingAnimation/LoadingAnimation';

const PrivateRouter = ({ children }) => {

    const { user, loading } = useAuth();
    const location = useLocation();
    // console.log('location', location)

    if (loading) return <LoadingAnimation />

    // if (!user) return <Navigate state={location.pathname} to='/login' />;

    if (!user) {
  return <Navigate to="/login" state={{ from: location }} replace />;
}

    return children;
};

export default PrivateRouter;