import React from 'react';
import logo from '../../../assets/logo.png'
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link className='flex items-end ' to='/'>         
            <img src={logo} alt="" /> 
            <h3 className='text-2xl -mx-2 font-semibold'>ZapShift</h3>
        </Link>
    );
};

export default Logo;