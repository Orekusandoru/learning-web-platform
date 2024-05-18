import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <div>
      <nav className=" flex items-center justify-between p-6 ">
        <div className="flex lg:flex-1   ">
          <a href="/" className="pr-1  ">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 max-w-none border-[2px] border-black rounded-md"
              src="/icon.svg"
              alt=""
            />
          </a>
          <a className="text-2xl font-extrabold pr-2" href="/">
            TMS
          </a>
        </div>
        {/* {userInfo.id === 0 || userInfo.id === undefined ? ( */}
        <div className="">
          <Link to="/" className="linkHomePage ">
            Home
          </Link>
          <Link to="/about" className="linkHomePage">
            About
          </Link>
          <Link to="/help" className="regLogLinks  hover:text-red-500">
            Help
          </Link>
        </div>

        {/* // ) : (
        //   <div className="">
        //     <Link to="/showTeam" className="linkHomePage ">
        //       Teams
        //     </Link>
        //     <Link to="/" className="linkHomePage">
        //       Home
        //     </Link>
        //     <Link to="/about" className="regLogLinks  hover:text-red-500">
        //       About
        //     </Link>
        //   </div>
        // )} */}

        <div className=" lg:flex lg:flex-1 lg:justify-end lg:gap-x-6 mr-3 ">
          <div className="lg:hidden ">
            <button
              onClick={toggleMenu}
              className="flex items-center pl-10 py-1 text-white hover:text-green-500"
            >
              <img
                className=" h-8 max-w-none  border-black rounded-md"
                src="/menu.svg"
                alt=""
              />
            </button>
          </div>
          {showMenu && (
            <div className="absolute  z-50 right-1 px-2   bg-zinc-600 shadow-md py-2 rounded-md w-34">
              {/* {userInfo.id === 0 || userInfo.id === undefined ? ( */}
              <>
                <Link
                  to="/login"
                  className="block regLogLinks hover:text-green-500  lg:mr-4 md:mr-2 sm:mr-1"
                  onClick={closeMenu}
                >
                  Log in <span aria-hidden="true">&#10094;</span>
                </Link>

                <Link
                  to="/register"
                  className="block regLogLinks hover:text-amber-500  ml-1"
                  onClick={closeMenu}
                >
                  Register <span aria-hidden="true">&#10094;</span>
                </Link>
              </>
              {/* ) : (
                <>
                  <Link
                    to="/reset"
                    className="block regLogLinks text- hover:text-emerald-400 lg:mr-4 md:mr-2 sm:mr-1"
                    onClick={closeMenu}
                  >
                    Change Password
                    <span aria-hidden="true">&nbsp;&#10094;</span>
                  </Link>
                  <button
                    className=" block regLogLinks hover:text-red-500 "
                    onClick={logout}
                  >
                    Logout
                    <span aria-hidden="true">&nbsp;&#10094;</span>
                  </button>
                </>
              )} */}
            </div>
          )}
          <div className=" hidden lg:inline-block ">
            <div className=" lg:flex lg:flex-1 lg:justify-end ">
              {/* {userInfo.id === 0 || userInfo.id === undefined ? ( */}
              <>
                <Link
                  to="/login"
                  className="block regLogLinks hover:text-green-500  lg:mr-4 md:mr-2 sm:mr-1"
                >
                  Log in <span aria-hidden="true">&#10094;</span>
                </Link>

                <Link
                  to="/register"
                  className="block regLogLinks hover:text-amber-500  ml-1"
                >
                  Register <span aria-hidden="true">&#10094;</span>
                </Link>
              </>
              {/* // ) : (
              //   <>
              //     <Link
              //       to="/reset"
              //       className="block regLogLinks hover:text-emerald-500 lg:mr-4 md:mr-2 sm:mr-1"
              //     >
              //       Change Password
              //       <span aria-hidden="true">&nbsp;&#10094;</span>
              //     </Link>
              //     <button
              //       className=" block regLogLinks hover:text-red-500 "
              //       onClick={logout}
              //     >
              //       Logout
              //       <span aria-hidden="true">&nbsp;&#10094;</span>
              //     </button>
              //   </>
              // )} */}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
