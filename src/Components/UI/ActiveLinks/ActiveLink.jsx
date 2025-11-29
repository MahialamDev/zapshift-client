import React from 'react';
import { NavLink } from 'react-router';

const ActiveLink = ({children, className, to}) => {
    return (
        <NavLink
            to={to}
            className={({isActive})=> `${isActive ? 'bg-primary' : ''} ${className}`}
        >
            {children}
        </NavLink>
    );
};

export default ActiveLink;