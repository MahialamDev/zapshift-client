import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

export default function App() {
  const [open, setOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef(null);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  console.log(headerHeight)

  const links = (
    <>
      <li className="hover:text-primary cursor-pointer transition"><Link to='/'>Home</Link></li>
      <li className="hover:text-primary cursor-pointer transition"><a href="#about">About</a></li>
      <li className="hover:text-primary cursor-pointer transition">Contact</li>
      <li className="hover:text-primary cursor-pointer transition">Others</li>
    </>
  );

  return (

    
    <div className="w-full min-h-screen">
      <div>
         <header ref={headerRef} className="w-full bg-white border fixed top-0 left-0 z-20 ">
        {/* Main nav */}
        <div className="max-w-6xl mx-auto flex items-center justify-between p-5">
          <h1 className="text-xl font-bold">Logo</h1>

          {/* dextop slide bar */}
          <nav className="hidden md:flex">
            <ul className="flex items-center justify-center space-x-10">{links}</ul>
          </nav>

          {/* Mobile slidebar */}
        
       
            <nav  style={{ top: headerHeight }} onClick={() => setOpen(false)} className={`md:hidden fixed ${open ? 'opacity-100' : 'opacity-0' } inset-0 bg-black/40 z-10`}>
            <div onClick={(e)=> e.stopPropagation()} className={`bg-white h-full p-5 w-[70%] py-4 transform duration-300 `}>
              <button onClick={() => setOpen(false)} className="font-semibold mb-5">✕ Close</button>
              <ul className=" space-y-4">{links}</ul>
            </div>
             
            </nav>

  



          {/* Mobile icn */}
          <div onClick={()=> setOpen(!open)} className="w-8 h-8 border bg-primary px-2 flex items-center justify-center md:hidden">
              ☰
          </div>


          </div>
      </header>
     </div>

      {/* content */}
     <div className="h-[800px]"></div>

      
      <div style={{paddingTop: headerHeight}}  >
        <h2  id="about" className="text-4xl font-bold bg-amber-400 border mt-20">About</h2>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit excepturi ducimus alias temporibus fugit quam quaerat deserunt, maiores magnam animi ex recusandae. Necessitatibus vitae odit similique voluptatibus dignissimos, debitis ex eum quas corrupti ut dolores eveniet voluptatem obcaecati quibusdam distinctio, cum repudiandae. Praesentium qui, fugiat eius impedit, nihil ratione nulla temporibus asperiores similique inventore, aspernatur nisi nobis aut totam soluta quaerat iusto? Delectus, sunt! Explicabo quaerat blanditiis delectus, ratione vel minus provident totam. Voluptates, esse mollitia, vitae quia earum exercitationem ratione nulla nemo impedit et unde laboriosam quos labore. Harum pariatur eum rerum. Magnam doloremque, veniam temporibus sequi nulla consequuntur!</p>
      </div>

    </div>
    

    
  );
}
