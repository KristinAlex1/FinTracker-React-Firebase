import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="flex bg-black items-center justify-center min-h-[6rem] relative">
        {/* Ensure Gradient Doesn't Block Hover */}
        

        {/* Navbar Container */}
        <div className="w-[80%] h-[5rem] bg-gray-900 rounded-lg mt-[2rem] flex items-center justify-between px-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 shadow-lg">
          
          {/* Logo */}
          <h1 className="text-3xl font-bold text-white">Fin-Track</h1>

          {/* Navigation Links */}
          <div className="text-2xl flex space-x-6">
            <Link
              to="/"
              className="px-4 py-2 text-white hover:bg-black transition-all duration-300 ease-in-out rounded-md"
            >
              Home
            </Link>
            <Link
              to="/expenses"
              className="px-4 py-2 text-white hover:bg-black transition-all duration-300 ease-in-out rounded-md"
            >
              Expenses
            </Link>
            <Link
              to="/reports"
              className="px-4 py-2 text-white hover:bg-black transition-all duration-300 ease-in-out rounded-md"
            >
              Reports
            </Link>
            <Link
              to="/about"
              className="px-4 py-2 text-white hover:bg-black transition-all duration-300 ease-in-out rounded-md"
            >
              About
            </Link>
          </div>

          {/* Auth Links */}
          <div className="text-2xl flex space-x-4">
            <Link
              to="/signin"
              className="px-4 py-2 text-white hover:bg-black transition-all duration-300 ease-in-out rounded-md"
            >
              Sign In
            </Link>
            <Link
              to="/get-started"
              className="px-4 py-2 bg-gray-100 text-black font-semibold rounded-lg transition-all duration-300 ease-in-out hover:bg-gray-500"
            >
              Get Started
            </Link>
          </div>

        </div>
      </div>
    </>
  );
};

export default Navbar;
