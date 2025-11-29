import React from 'react';

const PrimaryBtn = ({children, className}) => {
    return (
        <button className={`cursor-pointer bg-primary py-2 px-5 font-semibold border-primary transition duration-300 text-black hover:bg-transparent border-2 ${className}`}>{children}</button>
    );
};

export default PrimaryBtn;