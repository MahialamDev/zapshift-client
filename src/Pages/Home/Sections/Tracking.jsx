import React from 'react';
import MySection from '../../../Layouts/MySection';
import MyContainer from '../../../Layouts/MyContainer';
import safeDeliveryImg from '../../../assets/safe-delivery.png'
import liveTraking from '../../../assets/live-tracking.png'


const trackingItems = [
    {
        image: liveTraking,
        title: 'Live Parcel Tracking',
        details: 'Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipments journey and get instant status updates for complete peace of mind.'
    },
    {
        image: safeDeliveryImg,
        title: '100% Safe Delivery',
        details: 'We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.'
    },
    {
        image: safeDeliveryImg,
        title: '24/7 Call Center Support',
        details: 'Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.'
    }
]

const Tracking = () => {
    return (
        <MySection>
                    {
                        trackingItems.map((item, index) => 
                        
                            <MyContainer className='space-y-4 flex flex-col md:flex-row items-center bg-base-200 gap-5 md:gap-0 mb-6 py-6 rounded-2xl' key={index}>
                                <img className='md:border-r border-dashed md:pr-5 border-secondary' src={item.image} alt="" />
                                <div className='space-y-4 md:pl-5'>
                                    <h1 className='font-semibold text-2xl text-secondary'>{item.title}</h1>
                                    <p className='text-base-content'>{item.details}</p>
                                </div>
                            </MyContainer>
                        )
                    }
        </MySection>
    );
};

export default Tracking;