import React from "react";
import MySection from "../../../Layouts/MySection";
import MyContainer from "../../../Layouts/MyContainer";
// Import Swiper styles
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import amazonImg from "../../../assets/amazon.png";
import casioImg from "../../../assets/casio.png";
import monstarImg from "../../../assets/moonstar.png";
import randstandImg from "../../../assets/randstad.png";
import startPeopleImg from "../../../assets/start_people.png";
import starImg from "../../../assets/star.png";
import { Autoplay } from "swiper/modules";

const brandsLogo = [
  amazonImg,
  casioImg,
  monstarImg,
  randstandImg,
  starImg,
  startPeopleImg,
];

const allBrands = [...brandsLogo, ...brandsLogo]; // duplicate


const Brands = () => {
  return (
    <MySection>
          <MyContainer>
              <h1 className="text-center text-2xl font-semibold py-2 mb-4 text-secondary">We've helped thousands ofsales teams</h1>
        <Swiper
          slidesPerView={4}
          centeredSlides={true}
          spaceBetween={30}
          grabCursor={true}
          loop={true}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        >
          {allBrands.map((logo, index) => (
            <SwiperSlide key={index}>
              <img src={logo} alt="logo..." />
            </SwiperSlide>
          ))}
        </Swiper>
      </MyContainer>
    </MySection>
  );
};

export default Brands;
