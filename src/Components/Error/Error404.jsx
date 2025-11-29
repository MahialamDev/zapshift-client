import React from 'react';
import MySection from '../../Layouts/MySection';
import MyContainer from '../../Layouts/MyContainer';
import error404Img from '../../assets/error404.png'
const Error404 = () => {
    return (
        <MySection className='min-h-screen flex items-center justify-center'>
            <MyContainer className='w-full flex items-center justify-center' >
                <div className='w-1/2'>
                    <img className='w-full' src={error404Img} alt="" />
                </div>
            </MyContainer>
        </MySection>
    );
};

export default Error404;