import React, { useEffect } from "react";
import PrimaryBtn from "../../../Components/UI/Buttons/PrimaryBtn";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const { loginWithEmail, loading, user } = useAuth();
  const location = useLocation();
  console.log('in the login Page', location)
  const navigate = useNavigate();
  const { register, handleSubmit, formState: {errors} } = useForm();

  const handleLogin = (data) => {
    loginWithEmail(data.email, data.password)
      .then(res => {
        console.log(res)
        navigate(location?.state?.from?.pathname || "/");
        // navigate(location?.state || '/')
      })
      .catch(err => {
      console.log(err)
    })
  }

  console.log(location)

  //  if (user) return <Navigate to="/" replace />;
   
  // if (user) {
  //   console.log("OK ")
  //   navigate(location?.state?.from?.pathname || "/");
  // };

  useEffect(() => {
  if (user) {
    navigate(location?.state?.from?.pathname || "/", { replace: true });
  }
}, [user]);

  // if(user) return <Navigate to='/'></Navigate>
 

  

  return (
    <div className="w-full mx-auto p-4">
      <div className=" p-2 m-2 md:max-w-[380px] mx-auto">

        {/* Heading */}
        <div className="mb-5">
          <h1 className="text-2xl md:text-4xl font-bold mb-2">Welcome Back</h1>
          <p className="opacity-80">Register with ZapShift</p>
        </div>

        {/* From */}
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-2">
          {/* Email */}
          <label className="label">Email</label>
          <input
            {...register('email', {
              required: true,
            })}
            className="input w-full border border-gray-400 rounded-md bg-transparent"
            type="text"
            placeholder="Email"
          />
          {/* Errors Email */}
          {errors.email?.type === 'required' && <p className="text-red-400 -mt-1 text-sm">Email is required.</p> }

          {/* Pass */}
          <label className="label">Password</label>
          <input
            {...register('password', {
              required: true,
              minLength: 6
            })}
            className="input w-full border border-gray-400 rounded-md bg-transparent"
            type="text"
            placeholder="Password"
          />
          {/* Pass Errors */}
          {errors.password?.type === 'required' && <p className="text-red-400 -mt-1 text-sm">Password must have six charecters or longer.</p>}
          
          {/* Forget Pass */}
          <Link className="text-[#71717a] underline block">Forget Password?</Link> 

          {/* LInk To login */}
          <PrimaryBtn className="w-full mt-2 cursor-pointer border-primary rounded-md transition duration-500">
            {loading ? <span className="loading loading-spinner text-neutral"></span> : <span>Login</span>} 
          </PrimaryBtn>
        </form>
        <p className="mt-2">
          Don’t have any account?{" "}
          <Link to='/register' className="text-primary mt-2 underline p-2"> Register</Link>
        </p>

        {/* Social Login */}
        <SocialLogin />
      </div>
    </div>
  );
};

export default Login;
