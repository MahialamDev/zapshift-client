import React from 'react';

const MySection = ({children, className}) => {
    return (
        <section className={`my-5 py-5 ${className}`}>
            {children}
        </section>
    );
};

export default MySection;