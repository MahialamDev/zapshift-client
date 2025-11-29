import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const ReviewCard = ({ review }) => {
    const {user_photoURL, userName, review:testimonial, } = review
    return (
        <div>
            <div className="shadow-md rounded-2xl p-5 md:p-10 bg-base-200 space-y-2">
                {/* icon */}
                <p className="text-5xl text-primary">
                  <FaQuoteLeft />
                </p>

                {/* details */}
                <p className="pb-5 border-b border-dashed border-secondary">
                  {testimonial}
                </p>
                <div className="pt-5 flex items-center gap-5">
                  <div className="w-10 h-10 rounded-full bg-secondary">
                    {/* img */}
                    <img
                      className="rounded-full w-full mx-auto object-center"
                      src={user_photoURL}
                      alt=""
                    />
                  </div>
                  {/* text */}
                  <div>
                    <h1 className="text-xl text-primary font-semibold">
                      {userName}
                    </h1>
                    <p className="opacity-70">Senior Product Designer</p>
                  </div>
                </div>
              </div>
        </div>
    );
};

export default ReviewCard;