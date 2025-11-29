import React from 'react';

const TransparentBtn = ({children, className}) => {
    return (
         <button className={`bg-transparent border border-primary py-2 px-5 rounded-4xl font-semibold text-primary ${className}`}>{children}</button>
    );
};

export default TransparentBtn;