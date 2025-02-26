import { useEffect, useRef, useState } from "react";
import { FaPen, FaPenAlt, FaPenNib, FaSearch } from "react-icons/fa";
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
import { FaTrashCan } from "react-icons/fa6";

const Search = () => {
  const [transactions, setTransactions] = useState([]); // Stores transaction list
  const [loading, setLoading] = useState(true); // Controls loading state
  const [searchQuery, setSearchQuery] = useState(""); // Stores search input
  const [user, setUser] = useState(null); // Stores authenticated user
  const [orderByAmount, setOrderByAmount] = useState(null);
  const [orderByDate, setOrderByDate] = useState(true);
  const [selected, setSelected] = useState("date");
  const searchRef = useRef();

  // ✅ Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        showSuccessMessage("User Logged In");
        fetchTransactions(currentUser); // ✅ Fetch transactions after
        // user loads
      } else {
        setUser(null);
        setTransactions([]);
        showErrorMessage("User not Logged In");
      }
    });

    return () => unsubscribe(); // Cleanup the listener when component unmounts
  }, []);

  // ✅ Fetch Transactions Function
  const fetchTransactions = async (currentUser) => {
    if (!currentUser) return;

    try {
      // ✅ Reference to Firestore collection `/users/{userId}/transactions`
      const transactionsRef = collection(
        db,
        "users",
        currentUser.uid,
        "transactions"
      );
      if (orderByDate) {
        const q = query(transactionsRef, orderBy("date", "desc"));

        // ✅ Get transactions from Firestore
        const querySnapshot = await getDocs(q);

        // ✅ Map data into a usable format
        const transactions = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTransactions(transactions); // ✅ Store fetched transactions in state
        setLoading(false);
      } else if (orderByAmount) {
        const q = query(transactionsRef, orderBy("amount", "desc"));

        // ✅ Get transactions from Firestore
        const querySnapshot = await getDocs(q);

        // ✅ Map data into a usable format
        const transactions = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTransactions(transactions); // ✅ Store fetched transactions in state
        setLoading(false);
      }

      // ✅ Query to order transactions by date (most recent first)
    } catch (error) {
      console.error("Error fetching transactions:", error);
      showErrorMessage("Failed to fetch transactions.");
      setLoading(false);
    }
  };

  const search = (str) => {
    const filteredTransactions = transactions.filter(
      (item) => item.name === str
    );
    setTransactions(filteredTransactions);
  };

  const deleteSearch = async (id) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const transactionRef = doc(db, "users", user.uid, "transactions", id);
      await deleteDoc(transactionRef);
      showSuccessMessage("Transaction deleted successfully!");

      // ✅ Remove deleted transaction from state
      setTransactions((prevTransactions) =>
        prevTransactions.filter((transaction) => transaction.id !== id)
      );
    } catch (error) {
      console.error("Error deleting transaction:", error);
      showErrorMessage("Failed to delete transaction.");
    }
  };

  // ✅ Fetch Transactions on Component Mount
  useEffect(() => {
    fetchTransactions();
  }, []);
  return (
    <>
      <div className="flex mt-[3rem] justify-center items-center">
        <div className="flex flex-col h-[40rem] w-[95%] bg-gray-900 rounded-2xl">
          <div className="flex flex-row gap-3">
            <input
              ref={searchRef}
              placeholder=" Search"
              className="h-[3rem] w-[80%] mt-[2.5rem] ml-[2rem] border-2 border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button onClick={() => search(searchRef.current.value)}>
              <FaSearch className="h-[2.5rem] w-[2.5rem] font-thin mt-[3rem]" />
            </button>
            <button
              onClick={() => {
                setOrderByDate(true);
                setOrderByAmount(false);
                setSelected("date");
                fetchTransactions(user);
              }}
              className={`flex justify-center items-center rounded-md h-[3rem] w-[9rem] mt-[2.5rem] ml-[1rem] hover:bg-blue-100 duration-300 ${
                selected === "date" ? "bg-blue-100 text-black" : "bg-blue-900"
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
              className={`flex justify-center items-center rounded-md h-[3rem] w-[9rem] mt-[2.5rem] ml-[1rem] hover:bg-blue-100 duration-300 ${
                selected === "amount" ? "bg-blue-100 text-black" : "bg-blue-900"
              }`}
            >
              Order by Amount
            </button>
          </div>
          <div className="flex flex-col items-center self-center justify-center mt-[2rem] w-[95%]">
            {/* ✅ Table Headers */}
            <div className="flex justify-evenly items-center w-full h-[6rem] rounded-lg bg-gray-950 mb-[1rem] font-semibold text-white text-3xl border-b-4 border-gray-700 shadow-md">
              <h1 className="w-1/5 text-center">Name</h1>
              <h1 className="w-1/5 text-center">Type</h1>
              <h1 className="w-1/5 text-center">Amount</h1>
              <h1 className="w-1/5 text-center">Tag</h1>
              <h1 className="w-1/5 text-center">Date</h1>
              <h1 className="w-1/5 text-center">Actions</h1>
            </div>

            {/* ✅ Transactions List */}
            {transactions.map((item, index) => (
              <div
                key={item.id}
                className={`flex justify-evenly items-center w-full min-h-[4rem] rounded-lg font-light text-xl border border-gray-700 shadow-md 
      ${
        index % 2 === 0 ? "bg-gray-800 text-white" : "bg-gray-700 text-gray-300"
      } 
      hover:bg-gray-600 transition duration-300`}
              >
                <h1 className="w-1/5 text-center">{item.name}</h1>
                <h1 className="w-1/5 text-center">{item.type}</h1>
                <h1 className="w-1/5 text-center">${item.amount}</h1>
                <h1 className="w-1/5 text-center">{item.tag}</h1>
                <h1 className="w-1/5 text-center">
                  {new Date(item.date?.seconds * 1000).toLocaleDateString()}
                </h1>
                <h1 className="flex justify-center items-center w-1/5 gap-4 text-center">
                  <button onClick={() => deleteSearch(item.id)}>
                    <FaTrashCan className="text-2xl text-red-600 hover:text-red-300" />
                  </button>
                  <FaPen className="text-2xl text-blue-800 hover:text-blue-600" />
                </h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
