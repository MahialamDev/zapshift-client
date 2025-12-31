import React from 'react';
import { NavLink } from 'react-router';

const ActiveLink = ({children, className, to}) => {
    return (
        <NavLink
            to={to}
            className={({isActive})=> `text-sm ${isActive ? 'md:bg-primary' : ''} ${className}`}
        >
            {children}
        </NavLink>
    );
};

export default ActiveLink;