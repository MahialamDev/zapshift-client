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
        <MySection>
             <MyContainer className="">
                <Carousel autoPlay={true} infiniteLoop={true}>
                <div>
                    <img src={banner1Img} />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src={banner2Img} />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src={banner3Img} />
                    <p className="legend">Legend 1</p>
                </div>
            </Carousel>
            </MyContainer>
        </MySection>
   
    );
};

export default Hero;