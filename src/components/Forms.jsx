import { useRef, useState } from "react"; 
import db, { auth } from "../pages/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { showErrorMessage, showSuccessMessage } from "./toastNotifications";

const Forms = ({ title = "", addIncome, bgColor = "", addExpenses, addBalance, color = "" }) => {
  const nameRef = useRef(null);
  const amountRef = useRef(null);
  const dateRef = useRef(null);
  const tagRef = useRef(null);

  const addTransaction = async () => {
    const user = auth.currentUser; // ✅ Get the logged-in user

    if (!user) {
      showErrorMessage("You must be logged in to add a transaction!");
      return;
    }

    try {
      const transactionsRef = collection(db, "users", user.uid, "transactions");

      // ✅ Ensure values are properly extracted
      const selectedDate = dateRef.current.value ? new Date(dateRef.current.value) : new Date();
      const selectedTag = tagRef.current.value; // ✅ Correct way to fetch selected value

      // ✅ Add new transaction document
      await addDoc(transactionsRef, {
        name: nameRef.current.value || "Unknown",
        type: title,
        amount: parseFloat(amountRef.current.value) || 0, // ✅ Convert amount to number
        tag: selectedTag,
        date: selectedDate.toISOString(), // ✅ Properly formatted date
        createdAt: serverTimestamp(),
        userId: user.uid,
      });

      showSuccessMessage("Transaction added successfully!");

      // ✅ Close form after adding transaction
      setTimeout(() => {
        if (addIncome) addIncome();
        if (addExpenses) addExpenses();
        if (addBalance) addBalance();
      }, 1000);
    } catch (error) {
      console.error("Error adding transaction:", error);
      showErrorMessage("Failed to add transaction.");
    }
  };

  return (
    <>
      {/* ✅ Background Overlay */}
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4">
        {/* ✅ Form Container */}
        <div className={`w-full md:w-[40%] lg:w-[25%] min-h-[55%] p-6 rounded-lg shadow-lg relative bg-gradient-to-b from-black/2 via-${color}/10 to-black/60`} style={{ backgroundColor: bgColor }}>
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-2xl md:text-4xl font-bold font-light text-black">Add {title}</h2>
            <button
              onClick={() => {
                if (addIncome) addIncome();
                if (addExpenses) addExpenses();
                if (addBalance) addBalance();
              }}
              className="flex items-center justify-center h-[2.5rem] w-[2.5rem] text-xl md:text-3xl font-thin hover:bg-red-700 duration-300"
            >
              X
            </button>
          </div>

          <div className="w-full h-[1px] bg-black mb-4 md:mb-6"></div>

          {/* ✅ Form Fields (with spacing) */}
          <div className="flex flex-col space-y-4 md:space-y-6">
            <div>
              <label className="text-xl md:text-3xl text-black">Name</label>
              <input ref={nameRef} type="text" placeholder="March Salary" className="w-full h-[3rem] md:h-[4rem] p-2 border border-black rounded text-lg md:text-2xl text-black placeholder:text-lg md:placeholder:text-2xl" />
            </div>

            <div>
              <label className="text-xl md:text-3xl text-black">Amount</label>
              <input ref={amountRef} type="number" placeholder="2000" className="w-full h-[3rem] md:h-[4rem] p-2 border border-black rounded text-lg md:text-2xl text-black placeholder:text-lg md:placeholder:text-2xl" />
            </div>

            <div>
              <label className="text-xl md:text-3xl text-black">Date</label>
              <input ref={dateRef} type="datetime-local" className="w-full h-[3rem] md:h-[4rem] p-2 border border-black rounded text-lg md:text-2xl text-black" />
            </div>

            <div>
              <label className="text-xl md:text-3xl text-black">Tag</label>
              <select ref={tagRef} className="w-full h-[3rem] md:h-[4rem] p-2 border border-black rounded text-lg md:text-2xl text-black">
                <option value="Food">🍔 Food</option>
                <option value="Education">📚 Education</option>
                <option value="Office">🏢 Office</option>
                <option value="Miscellaneous">🔖 Miscellaneous</option>
              </select>
            </div>
          </div>

          {/* ✅ Add Button */}
          <div className="flex justify-center mt-4 md:mt-6">
            <button onClick={addTransaction} className="w-full md:w-[50%] h-[3rem] md:h-[4rem] bg-gray-900 text-white rounded text-xl md:text-2xl hover:bg-blue-700 duration-300">Add</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forms;
