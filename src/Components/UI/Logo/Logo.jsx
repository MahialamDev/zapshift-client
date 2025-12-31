import React from 'react';
import logo from '../../../assets/logo.png'
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link className='flex items-end ' to='/'>         
            <div className='h-10 md:h-12'>
                <img className='h-full' src={logo} alt="" /> 
            </div>
            <h3 className='text-xl md:text-2xl -mx-2 font-semibold'>ZapShift</h3>
        </Link>
    );
};

export default Logo;