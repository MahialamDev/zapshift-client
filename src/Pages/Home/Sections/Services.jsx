import React from "react";
import MySection from "../../../Layouts/MySection";
import MyContainer from "../../../Layouts/MyContainer";
import serviceImg from '../../../assets/service.png';


const OurServices = [
  {
    title: "Express  & Standard Delivery",
    description:
      "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
  },
  {
    title: "Nationwide Delivery",
    description:
      "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
  },
  {
    title: "Fulfillment Solution",
    description:
      "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
  },
  {
    title: "Cash on Home Delivery",
    description:
      "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
  },
  {
    title: "Corporate Service / Contract In Logistics",
    description:
      "Customized corporate services which includes warehouse and inventory management support.",
  },
  {
    title: "Parcel Return",
    description:
      "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
  },
];

const Services = () => {
  return (
    <MySection >
      <MyContainer className='py-10 bg-secondary rounded-2xl ' >
        <div className="md:p-10">
          <div className="text-white text-center space-y-2 mb-5 md:mb-10">
          <h1 className="font-bold text-4xl">Our Services</h1>
          <p>
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>
        </div>

        <div className=" grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10">
          {OurServices.map((service, index) => (
              <div key={index} className="p-5 md:p-10 bg-base-200 rounded-2xl text-center space-y-3">
                  <img className="mx-auto" src={serviceImg} alt="" />
                  <h1 className="text-xl font-semibold">{service.title}</h1>
                  <p>{service. description}</p>
              </div>
          ))}
        </div>
        </div>
      </MyContainer>
    </MySection>
  );
};

export default Services;
