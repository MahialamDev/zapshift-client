import React from 'react';
import Hero from './Sections/Hero';
import Brands from './Sections/Brands';
import Works from './Sections/Works';
import Services from './Sections/Services';
import Tracking from './Sections/Tracking';
import Marchents from './Sections/Marchents';
import Reviews from './Sections/Reviews';
import Forbiden from '../../Components/Error/Forbiden/Forbiden';

const reviewsPromise = fetch('../reviews.json').then(res=>res.json())

const Home = () => {
    return (
        <>
            <Forbiden />
            <Hero />
            <Works />
            <Services />
            <Brands />
            <Tracking />
            <Marchents />
            <Reviews reviewsPromise={reviewsPromise} />
        </>
    );
};

export default Home;