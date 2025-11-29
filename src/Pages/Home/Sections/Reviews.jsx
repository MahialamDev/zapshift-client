import React, { use } from "react";
import MySection from "../../../Layouts/MySection";
import MyContainer from "../../../Layouts/MyContainer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import "./Review.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { FaQuoteLeft } from "react-icons/fa";
import ReviewCard from "../../../Components/ReviewCard/ReviewCard";
import customerImg from "../../../assets/customer-top.png"

const Reviews = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise);
  // console.log(reviews);
  return (
    <MySection>
      <MyContainer className="py-10">
              <div className="space-y-3 text-center mb-5">
                  <img className="mx-auto" src={customerImg} alt="" />
                  <h1 className="text-2xl md:text-4xl text-secondary font-semibold">What our customers are sayings</h1>
              <p>Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>
              </div>
        <Swiper
          loop={true}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3} // always 3 slides visible
          spaceBetween={30} // gap between slides
          effect={"coverflow"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 150,
            modifier: 1.5,
            scale: 0.9, // center slightly bigger than sides
            slideShadows: false,
          }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="mySwiper"
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
      </MyContainer>
    </MySection>
  );
};

export default Reviews;
