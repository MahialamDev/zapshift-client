import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import Logo from "../../UI/Logo/Logo";
import MySection from "../../../Layouts/MySection";
import MyContainer from "../../../Layouts/MyContainer";
import { useTheme } from "next-themes";
import useAuth from "../../../Hooks/useAuth";
import ActiveLink from "../../UI/ActiveLinks/ActiveLink";
import { FaArrowRightFromBracket, FaCircleArrowRight } from "react-icons/fa6";
import { CiMenuFries } from "react-icons/ci";

const Navbar = () => {
  const { user, loading, logoutUser } = useAuth();
  const [open, setOpen] = useState(false);
  const headerRef = useRef();
  const [headerHeight, setHeaderHeight] = useState(null)
  const links = (
    <>
      <li>
        <ActiveLink className='rounded-3xl md:px-5 md:py-2' to='/'>Home</ActiveLink>
      </li>
      <li>
        <ActiveLink className='rounded-3xl md:px-5 md:py-2' to="/coverage">Coverage</ActiveLink>
      </li>
      <li>
        <ActiveLink className='rounded-3xl md:px-5 md:py-2' to="/send-parcel">Send Parcel</ActiveLink>
      </li>

      {user &&
      <>
        <li>
          <ActiveLink className='rounded-3xl md:px-5 md:py-2' to="/dashboard/my-parcels">My Parcels</ActiveLink>
        </li>
      </>
      }
      
    </>

  
    

  );

  const { theme, setTheme } = useTheme();


  const handleLogoutUser = () => {
    logoutUser()
      .then(res => {
      console.log(res)
      })
    .catch(err=> console.log(err))
  }


  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight)
    }
  }, [])

  console.log(headerHeight)


  return (
    <header ref={headerRef} className="w-full fixed overflow-hidden z-100 top-0">
      <div className=' max-w-7xl md:mt-4 px-4 md:px-0 mx-auto w-full bg-base-200 md:bg-transparent'>
        <div className="bg-base-200 md:px-8 rounded-xl flex items-center justify-between py-5 md:py-3 md:shadow-sm">

          <div onClick={()=> setOpen(!open)} className=" flex items-center justify-center md:hidden font-bold">
               <CiMenuFries size={25}/>
          </div>

          <Logo />
          {/* Dextop Nav */}
          <nav className="hidden md:flex items-center justify-center">
             <ul className="flex items-center gap-6">{links}</ul>
          </nav>


          {/* mobile */}
          <nav onClick={()=> setOpen(!open)} className={`md:hidden transition-all ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} fixed inset-0 bg-black/40 backdrop-blur-[2px]`}>
              {/* Sidebar */}
            <div onClick={(e) => e.stopPropagation()} className={`transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}  w-[80%] bg-base-200 h-full`}>
              <div className="w-full p-4 relative flex items-center justify-between">
                <Logo />
                
                
                <button onClick={()=> setOpen(false)} className="text-right pr-4 p-5">✕ Close</button>
              </div>
              {/* Toggle dark mode mobile */}
              <div className="p-4">
                <label className="flex cursor-pointer gap-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <path
      d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
  </svg>
  <input onClick={()=> setTheme(theme === 'dark' ? 'light' : 'dark')} type="checkbox" value="synthwave" className="toggle theme-controller" />
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
</label>
              </div>
              <ul className="mx-4 pt-5 space-y-6" >{links}</ul>
            </div>
          </nav>

          
          
          

          <div className="flex items-center">
            
            {/* Dark Mode */}
          <label className="swap swap-rotate hidden md:flex">
  {/* this hidden checkbox controls the state */}
  <input onClick={()=> setTheme(theme === 'dark' ? 'light' : 'dark')} type="checkbox" className="theme-controller" value="synthwave" />

  {/* sun icon */}
  <svg
    className="swap-off h-8 w-8 fill-current"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24">
    <path
      d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
  </svg>

  {/* moon icon */}
  <svg
    className="swap-on h-8 w-8 fill-current"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24">
    <path
      d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
  </svg>
</label>
            
            {/* IF USER LOG IN */}
          {loading ?        
            <span className="loading loading-ring loading-xl"></span> 
            

           :

             user ?
              
          // When USer Login
              <div className="flex items-center gap-4">
                <img className="w-10 h-10 rounded-full border-2 border-primary cursor-pointer" src={user.photoURL} alt="" referrerPolicy="no-referrer" />
                <button onClick={handleLogoutUser} className="btn md:px-6  md:py-5 rounded-md border-primary hover:bg-primary flex items-center">
                  <span><FaArrowRightFromBracket /></span>Log Out
                </button>
            </div> :

            
              
          // IF NOT FOUND USER
          <div className="font-semibold space-x-5 flex items-center">

            <Link to='/login'>
              <button className="btn px-6  py-5 rounded-md">Login</button>
            </Link>
            
            <Link to='/register' className="flex items-center">
            <button className="btn px-6  py-5 rounded-md bg-primary">Sign Up </button>
            <span className="inline-block -rotate-45 bg-primary rounded-full">
              <FaCircleArrowRight size={40} />
            </span>
            </Link>

          </div>
            
            
            }

            

          </div>

        </div>
        
      </div>
      
   </header>
  );
};

export default Navbar;
