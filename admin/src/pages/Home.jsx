import React, { useEffect, useState } from "react"
import CreatedQuizes from "../components/createdQuizes";

import { useSelector } from "react-redux";

import Navbar from "../components/ui/Navbar";
import { Link } from "lucide-react";

const Home=()=>{

const { user } = useSelector((state) => state.profile)
    
    return(
      <div className="max-w-screen max-h-screen w-screen h-screen bg-white ">
        <div className="w-screen overflow-x-hidden flex flex-col items-center justify-center h-screen">
          <div className="w-[100%] h-[100%] bg-white text-white ">
            <nav className="mx-auto">
              <Navbar/>
            </nav>
          
          <div className="flex flex-col h-[100%] items-center justify-center w-[100%] ">
            {user ? (      
                <>
                  <div className="z-10 mx-auto flex flex-col h-[100%] items-center justify-around w-[100%]">   
                    <CreatedQuizes/>
                    

                        

                </div></>)
                        :
              (<>
                <div className=" flex flex-col items-center justify-center gap-4">
                  <h1 className="text-3xl text-black">You need to login to create a quiz</h1>
                <button className="text-white bg-black p-4 rounded-xl" onClick={()=>{
                  window.location.href="/login"
                }}>LogIn</button> 
                  </div>
            </>)
    }
     
    


        </div>
      </div>
    </div>
  </div>
  
)

}

export default Home;

