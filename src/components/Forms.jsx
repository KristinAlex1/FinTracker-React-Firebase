import React from "react";
import PropTypes from "prop-types";

const Forms = ({ title = "" , addIncome, bgColor="",addExpenses,addBalance}) => {
  return (
    <>
      {/* ✅ Background Overlay */}
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
        
        {/* ✅ Form Container */}
        <div
          className="p-6 rounded-lg shadow-lg w-[90%] md:w-[40%] relative"
          style={{ backgroundColor: bgColor }} // ✅ Ensures background color applies correctly
        >
          <h2 className="text-2xl font-bold mb-4 text-black">Add {title}</h2>

          {/* ✅ Form Fields */}
          <input
            type="text"
            placeholder="Enter Name"
            className="w-full p-2 border border-gray-400 rounded mb-4"
          />
          <input
            type="email"
            placeholder="Enter Email"
            className="w-full p-2 border border-gray-400 rounded mb-4"
          />

          {/* ✅ Close Button */}
          <button
            onClick={addIncome || addExpenses || addBalance}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};
;

export default Forms;
