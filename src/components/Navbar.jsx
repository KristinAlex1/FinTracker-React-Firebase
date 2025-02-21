import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="flex bg-black items-center justify-center min-h-[6rem] relative px-4">
        {/* Navbar Container */}
        <div className="w-full md:w-[80%] h-auto md:h-[5rem] bg-gray-900 rounded-lg mt-[2rem] font-thin flex flex-col md:flex-row items-center justify-between px-4 md:px-6 bg-gradient-to-r from-blue-800/60 via-gray-600/50 to-blue-700/60 shadow-lg">
          {/* Logo */}
          <h1 className="text-2xl md:text-3xl bg-gradient-to-r from-blue-500/50 via-white/50 to-blue-700/30 text-transparent bg-clip-text font-semibold mb-2 md:mb-0">
            FinTrack
          </h1>

          {/* Navigation Links */}
          <div className="text-lg md:text-2xl flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
            <Link to="/" className="px-4 py-2 text-white hover:bg-black transition-all duration-300 ease-in-out rounded-md text-center">
              Home
            </Link>
            <Link to="/expenses" className="px-4 py-2 text-white hover:bg-black transition-all duration-300 ease-in-out rounded-md text-center">
              Expenses
            </Link>
            <Link to="/reports" className="px-4 py-2 text-white hover:bg-black transition-all duration-300 ease-in-out rounded-md text-center">
              Reports
            </Link>
            <Link to="/about" className="px-4 py-2 text-white hover:bg-black transition-all duration-300 ease-in-out rounded-md text-center">
              About
            </Link>
          </div>

          {/* Auth Links */}
          <div className="text-lg md:text-2xl flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-2 md:mt-0">
            <Link to="/signin" className="px-4 py-2 text-white hover:bg-black transition-all duration-300 ease-in-out rounded-md text-center">
              Sign In
            </Link>
            <Link to="/get-started" className="px-4 py-2 bg-gray-100 text-black font-semibold rounded-lg transition-all duration-300 ease-in-out hover:bg-gray-900 hover:text-white text-center">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
