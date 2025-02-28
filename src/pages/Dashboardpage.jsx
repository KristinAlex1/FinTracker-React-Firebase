import React, { useState } from "react";
import profileImage from "../assets/Profile.png";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/userSlice";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../components/toastNotifications";
import { useNavigate } from "react-router-dom";
import AddSection from "../components/AddSection";
import useTransactions from "../hooks/useTransaction";

const Dashboardpage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  const { transactions, income, expenses, balance, loading, addTransaction } = useTransactions();

  const handleSignOut = async () => {
    try {
      await dispatch(logoutUser());
      navigate("/");
      showSuccessMessage("Successfully Signed out");
    } catch {
      showErrorMessage("Error Logging Out");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full">
        {/* Navbar Section */}
        <div className="w-full md:w-[80%] h-auto md:h-[5rem] bg-gray-900 rounded-lg mt-[2rem] font-thin flex flex-col md:flex-row items-center justify-between px-4 md:px-6 bg-gradient-to-r from-gray-800/60 via-blue-600/30 to-gray-700/60 shadow-lg">
          <h1 className="text-2xl md:text-3xl bg-gradient-to-r from-blue-500/50 via-white/50 to-blue-700/30 text-transparent bg-clip-text font-semibold mb-2 md:mb-0">
            FinTrack
          </h1>

          {/* ✅ Profile Section with Dropdown */}
          <div className="relative flex items-center">
            <h1 className="text-xl md:text-3xl flex self-center mr-4 md:mr-[2rem] text-white">
              {user?.name || "User"}
            </h1>
            <button onClick={() => setIsOpen((prevState) => !prevState)}>
              <img
                src={profileImage || user?.photoURL}
                className="h-[3rem] md:h-[4rem] w-[3rem] md:w-[4rem] rounded-full cursor-pointer"
              />
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-12 w-48 h-auto bg-gray-800 rounded-md shadow-lg z-10 p-4 text-center">
                <button
                  onClick={handleSignOut}
                  className="w-full bg-red-600 text-white hover:bg-red-800 rounded-md py-2"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* ✅ Financial Overview Section */}
      
      
      <AddSection addTransaction={addTransaction} />
    </>
  );
};

export default Dashboardpage;
