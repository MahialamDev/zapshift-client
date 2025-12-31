import React from 'react';
import MyContainer from '../../../Layouts/MyContainer';
import MySection from '../../../Layouts/MySection';
import banner1Img from '../../../assets/banner1.png';
import banner2Img from '../../../assets/banner2.png';
import banner3Img from '../../../assets/banner3.png';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";


const Hero = () => {
    return (
        <MySection className='pt-25 md:pt-30'>
             <MyContainer className="border">
                <Carousel autoPlay={true} infiniteLoop={true}>
                <div>
                    <img src={banner1Img} />
                 
                </div>
                <div>
                    <img src={banner2Img} />
                   
                </div>
                <div>
                    <img src={banner3Img} />
                   
                </div>
            </Carousel>
            </MyContainer>
        </MySection>
   
    );
};

export default Hero;