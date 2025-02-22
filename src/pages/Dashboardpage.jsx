import React from "react";

const Dashboardpage = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full md:w-[80%] h-auto md:h-[5rem] bg-gray-900 rounded-lg mt-[2rem] font-thin flex flex-col md:flex-row items-center justify-between px-4 md:px-6 bg-gradient-to-r from-gray-800/60 via-blue-600/30 to-gray-700/60 shadow-lg">
        <h1 className="text-2xl md:text-3xl bg-gradient-to-r from-blue-500/50 via-white/50 to-blue-700/30 text-transparent bg-clip-text font-semibold mb-2 md:mb-0">
          FinTrack
        </h1>
      </div>
    </div>
  );
};

export default Dashboardpage;
