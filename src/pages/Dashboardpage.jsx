import { useState } from "react";
import profileImage from "../assets/Profile.png";
import { useDispatch } from "react-redux";
import { logoutUser } from "../features/userSlice";
import { showErrorMessage, showSuccessMessage } from "../components/toastNotifications";
import { useNavigate } from "react-router-dom";

const Dashboardpage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
        await dispatch(logoutUser);
        navigate('/')
        showSuccessMessage("Successfully Signed out")

    } catch {
        showErrorMessage("Error Logging Out")
    }
    

  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-full md:w-[80%] h-auto md:h-[5rem] bg-gray-900 rounded-lg mt-[2rem] font-thin flex flex-col md:flex-row items-center justify-between px-4 md:px-6 bg-gradient-to-r from-gray-800/60 via-blue-600/30 to-gray-700/60 shadow-lg">
        <h1 className="text-2xl md:text-3xl bg-gradient-to-r from-blue-500/50 via-white/50 to-blue-700/30 text-transparent bg-clip-text font-semibold mb-2 md:mb-0">
          FinTrack
        </h1>

        {/* ✅ Wrapper for Profile & Dropdown */}
        <div className="relative">
          {/* ✅ Profile Button */}
          <button onClick={() => setIsOpen((prevState) => !prevState)}>
            <img src={profileImage} className="h-[4rem] w-[4rem] rounded-2xl" />
          </button>

          {/* ✅ Dropdown Menu (Now Appears Below) */}
          {isOpen && (
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 h-[10rem] bg-gray-800 rounded-md shadow-lg z-10">
              <ul className=" flex flex-col justify-center items-center py-2 text-gray-700 text-center">
                <li>
                  <button onClick = {handleSignOut} className="h-[2rem] w-[6rem] bg-red-600 text-white hover:bg-red-800 rounded-md">
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboardpage;
