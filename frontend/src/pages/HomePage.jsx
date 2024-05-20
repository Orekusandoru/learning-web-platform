import { useContext } from "react";

import { Image } from "../components";

export default function HomePage() {
  return (
    <div className=" text-white text-xl flex justify-center items-center h-[800px]">
   
      <div className="">
        

        <div className=" text-center w-3/3 text-3xl bg-gradient-to-r bg-slate-500 border-4 border-black p-4 rounded-md shadow-2xl "><Image.Gosling size={200} className="" />
          <p>
            <a className="text-green-500 font-bold " href="/register">
              Sign up
            </a>
            or
            <a className="text-green-500 font-bold" href="/login">
              Sign in
            </a>
            <br />
            if you already have an account to get access to our team task
            management system
          </p>
        </div>
      

   
      </div>
    </div>
  );
}
