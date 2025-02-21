import React from "react";
import heroImage from "../assets/hero.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex items-center justify-center px-4 md:px-0">
      <div className="w-full md:w-[95%] h-auto md:h-[50rem] mt-[3rem] flex flex-col md:flex-row items-center justify-between rounded-3xl bg-gray-900 p-4 md:p-0">
        <img
          className="w-full md:w-[45%] h-auto md:h-[99%] ml-0 md:ml-[4rem] object-cover"
          src={heroImage}
          alt="Hero"
        />
        <div className="w-full md:w-[40%] h-auto md:h-[80%] border-2 border-white md:mr-[10rem] bg-gradient-to-l from-gray-700/30 via-blue-600/30 to-gray-900 shadow-lg rounded-3xl p-4 md:p-0">
          <h1 className="text-4xl md:text-6xl mt-[2.5rem] ml-0 md:ml-[2rem] tracking-tight font-semibold text-center md:text-left">
            Track, Save & Grow!
          </h1>
          <p className="text-xl md:text-4xl mt-[2.5rem] md:mt-[3.5rem] ml-0 md:ml-[2rem] tracking-tight font-thin text-center md:text-left">
            Your ultimate finance tracker to track expenses, set budgets, and
            achieve financial freedom all in one place. Gone are the days of
            guessing where your money went.
          </p>
          <p className="text-xl md:text-4xl mt-[2.5rem] ml-0 md:ml-[2rem] font-thin text-center md:text-left">
            With 
            <span className="bg-gradient-to-r from-blue-300/60 via-white/30 to-blue-700/30 ml-[1rem] text-transparent bg-clip-text font-semibold">
              FinTrack
            </span>
            , you get real-time insights, smart budgeting tools, and a seamless
            way to grow your savings all in a sleek, user-friendly dashboard.
          </p>
          <div className="flex justify-center md:justify-start">
            <Link to='/signup'>
            <button className="bg-gray-200 mt-[4rem] ml-[2rem] h-[3rem] w-[14rem] rounded-lg text-lg md:text-2xl text-blue-900 ml-[2rem] font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300 ease-in-out">
              Get Started
            </button>

            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
