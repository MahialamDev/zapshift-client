import Lottie from "lottie-react";
import React from "react";
import loader from "./cycle.json";

const LoadingAnimation = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <Lottie animationData={loader} loop className="w-40" />
    </div>
  );
};

export default LoadingAnimation;
