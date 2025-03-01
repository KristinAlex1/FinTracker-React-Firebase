import { useEffect, useRef, useState } from "react";
import { FaPen, FaSearch, FaTrash } from "react-icons/fa";
import { showErrorMessage, showSuccessMessage } from "./toastNotifications";
import db, { auth } from "../pages/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Forms from "./Forms";

const Search = ({ updateTrigger, onTransactionUpdate }) => {
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState(null);
  const [orderByAmount, setOrderByAmount] = useState(false);
  const [orderByDate, setOrderByDate] = useState(true);
  const [selected, setSelected] = useState("date");
  const searchRef = useRef();
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [search,setSearch] = useState(null)
  const [originalTransactions, setOriginalTransactions] = useState([]); // Store the full transactions list


  const [isIncome, setIsIncome] = useState(false);
  const [isBalance, setIsBalance] = useState(false);
  const [isExpenses, setIsExpenses] = useState(false);
  const [isAssets, setIsAssets] = useState(false);

  const addIncome = () => {
    setIsIncome((prevstate) => !prevstate);
  };
  const addBalance = () => {
    setIsBalance((prevstate) => !prevstate);
  };
  const addExpenses = () => {
    setIsExpenses((prevstate) => !prevstate);
  };
  const addAssets = () => {
    setIsAssets((prevstate) => !prevstate)

  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchTransactions(currentUser);
      } else {
        setUser(null);
        setTransactions([]);
      }
    });

    return () => unsubscribe();
  }, [updateTrigger]);

  const fetchTransactions = async (currentUser) => {
    if (!currentUser) return;

    try {
      const transactionsRef = collection(
        db,
        "users",
        currentUser.uid,
        "transactions"
      );
      const q = orderByDate
        ? query(transactionsRef, orderBy("date", "desc"))
        : query(transactionsRef, orderBy("amount", "desc"));

      const querySnapshot = await getDocs(q);
      const transactions = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTransactions(transactions);
      setOriginalTransactions(transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      showErrorMessage("Failed to fetch transactions.");
    }
  };

  useEffect(() => {
    if (user) fetchTransactions(user);
  }, [orderByDate, orderByAmount]);

  const deleteTransaction = async (id) => {
    if (!user) return;
  
    try {
      await deleteDoc(doc(db, "users", user.uid, "transactions", id));
      showSuccessMessage("Transaction deleted successfully!");
      setTransactions(
        transactions.filter((transaction) => transaction.id !== id)
      );
      setOriginalTransactions(
        transactions.filter((transaction) => transaction.id !== id)
      )
  
      // ✅ Ensure the totals are updated
      if (onTransactionUpdate) {
        onTransactionUpdate();
      }
    } catch (error) {
      console.error("Error deleting transaction:", error);
      showErrorMessage("Failed to delete transaction.");
    }
  };

  const searchName = (str) => {
    if (!str) {
      // ✅ Reset to the full list if the search input is empty
      setTransactions(originalTransactions);
      return;
    }
  
    const filteredTransactions = originalTransactions.filter((item) =>
      item.name.toLowerCase().includes(str.toLowerCase())
    );
  
    setTransactions(filteredTransactions);
  };
  
  

  const handleTransactionUpdate = (newTransaction) => {
    if (newTransaction) {
      setTransactions((prevTransactions) =>
        prevTransactions.map((transaction) =>
          transaction.id === newTransaction.id ? newTransaction : transaction
        )
      );
    } else {
      if (user) fetchTransactions(user);
    }
    setEditingTransaction(null); // Close the form after editing
  
    // ✅ Ensure the totals are updated
    if (onTransactionUpdate) {
      onTransactionUpdate();
    }
  };
  
  return (
    <>
      <div className="flex mt-[3rem] justify-center items-center">
        <div className="flex flex-col items-center h-auto w-[90%] bg-gray-900 rounded-2xl p-6">
          {/* Search and Sorting Buttons */}
          <div className="flex flex-col md:flex-row gap-3 justify-center w-full items-center">
            <input
              ref={searchRef}
              placeholder="Search"
              className="h-[3rem] w-full md:w-[70%] border-2 border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 px-3 text-gray-200"
            />
            <button
              onClick={() => searchName(searchRef.current.value)}
              className="mt-2 md:mt-0"
            >
              <FaSearch className="h-[2.5rem] w-[2.5rem] text-white" />
            </button>

            <button
              onClick={() => {
                setOrderByDate(true);
                setOrderByAmount(false);
                setSelected("date");
                fetchTransactions(user);
              }}
              className={`flex justify-center items-center rounded-md h-[3rem] w-full md:w-[9rem] hover:bg-blue-100 duration-300 ${
                selected === "date"
                  ? "bg-blue-100 text-black"
                  : "bg-blue-900 text-white"
              }`}
            >
              Order by Date
            </button>

            <button
              onClick={() => {
                setOrderByAmount(true);
                setOrderByDate(false);
                setSelected("amount");
                fetchTransactions(user);
              }}
              className={`flex justify-center items-center rounded-md h-[3rem] w-full md:w-[9rem] hover:bg-blue-100 duration-300 ${
                selected === "amount"
                  ? "bg-blue-100 text-black"
                  : "bg-blue-900 text-white"
              }`}
            >
              Order by Amount
            </button>
          </div>

          {/* Transactions Table for Larger Screens */}
          <div className="hidden md:flex flex-col w-full mt-[2rem]">
            <div className="grid grid-cols-6 w-full text-white text-3xl mb-[1rem] bg-gray-950 h-[5rem] items-center text-center border-4 border-gray-700">
              <h1>Name</h1>
              <h1>Amount</h1>
              <h1>Type</h1>
              <h1>Tag</h1>
              <h1>Date</h1>
              <h1>Actions</h1>
            </div>

            {transactions.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-6 w-full text-xl bg-gray-800 hover:bg-gray-600 transition duration-300 h-[4rem] items-center text-center text-white border-2 border-blue-950 rounded-2xl"
              >
                <h1>{item.name}</h1>
                <h1>${item.amount}</h1>
                <h1>{item.type}</h1>
                <h1>{item.tag}</h1>
                <h1>
                  {new Date(item.date?.seconds * 1000).toLocaleDateString()}
                </h1>
                <div className="flex justify-center gap-4">
                  <button onClick={() => deleteTransaction(item.id)}>
                    <FaTrash className="text-2xl text-red-600 hover:text-red-300" />
                  </button>
                  <button onClick={() => setEditingTransaction(item)}>
                    <FaPen className="text-2xl text-blue-800 hover:text-blue-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {editingTransaction && (
        <Forms
          edit={true}
          title={editingTransaction.type}
          bgColor={editingTransaction.type === "Income" ? "#4F91C3" : "#5EA095"}
          color={editingTransaction.type === "Income" ? "blue" : "green"}
          transactionData={editingTransaction}
          onTransactionUpdate={handleTransactionUpdate}
        />
      )}
    </>
  );
};

export default Search;
