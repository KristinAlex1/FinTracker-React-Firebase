import React from "react";
import heroImage from "../assets/hero.png";
const Hero = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-[95%] h-[50rem] mt-[3rem] flex items-center justify-between rounded-3xl bg-gray-900">
        <img
          className="w-[45%] h-[99%] ml-[4rem]"
          src={heroImage}
          alt="Hero"
        ></img>
        <div className="w-[40%] h-[80%] border-2 border-white mr-[10rem] rounded-3xl">
          <h1 className="text-6xl mt-[2.5rem] ml-[2rem] tracking-tight font-semibold">
            Track, Save & Grow!
          </h1>
          <p className="text-4xl mt-[3.5rem] ml-[2rem] tracking-tight font-thin">
            Your ultimate finance tracker to track expenses, set budgets, and
            achieve financial freedom all in one place. Gone are the days of
            guessing where your money went.
          </p>
          <p className="text-4xl mt-[2.5rem] ml-[2rem] font-thin">
            With{" "}
            <span className="bg-gradient-to-r from-blue-300/60 via-white/30 to-blue-700/30 text-transparent bg-clip-text font-semibold">
              FinTrack
            </span>
            , you get real-time insights, smart budgeting tools, and a seamless
            way to grow your savings all in a sleek, user-friendly dashboard.
          </p>
          <button className="bg-gray-200 mt-[4rem] ml-[3rem] h-[3rem] w-[14rem] rounded-lg text-2xl text-blue-900 font-semibold">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
