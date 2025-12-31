import React from 'react';

const MyContainer = ({children, className}) => {
    return (
        <div className={`px-4 md:px-6 max-w-7xl mx-auto border border-gray-300 rounded-2xl py-4  ${className}`}>
            {children}
        </div>
    );
};

export default MyContainer;