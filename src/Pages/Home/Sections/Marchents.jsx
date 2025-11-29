import React from 'react';
import MySection from '../../../Layouts/MySection';
import MyContainer from '../../../Layouts/MyContainer';
import marchentImg from '../../../assets/location-merchant.png'
import PrimaryBtn from '../../../Components/UI/Buttons/PrimaryBtn';
import TransparentBtn from '../../../Components/UI/Buttons/TransparentBtn';

const Marchents = () => {
    return (
        <MySection>
            <MyContainer className='flex flex-col-reverse md:flex-row items-center border bg-secondary rounded-2xl text-white py-5 md:py-15 space-y-4 md:space-y-0'>
                {/* Text */}
                <div className='flex-2 space-y-4 text-center md:text-left'>
                    <h1 className='text-2xl md:text-4xl '>Merchant and Customer Satisfaction is Our First Priority</h1>
                    <p>We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.</p>
                    <div className='space-y-4 lg:space-y-0 space-x-5 '>
                        <PrimaryBtn >Become a Marchent</PrimaryBtn>
                        <TransparentBtn>Earn with ZapShift Courier</TransparentBtn>
                   </div>
                </div>
                {/* Image */}
                <div className=' flex-1 mb-4 md:mb-0'>
                    <img src={marchentImg} alt="img" />
                </div>
            </MyContainer>
        </MySection>
    );
};

export default Marchents;