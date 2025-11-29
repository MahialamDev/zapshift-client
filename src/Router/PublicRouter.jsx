import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate } from 'react-router';

const PublicRouter = ({children}) => {
    const {user, loading} = useAuth()
    if(loading) return <p>Loading...</p>
    if (!user) return children;
    if (user) {
        return <Navigate to='/' />
    }
};

export default PublicRouter;