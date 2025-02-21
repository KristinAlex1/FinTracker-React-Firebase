import React from "react";

const Footer = () => {
  return (
    <div className="flex items-center justify-center px-4 md:px-0">
  <div className="w-full md:w-[95%] h-auto md:h-[10rem] mt-[3rem] flex flex-col items-center justify-between rounded-3xl bg-gray-900 p-6 text-white">
    
    {/* Brand Name */}
    <h2 className="text-2xl font-bold">FinTrack</h2>

    {/* Social Media Icons */}
    <div className="flex space-x-6 mt-4">
      <a href="#" className="text-gray-300 hover:text-white transition">
        <i className="fab fa-facebook text-2xl"></i>
      </a>
      <a href="#" className="text-gray-300 hover:text-white transition">
        <i className="fab fa-twitter text-2xl"></i>
      </a>
      <a href="#" className="text-gray-300 hover:text-white transition">
        <i className="fab fa-instagram text-2xl"></i>
      </a>
      <a href="#" className="text-gray-300 hover:text-white transition">
        <i className="fab fa-linkedin text-2xl"></i>
      </a>
    </div>

    {/* Copyright Notice */}
    <div className="text-gray-400 text-sm mt-6">
      &copy; {new Date().getFullYear()} BrandName. All rights reserved.
    </div>

  </div>
</div>

  );
};

export default Footer;
