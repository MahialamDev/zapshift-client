import React from 'react';

const MyContainer = ({children, className}) => {
    return (
        <div className={`px-4 md:px-6 max-w-7xl mx-auto ${className}`}>
            {children}
        </div>
    );
};

export default MyContainer;