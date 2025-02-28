import { useEffect, useState } from "react";
import coins from "../assets/coins.png";
import Forms from "./Forms";
import Search from "./Search";
import db, { auth } from "../pages/firebase";
import { collection, doc, getDocs } from "firebase/firestore";
import Charts from "./Charts";


const AddSection = () => {
  const [isIncome, setIsIncome] = useState(false);
  const [isBalance, setIsBalance] = useState(false);
  const [isExpenses, setIsExpenses] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [fetchExpenses, setFetchExpenses] = useState({
    transactions: [],
    total: 0,
  });
  const [fetchIncomes, setFetchIncomes] = useState({
    transactions: [],
    total: 0,
  });
  const [balance,setBalance] = useState(0);

  const addIncome = () => {
    setIsIncome((prevstate) => !prevstate);
  };
  const addBalance = () => {
    setIsBalance((prevstate) => !prevstate);
  };
  const addExpenses = () => {
    setIsExpenses((prevstate) => !prevstate);
  };
  const handleTransactionUpdate = () => {
    setUpdateTrigger((prev) => !prev); // ✅ Toggles between `true` and `false` to re-trigger `useEffect`
  }


  
   

  useEffect(() => {
    const transactionsType = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const transactionsRef = collection(
          db,
          "users",
          user.uid,
          "transactions"
        );
        const querySnapshot = await getDocs(transactionsRef);

        const allTransactions = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Filter expenses and income
        const transactionExpenses = allTransactions.filter(
          (item) => item.type === "Expenses"
        );
        const transactionIncome = allTransactions.filter(
          (item) => item.type === "Income"
        );

        // Calculate total amount for expenses and income
        const totalExpenses = transactionExpenses.reduce(
          (sum, item) => sum + (item.amount || 0),
          0
        );
        const totalIncome = transactionIncome.reduce(
          (sum, item) => sum + (item.amount || 0),
          0
        );
        

        // Store transactions and total amount in state
        setFetchExpenses({
          transactions: transactionExpenses,
          total: totalExpenses,
        });
        setFetchIncomes({
          transactions: transactionIncome,
          total: totalIncome,
        });
        setBalance(totalIncome - totalExpenses)

      } catch (error) {
        console.log("Error fetching transactions:", error);
      }
    };

    transactionsType(); // Call the function inside useEffect
  }, [updateTrigger]); // ✅ Now updates when transactions change

  useEffect(() => {
    console.log("Updated Expenses:", fetchExpenses.total);
    console.log("Updated Incomes:", fetchIncomes.total);
  }, [fetchExpenses, fetchIncomes]);

    
  

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="flex flex-col justify-between items-center h-auto md:h-auto mt-[2rem] w-full md:w-[95%] bg-gray-900 rounded-4xl p-4 md:p-8">
          {/* ✅ Top Section: Centered Income, Expenses, Balance Divs */}
          <div className="flex flex-col md:flex-row justify-center md:justify-evenly w-full">
            {/* Total Income */}
            <div
              style={{ backgroundColor: "#87CEEB" }}
              className="h-[15rem] w-full md:w-[30rem] lg:w-[45rem] mt-[3rem] text-black rounded-xl bg-gradient-to-r from-black/40 via-white/20 to-black/40 p-4"
            >
              <div className="text-4xl mt-[1rem] ml-[2rem] font-normal">
                Total Income
              </div>
              <div className="w-[90%] ml-[2rem] h-[0.1%] bg-black"></div>
              <div className="text-3xl mt-[1rem] ml-[2rem] font-normal">${fetchIncomes.total}</div>
              <button
                onClick={addIncome}
                className="w-[80%] md:w-[35rem] h-[3rem] mt-[2rem] mx-auto md:ml-[4rem] rounded-xl text-3xl text-white font-light cursor-pointer"
                style={{ backgroundColor: "#171621" }}
              >
                Add Income
              </button>
            </div>
            {isIncome && (
              <Forms
                title="Income"
                addIncome={addIncome}
                bgColor="#4F91C3"
                color="blue"
                onTransactionUpdate={handleTransactionUpdate}
              />
            )}

            {/* Total Expenses */}
            <div
              style={{ backgroundColor: "#96DED1" }}
              className="h-[15rem] w-full md:w-[30rem] lg:w-[45rem] mt-[3rem] text-black rounded-xl bg-gradient-to-r from-black/40 via-white/20 to-black/40 p-4"
            >
              <div className="text-4xl mt-[1rem] ml-[2rem] font-normal">
                Total Expenses
              </div>
              <div className="w-[90%] ml-[2rem] h-[0.1%] bg-black"></div>
              <div className="text-3xl mt-[1rem] ml-[2rem] font-normal">${fetchExpenses.total}</div>
              <button
                onClick={addExpenses}
                style={{ backgroundColor: "#171621" }}
                className="w-[80%] md:w-[35rem] h-[3rem] mt-[2rem] bg-gray-900 mx-auto md:ml-[4rem] rounded-xl text-3xl text-white font-light cursor-pointer"
              >
                Add Expenses
              </button>
            </div>
            {isExpenses && (
              <Forms
                title="Expenses"
                addExpenses={addExpenses}
                bgColor="#5EA095"
                color="green"
                onTransactionUpdate={handleTransactionUpdate}
              />
            )}

            {/* Current Balance */}
            <div
              style={{ backgroundColor: "#CCCCFF" }}
              className="h-[15rem] w-full md:w-[30rem] lg:w-[45rem] mt-[3rem] text-black rounded-xl bg-gradient-to-r from-black/40 via-white/20 to-black/40 p-4"
            >
              <div className="text-4xl mt-[1rem] ml-[2rem] font-normal">
                Current Balance
              </div>
              <div className="w-[90%] ml-[2rem] h-[0.1%] bg-black"></div>
              <div className="text-3xl mt-[1rem] ml-[2rem] font-normal">${balance}</div>
              <button
                onClick={addBalance}
                style={{ backgroundColor: "#171621" }}
                className="w-[80%] md:w-[35rem] h-[3rem] mt-[2rem] bg-gray-900 mx-auto md:ml-[4rem] rounded-xl text-3xl text-white font-light cursor-pointer"
              >
                Reset Balance
              </button>
            </div>
            {isBalance && (
              <Forms
                title="Balances"
                addBalance={addBalance}
                bgColor="#8282CC"
                color="purple"
                onTransactionUpdate={handleTransactionUpdate}
              />
            )}
          </div>

          {/* ✅ Bottom Section: Image & Text (Centered & Spaced) */}
          {(balance === 0) && (
            <div className="flex flex-col justify-center items-center mt-[5rem] md:mt-[10rem] mb-[3rem] w-full">
              <img src={coins} className="w-[60%] md:w-[20rem]" />
              <div className="text-white text-2xl md:text-4xl mt-4 md:mt-[2rem] text-center font-thin px-4 md:px-0">
                You currently have no Transactions recorded!
              </div>
            </div>
          )}
          <Charts/>
        </div>
        
      </div>
      

      <Search updateTrigger={updateTrigger} onTransactionUpdate={handleTransactionUpdate} />

    </>
  );
};

export default AddSection;
