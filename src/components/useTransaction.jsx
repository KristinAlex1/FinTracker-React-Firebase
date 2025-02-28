import { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import db, { auth } from "../pages/firebase";

const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async (user) => {
      if (!user) return;

      try {
        const transactionsRef = collection(db, "users", user.uid, "transactions");
        const querySnapshot = await getDocs(transactionsRef);

        const transactionData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTransactions(transactionData);

        let totalIncome = 0;
        let totalExpenses = 0;

        transactionData.forEach((transaction) => {
          const amount = Number(transaction.amount) || 0;
          if (transaction.type === "Income") {
            totalIncome += amount;
          } else if (transaction.type === "Expenses") {
            totalExpenses += amount;
          }
        });

        setIncome(totalIncome);
        setExpenses(totalExpenses);
        setBalance(totalIncome - totalExpenses);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchTransactions(user);
      } else {
        setTransactions([]);
        setIncome(0);
        setExpenses(0);
        setBalance(0);
      }
    });

    return () => unsubscribe();
  }, []);

  // ✅ Function to add a new transaction and update UI immediately
  const addTransaction = async (transaction) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const transactionsRef = collection(db, "users", user.uid, "transactions");
      await addDoc(transactionsRef, transaction);

      // ✅ Update state immediately to reflect the new transaction
      setTransactions((prev) => [...prev, transaction]);

      const amount = Number(transaction.amount) || 0;
      if (transaction.type === "Income") {
        setIncome((prev) => prev + amount);
        setBalance((prev) => prev + amount);
      } else if (transaction.type === "Expenses") {
        setExpenses((prev) => prev + amount);
        setBalance((prev) => prev - amount);
      }
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return { transactions, income, expenses, balance, loading, addTransaction };
};

export default useTransactions;
