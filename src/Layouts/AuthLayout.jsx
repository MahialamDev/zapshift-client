import React from 'react';
import Logo from '../Components/UI/Logo/Logo';
import { Outlet } from 'react-router';
import authImg from '../assets/authImage.png'


const AuthLayout = () => {
    return (
        <section className='px-4 md:px-5 relative' >
            
            
            <div className='relative flex items-center border border-gray-300 shadow-md max-w-7xl mx-auto h-[90vh] max-h-full rounded-2xl mt-[5vh]'>
                {/* Left Changeable Div ANd  Route */}
                <div className='flex-1 relative h-full flex items-center justify-center bg-base-200 rounded-2xl md:rounded-r-sm'>
                    <div className='absolute top-4 left-4 '>
                        <Logo />
                    </div>
                    <Outlet />
                </div>

                {/* Image */}
                <div className='flex-1 bg-[#fafdf0] relative items-center h-full justify-between rounded-r-2xl hidden md:flex'>
                    <img className=' mx-auto ' src={authImg} alt="" />
                </div>
            </div>
        </section>
    );
};

export default AuthLayout;