import React from "react";
import heroImage from "../assets/hero.png"
const Hero = () => {
return (
    <div className="flex items-center justify-center">
        <div className="w-[95%] h-[50rem] mt-[3rem] flex justify-center items-center rounded-3xl bg-gray-900">
            <img className="w-[40%] h-[90%]" src={heroImage} alt="Hero"></img>
        </div>
    </div>
);
};

export default Hero;
