// import React, { useRef } from "react";
import PrimaryBtn from "../../../Components/UI/Buttons/PrimaryBtn";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
// import imageUploadIconImg from '../../../assets/image-upload-icon.png'
import axios from "axios";
import Swal from "sweetalert2";

import { toast } from "react-toastify";

const Register = () => {
  const { register, handleSubmit, formState: {errors} } = useForm();
  const { registerUserWithEmail,  updateUserProfile, setLoading, loading, logoutUser, user} = useAuth();
  // const fileInputRef = useRef();
  console.log()

  // Handle From
  const handleRegister = (data) => {
   
    // From img
    const profileImg = data.photoURL[0];
 
    // Resister
    registerUserWithEmail(data.email, data.password)
      .then(res => {
        Swal.fire({
                        title: "Create User Succfully!",
                        icon: "success",
                        draggable: true
                      });
       
        // Store the image 
        const formData = new FormData();
        formData.append('image', profileImg);

         // Img Post
        const img_api_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Img_Host}`;
       
        axios.post(img_api_url, formData)
          .then(res => {
            console.log('after img upload', res.data.data.url)

            // Update Profile
            const userProfile = {
              displayName: data.name,
              photoURL: res.data.data.url
            }

             // Update Profile
            updateUserProfile(userProfile)
              .then(() => {
                
                // Logout
                  logoutUser()
                    .then(() => {
                      // setLoading(false);
                  })
                  .catch(err=> console.log(err))
              })
              .catch(err => {
                console.log(err)
              }) 

        })

        console.log(res)

        
        // setLoading(false)
        console.log(loading)
      })
      .catch(err => {
        setLoading(false)
        return toast.error(err.message);
      })
  };

  if (user) {
    return <Navigate to='/login' />
  }



  return (
    <div className="w-full mx-auto p-4">
      {/* Form Box */}
      <div className=" p-2 m-2 md:max-w-[380px] mx-auto">
        {/* Heading */}
        <div className="mb-5">
          <h1 className="text-2xl md:text-4xl font-bold mb-2">
            Create An Account
          </h1>
          <p className="opacity-80">Register with ZapShift</p>
        </div>

        {/* From */}
        <form onSubmit={handleSubmit(handleRegister)} className="space-y-2">

          {/* Image INput hidden */}

           {/* Image Input Vissable */}
          {/* <label onClick={()=> fileInputRef.current.click()} className=" cursor-pointer inline-block">
            <img className='' src={imageUploadIconImg} alt="" />
          </label> <br /> */}

          <input
            {...register("photoURL", { required: true, })}
            className="file-input w-full"
            type="file"
            placeholder="Name"
            // ref={fileInputRef}
          />

         



          {/* Name */}
          <label className="label">Name</label>
          <input
            {...register("name", { required: true, })}
            className="input w-full border border-gray-400 rounded-md bg-transparent"
            type="text"
            placeholder="Name"
          />
          {/*Name errors */}
          {errors.name?.type === 'required' && <p className="text-red-400 -mt-1 text-sm">Name is required.</p> }

          {/* Email */}
          <label className="label">Email</label>
          <input
            {...register("email", {
              required: true,
            })}
            className="input w-full border border-gray-400 rounded-md bg-transparent"
            type="text"
            placeholder="Email"
          />
          {/*Email errors */}
          {errors.email?.type === 'required' && <p className="text-red-400 -mt-1 text-sm">Email is required.</p> }

          {/* Password */}
          <label className="label">Password</label>
          <input
            {...register("password", {
              required: true,
              minLength: 6,
              maxLength: 20,
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).+$/
            })}
            className="input w-full border border-gray-400 rounded-md bg-transparent"
            type="text"
            placeholder="Password"
          />
          {/*Password errors */}
          {errors.password?.type === 'required' && <p className="text-red-400 -mt-1 text-sm">Password is required.</p>}
          {errors.password?.type === 'minLength' && <p className="text-red-400 -mt-1 text-sm">Password must have 6 Charecter or longer.</p> }
          {errors.password?.type === 'pattern' && <p className="text-red-400 -mt-1 text-sm"> Password must include at least 1 uppercase, 1 lowercase, and 1 special character.</p> }
            
          {/* Submit */}
          <PrimaryBtn className="w-full mt-2 cursor-pointer border-primary rounded-md transition duration-500 ">
            {loading ? <span className="loading loading-spinner text-neutral"></span> : <span>Register</span>} 
          </PrimaryBtn>
        </form>

        {/* Link TO OTHER ROUTE */}
        <p className="mt-2 ">
          Already have an account?{" "}
          <Link to="/login" className="text-primary underline p-2">
            {" "}
            login
          </Link>
        </p>

        {/* Social Login */}
        <SocialLogin />
      </div>
    </div>
  );
};

export default Register;
