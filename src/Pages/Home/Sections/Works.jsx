import React from 'react';
import MySection from '../../../Layouts/MySection';
import MyContainer from '../../../Layouts/MyContainer';
import delivaryImg from '../../../assets/bookingIcon.png'

const works = [
    {
        title: 'Booking Pick & Drop',
        details: 'From personal packages to business shipments — we deliver on time, every time.'
    },
    {
        title: 'Cash On Delivery',
        details: 'Personal packages to business shipments — we deliver on time, every time.'
    },
    {
        title: 'Delivery Hub',
        details: 'From personal packages to business shipments — we deliver on time, every time.'
    },
    {
        title: 'Booking SME & Corporate',
        details: 'From personal packages to business shipments — we deliver on time, every time.'
    },
]

const Works = () => {
    return (
        <MySection>
            <MyContainer>
                <h1 className="text-secondary text-2xl font-semibold mb-4">How It Works</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                    {
                        works.map((work, index) =>
                            <div className='p-5 md:p-10 rounded-2xl space-y-3 bg-base-200' key={index}>
                                <img src={delivaryImg} alt="" />
                                <h1 className='text-xl text-secondary font-semibold'>{work.title}</h1>
                                <p>{work.details}</p>
                            </div>
                        )
                    }
                    
                </div>
            </MyContainer>
        </MySection>
    );
};

export default Works;