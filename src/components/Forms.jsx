import { useState } from "react";
import db, { auth } from "../pages/firebase";
import { collection, addDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { showErrorMessage, showSuccessMessage } from "./toastNotifications";

const Forms = ({ 
  title = "", 
  addIncome, 
  bgColor = "", 
  addExpenses, 
  addBalance, 
  addAssets,
  color = "", 
  transactionData = null,  
  edit = false ,
  onTransactionUpdate = () => {} // ✅ Function to trigger UI refresh
}) => {

    
  // ✅ UseState to hold form values
  const [formData, setFormData] = useState({
    name: transactionData?.name || "",
    amount: transactionData?.amount || "",
    date: transactionData?.date 
      ? new Date(transactionData.date.seconds * 1000).toISOString().slice(0, 16) 
      : "",
    tag: transactionData?.tag || "Food"
  });

  // ✅ Updates form state on input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Add New Transaction
  const addTransaction = async () => {
    const user = auth.currentUser;
    if (!user) {
        showErrorMessage("You must be logged in to add a transaction!");
        return;
    }

    if (!formData.name || !formData.amount || !formData.date) {
        showErrorMessage("All fields are required!");
        return;
    }

    try {
        const transactionsRef = collection(db, "users", user.uid, "transactions");

        const newTransaction = {
            name: formData.name,
            type: title,
            amount: parseFloat(formData.amount) || 0,
            tag: formData.tag,
            date: new Date(formData.date),
            createdAt: serverTimestamp(),
            userId: user.uid,
        };

        // ✅ Add transaction to Firestore and get the ID
        const docRef = await addDoc(transactionsRef, newTransaction);
        newTransaction.id = docRef.id; // Assign Firestore-generated ID

        showSuccessMessage("Transaction added successfully!");

        // ✅ Close the form
        if (addIncome) addIncome();
        if (addExpenses) addExpenses();
        if (addBalance) addBalance();
        if (addAssets) addAssets();

        // ✅ Trigger UI update by adding the new transaction to the list immediately
        onTransactionUpdate(newTransaction);
        
    } catch (error) {
        console.error("Error adding transaction:", error);
        showErrorMessage("Failed to add transaction.");
    }
};

  // ✅ Edit Existing Transaction
  const editTransaction = async () => {
    const user = auth.currentUser;
    if (!user || !transactionData?.id) {
      showErrorMessage("Invalid transaction data!");
      return;
    }

    try {
      const transactionRef = doc(db, "users", user.uid, "transactions", transactionData.id);

      await updateDoc(transactionRef, {
        name: formData.name,
        amount: parseFloat(formData.amount) || 0,
        tag: formData.tag,
        date: new Date(formData.date)
      });
      
      showSuccessMessage("Transaction updated successfully!");

      onTransactionUpdate(); // ✅ Update transactions list after editing

      if (addIncome) addIncome();
      if (addExpenses) addExpenses();
      if (addBalance) addBalance();
      if (addAssets) addAssets();
    } catch (error) {
      console.error("Error updating transaction:", error);
      showErrorMessage("Failed to update transaction.");
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4">
        <div 
          className="w-full max-w-md md:max-w-lg lg:max-w-xl min-h-[47%] p-6 bg-blue-950 rounded-lg shadow-lg relative"
      
        >
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-xl md:text-4xl font-bold text-white">
              {edit ? "Edit" : "Add"} {title}
            </h2>
            <button
              onClick={() => {
                if (addIncome) addIncome();
                if (addExpenses) addExpenses();
                if (addBalance) addBalance();
                if (addAssets) addAssets();
              }}
              className="flex items-center justify-center h-10 w-10 text-xl md:text-3xl font-thin hover:bg-red-700 duration-300"
            >
              X
            </button>
          </div>

          <div className="w-full h-[1px] bg-black mb-4 md:mb-6"></div>

          {/* ✅ Form Fields */}
          <div className="flex flex-col space-y-4 text-white md:space-y-6">
            <div>
              <label className="text-lg md:text-xl">Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="March Salary" 
                className="w-full h-10 md:h-12 p-2 border border-black rounded text-lg md:text-xl focus:outline-none focus:ring-2 focus:ring-blue-500 px-3 text-gray-200"
              />
            </div>

            <div>
              <label className="text-lg md:text-xl ">Amount</label>
              <input 
                type="number" 
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="2000" 
                className="w-full h-10 md:h-12 p-2 border border-black rounded text-lg md:text-xl focus:outline-none focus:ring-2 focus:ring-blue-500 px-3 text-gray-200 "
              />
            </div>

            <div>
              <label className="text-lg md:text-xl ">Date</label>
              <input 
                type="datetime-local" 
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full h-10 md:h-12 p-2 border border-black rounded text-lg md:text-xl focus:outline-none focus:ring-2 focus:ring-blue-500 px-3 text-gray-200 "
              />
            </div>

            <div>
              <label className="text-lg md:text-xl ">Tag</label>
              <select 
                name="tag"
                value={formData.tag}
                onChange={handleChange}
                className="w-full h-10 md:h-12 p-2 border border-black rounded text-lg md:text-xl focus:outline-none focus:ring-2 focus:ring-blue-500 px-3 text-black "
              >
                {addAssets ? 
                (<>
                  <option value="Home">🏠 Home</option>
                  <option value="Stock">📈 Stock</option>
                  <option value="Real Estate">🏢 Real-Estate</option>
                  <option value="Miscellaneous">🔖 Miscellaneous</option>
                </>)
                    :
                (<>
                  <option value="Food">🍔 Food</option>
                  <option value="Education">📚 Education</option>
                  <option value="Office">🏢 Office</option>
                  <option value="Miscellaneous">🔖 Miscellaneous</option>
                </>)}
              </select>
            </div>
          </div>

          <div className="flex justify-center mt-7 md:mt-7">
            <button onClick={edit ? editTransaction : addTransaction} className="w-full h-10 md:h-12 bg-gray-900 text-white rounded text-lg md:text-xl hover:bg-blue-700 duration-300">
              {edit ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div> 
    
    </>
  );
};

export default Forms;
