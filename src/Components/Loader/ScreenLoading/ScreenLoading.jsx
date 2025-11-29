import React from "react";
import { InfinitySpin } from "react-loader-spinner";

const ScreenLoading = () => {
  return (
    <div className="w-full h-[90vh] flex items-center justify-center">
      <InfinitySpin
width="200"
color="#4fa94d"
/>
    </div>
  );
};

export default ScreenLoading;
