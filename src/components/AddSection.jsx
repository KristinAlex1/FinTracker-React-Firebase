import { FaCoins } from "react-icons/fa";
import coins from "../assets/coins.png";

const AddSection = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col justify-between items-center h-auto md:h-[75rem] mt-[2rem] w-full md:w-[95%] bg-gray-900 rounded-4xl p-4 md:p-8">

        {/* ✅ Top Section: Centered Income, Expenses, Balance Divs */}
        <div className="flex flex-col md:flex-row justify-center md:justify-evenly w-full">
          {/* Total Income */}
          <div
            style={{ backgroundColor: "#87CEEB" }}
            className="h-[15rem] w-full md:w-[30rem] lg:w-[45rem] mt-[3rem] text-black rounded-2xl bg-gradient-to-r from-black/40 via-white/20 to-black/40 p-4"
          >
            <div className="text-4xl mt-[2rem] ml-[2rem] font-normal">Total Income</div>
            <div className="text-3xl mt-[1rem] ml-[2rem] font-normal">$0</div>
            <button style={{ backgroundColor: "#171621" }} className="w-[80%] md:w-[35rem] h-[3rem] mt-[2rem] mx-auto md:ml-[4rem] rounded-xl text-3xl text-white font-light">
              Add Income
            </button>
          </div>

          {/* Total Expenses */}
          <div
            style={{ backgroundColor: "#96DED1" }}
            className="h-[15rem] w-full md:w-[30rem] lg:w-[45rem] mt-[3rem] text-black rounded-2xl bg-gradient-to-r from-black/40 via-white/20 to-black/40 p-4"
          >
            <div className="text-4xl mt-[2rem] ml-[2rem] font-normal">Total Expenses</div>
            <div className="text-3xl mt-[1rem] ml-[2rem] font-normal">$0</div>
            <button style={{ backgroundColor: "#171621" }} className="w-[80%] md:w-[35rem] h-[3rem] mt-[2rem] bg-gray-900 mx-auto md:ml-[4rem] rounded-xl text-3xl text-white font-light">
              Add Expenses
            </button>
          </div>

          {/* Current Balance */}
          <div
            style={{ backgroundColor: "#CCCCFF" }}
            className="h-[15rem] w-full md:w-[30rem] lg:w-[45rem] mt-[3rem] text-black rounded-2xl bg-gradient-to-r from-black/40 via-white/20 to-black/40 p-4"
          >
            <div className="text-4xl mt-[2rem] ml-[2rem] font-normal">Current Balance</div>
            <div className="text-3xl mt-[1rem] ml-[2rem] font-normal">$0</div>
            <button style={{ backgroundColor: "#171621" }} className="w-[80%] md:w-[35rem] h-[3rem] mt-[2rem] bg-gray-900 mx-auto md:ml-[4rem] rounded-xl text-3xl text-white font-light">
              Reset Balance
            </button>
          </div>
        </div>

        {/* ✅ Bottom Section: Image & Text (Centered & Spaced) */}
        <div className="flex flex-col justify-center items-center mt-[5rem] md:mt-[10rem] mb-[3rem] w-full">
          <img src={coins} className="w-[60%] md:w-[20rem]" />
          <div className="text-white text-2xl md:text-4xl mt-4 md:mt-[2rem] text-center font-thin px-4 md:px-0">
            You currently have no Transactions recorded!
          </div>
        </div>

      </div>
    </div>
  );
};

export default AddSection;
