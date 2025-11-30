import React from "react";
import MySection from "../../Layouts/MySection";
import MyContainer from "../../Layouts/MyContainer";
import riderImg from "../../assets/agent-pending.png";
import { useForm, useWatch } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useLoaderData } from "react-router";
import useAuth from "../../Hooks/useAuth";
import PrimaryBtn from "../../Components/UI/Buttons/PrimaryBtn";
import Swal from "sweetalert2";

const Rider = () => {
  const { user } = useAuth();
  const { register, handleSubmit, control } = useForm();
  const axiosSecure = useAxiosSecure();
  const serviceCenters = useLoaderData();
  // console.log(serviceCenters)
  const senderRegion = useWatch({ control, name: "region" });
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];
  // console.log(regions)

  const districByRegion = (region) => {
    const regionDistrict = serviceCenters.filter((c) => c.region === region);
    // console.log('function region' , regionDistrict)
    const districts = regionDistrict.map((d) => d.district);
    // console.log('function dist', districts)
    return districts;
  };

  const handleBecomeARider = (data) => {
    console.log(data);
    axiosSecure.post("/riders", data).then((res) => {
      console.log(res);
      if (res.data.insertedId) {
        Swal.fire({
          title:
            " Your application has been send! Please Wait 24H for responce.",
          text: `Please Wait`,
          icon: "success",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Your Application Already Submitted!",
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      }
    });
  };

  return (
    <MySection>
      <MyContainer>
        {/* <div className='grid grid-cols-2 shadow-md w-full rounded-2xl mt-10 border border-gray-50'>
                    <form className='border border-gray-200 p-4 my-5 max-w-[380px] space-y-1 rounded-2xl shadow-2xl bg-base-100 mt-5 mx-auto'>
                    <h1 className='my-4 text-2xl font-semibold text-center text-secondary '>Submit Form For Rider</h1>
                    <label className='label' htmlFor="">Name</label>
                    <input className='input' type="text" />
                    <label className='label' htmlFor="">Email</label>
                    <input className='input' type="text" />
                    <label className='label' htmlFor="">Address</label>
                    <input className='input' type="text" />
                    <label className='label' htmlFor="">NID No</label>
                    <input className='input' type="text" />
                    <label className='label' htmlFor="">Contcat No</label>
                    <input className='input' type="text" />
                    <PrimaryBtn className='border-primary hover:bg-transparent transition duration-200 rounded-4xl mt-2 w-full'>Submit</PrimaryBtn>
                    </form>
                    
                    <div className='bg-primary rounded-r-2xl flex items-center'>
                        <img className='w-1/2 mx-auto' src={riderImg} alt="" />
                    </div>
                </div> */}

        <div className="bg-base-200 w-full min-h-[90vh] rounded-2xl shadow-2xl p-4 md:px-20 md:py-15  border border-gray-100 ">
          <form onSubmit={handleSubmit(handleBecomeARider)}>
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
              {/* Rider Info */}
              <div className="space-y-4 order-2 md:order-1">
                <h1 className="font-bold text-2xl md:text-4xl text-secondary">
                  Become A Rider
                </h1>
                <p>
                  Enjoy fast, reliable parcel delivery with real-time tracking
                  and zero hassle. From personal packages to business shipments
                  — we deliver on time, every time.
                </p>
                <h1 className="font-bold text-xl md:text-2xl my-8 text-secondary">
                  Tell us about yourself
                </h1>
                {/* name */}
                <div>
                  <label className="block text-sm mb-1 font-semibold">
                    Name
                  </label>
                  <input
                    className="input bg-transparent w-full"
                    type="text"
                    {...register("name")}
                    placeholder="Your Name"
                    defaultValue={user?.displayName}
                  />
                </div>
                {/* Driving Lisence No */}
                <div>
                  <label className="block text-sm mb-1 font-semibold">
                    Driving Lisence Number
                  </label>
                  <input
                    className="input bg-transparent w-full"
                    type="text"
                    {...register("drivingLisenceNumber")}
                    placeholder="Your Lisence Number"
                    defaultValue="8880-52478-7788"
                  />
                </div>
                {/* email */}
                <div>
                  <label className="block text-sm mb-1 font-semibold">
                    Email
                  </label>
                  <input
                    className="input bg-transparent w-full"
                    type="text"
                    {...register("email")}
                    placeholder="Your Emali"
                    value={user?.email}
                    readOnly
                  />
                </div>
                {/* address */}
                <div>
                  <label className="block text-sm mb-1 font-semibold">
                    Address
                  </label>
                  <input
                    className="input bg-transparent w-full"
                    type="text"
                    {...register("address")}
                    placeholder="Address"
                  />
                </div>
                {/* Number */}
                <div>
                  <label className="block text-sm mb-1 font-semibold">
                    Phone No
                  </label>
                  <input
                    className="input bg-transparent w-full"
                    type="text"
                    {...register("phoneNo")}
                    placeholder="Phone No"
                  />
                </div>
                {/* NID */}
                <div>
                  <label className="block text-sm mb-1 font-semibold">
                    NID
                  </label>
                  <input
                    className="input bg-transparent w-full"
                    type="text"
                    {...register("nid")}
                    placeholder="NID"
                  />
                </div>
                {/* Division */}
                <div>
                  <label className="block text-sm mb-1 font-semibold">
                    Select Region
                  </label>
                  <select
                    defaultValue=""
                    className="select bg-base-200"
                    {...register("region")}
                  >
                    <option value="" disabled={true}>
                      Select Region
                    </option>
                    {regions.map((r, index) => (
                      <option key={index} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Distric */}
                <div>
                  <label className="block text-sm mb-1 font-semibold">
                    Select District
                  </label>
                  <select
                    defaultValue=""
                    className="select bg-base-200"
                    {...register("district")}
                  >
                    <option value="" disabled={true}>
                      Select District
                    </option>
                    {districByRegion(senderRegion).map((r, index) => (
                      <option key={index} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Your Self */}
                <div>
                  <label className="block text-sm mb-1 font-semibold">
                    Tell Us About Yourself
                  </label>
                  <input
                    className="input bg-transparent w-full"
                    type="text"
                    {...register("yourSelf")}
                    placeholder="Your Self"
                  />
                </div>

                <PrimaryBtn
                  type="submit"
                  className="mt-5 border-primary rounded-sm"
                >
                  Request For Rider
                </PrimaryBtn>
              </div>

              {/* IMg Right */}
              <div className=" w-full min-h-[300px] order-1 md:order-2">
                <img src={riderImg} alt="" />
              </div>
            </div>
          </form>
        </div>
      </MyContainer>
    </MySection>
  );
};

export default Rider;
