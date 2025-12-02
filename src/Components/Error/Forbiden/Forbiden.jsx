import Lottie from "lottie-react";
import animationData from "./cycle.json";


const Forbiden = () => {
    return (
        <div className="flex justify-center items-center">
      <Lottie 
        animationData={animationData} 
        loop={true} 
        className="w-64 h-64" 
      />
    </div>
    );
};

export default Forbiden;