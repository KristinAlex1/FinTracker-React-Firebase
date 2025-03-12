import { useEffect, useState } from "react";
import coins from "../assets/coins.png";
import Forms from "./Forms";
import Search from "./Search";
import db, { auth } from "../pages/firebase";
import { collection, doc, getDocs } from "firebase/firestore";
import Assets from "./Assets";

const AddSection = () => {
  const [isIncome, setIsIncome] = useState(false);
  const [isBalance, setIsBalance] = useState(false);
  const [isExpenses, setIsExpenses] = useState(false);
  const [isAssets, setIsAssets] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [fetchExpenses, setFetchExpenses] = useState({
    transactions: [],
    total: 0,
  });
  const [fetchIncomes, setFetchIncomes] = useState({
    transactions: [],
    total: 0,
  });
  const [fetchAssets, setFetchAssets] = useState({
    transactions: [],
    total: 0,
  });
  const [balance, setBalance] = useState(0);

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
    setIsAssets((prevstate) => !prevstate);
  };
  const handleTransactionUpdate = () => {
    setUpdateTrigger((prev) => !prev);

    setFetchAssets((prevState) => ({
      ...prevState,
      total: prevState.total + parseFloat(fetchAssets.total || 0),
    }));
  };

  useEffect(() => {
    const transactionsType = async () => {
      const user = auth.currentUser;
      if (!user) return;
  
      try {
        const transactionsRef = collection(db, "users", user.uid, "transactions");
        const transactionSnapshot = await getDocs(transactionsRef);
  
        const allTransactions = transactionSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        console.log("All Transactions:", allTransactions); // ✅ Debugging
  
        const transactionExpenses = allTransactions.filter(
          (item) => item.type === "Expenses"
        );
        const transactionIncome = allTransactions.filter(
          (item) => item.type === "Income"
        );
        const transactionAssets = allTransactions.filter(
          (item) => item.type === "Assets"
        ); // ✅ Corrected Assets fetching
  
        console.log("Filtered Assets:", transactionAssets); // ✅ Debugging
  
        const totalExpenses = transactionExpenses.reduce(
          (sum, item) => sum + (item.amount || 0),
          0
        );
        const totalIncome = transactionIncome.reduce(
          (sum, item) => sum + (item.amount || 0),
          0
        );
        const totalAssets = transactionAssets.reduce(
          (sum, item) => sum + (item.amount || 0),
          0
        );
  
        setFetchExpenses({
          transactions: transactionExpenses,
          total: totalExpenses,
        });
        setFetchIncomes({
          transactions: transactionIncome,
          total: totalIncome,
        });
        setFetchAssets({
          transactions: transactionAssets, // ✅ Corrected setting of assets state
          total: totalAssets,
        });
  
        setBalance(totalIncome - totalExpenses);
  
        console.log("Total Assets:", totalAssets);
        
      } catch (error) {
        console.log("Error fetching transactions:", error);
      }
    };
  
    transactionsType();
  }, [updateTrigger]);
  

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="flex flex-col justify-between items-center h-auto md:h-auto mt-[2rem] w-full md:w-[80%] rounded-4xl p-4 md:p-8">
          <div className="grid grid-cols-4 w-full">
            <div className="h-[15rem] w-[90%] rounded-xl p-4 text-white bg-gradient-to-r from-orange-500 via-orange-400 to-red-600">
              <div className="text-4xl mt-[1rem] font-normal">
                Current Balance
              </div>
              <div className="text-3xl mt-[1rem] font-normal">${balance}</div>
              <button
                onClick={addBalance}
                className="mt-[2rem] w-[5rem] h-[3rem] bg-amber-700 hover:bg-gray-900 rounded-xl text-3xl text-white"
              >
                +
              </button>
            </div>
            {isBalance && (
              <Forms
                title="Balance"
                addBalance={addBalance}
                bgColor="#D84315"
                color="red"
                onTransactionUpdate={handleTransactionUpdate} // ✅ Passed correctly
              />
            )}

            <div className="h-[15rem] rounded-xl p-4 w-[90%] text-white bg-gradient-to-r from-blue-600 via-blue-500 to-blue-800">
              <div className="text-4xl mt-[1rem] font-normal">Total Income</div>
              <div className="text-3xl mt-[1rem] font-normal">
                ${fetchIncomes.total}
              </div>
              <button
                onClick={addIncome}
                className="mt-[2rem] w-[5rem] h-[3rem] bg-blue-700 hover:bg-gray-900 rounded-xl text-3xl text-white"
              >
                +
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

            <div className="h-[15rem] rounded-xl p-4 w-[90%] text-white bg-gradient-to-r from-green-600 via-green-500 to-green-800">
              <div className="text-4xl mt-[1rem] font-normal">
                Total Expenses
              </div>
              <div className="text-3xl mt-[1rem] font-normal">
                ${fetchExpenses.total}
              </div>
              <button
                onClick={addExpenses}
                className="mt-[2rem] w-[5rem] h-[3rem] bg-green-700 hover:bg-gray-900 rounded-xl text-3xl text-white"
              >
                +
              </button>
            </div>
            {isExpenses && (
              <Forms
                title="Expenses"
                addExpenses={addExpenses}
                bgColor="#5EA095"
                color="green"
                onTransactionUpdate={handleTransactionUpdate} // ✅ Passed correctly
              />
            )}
            <div className="h-[15rem] rounded-xl p-4 w-[90%] text-white bg-gradient-to-r from-purple-500 via-purple-400 to-purple-800">
              <div className="text-4xl mt-[1rem] font-normal">Assets</div>
              <div className="text-3xl mt-[1rem] font-normal">
                ${fetchAssets.total}
              </div>
              <button
                onClick={addAssets}
                className="mt-[2rem] w-[5rem] h-[3rem] bg-purple-700 hover:bg-gray-900 rounded-xl text-3xl text-white"
              >
                +
              </button>
            </div>
            {isAssets && (
              <Forms
                title="Assets"
                addAssets={addAssets}
                bgColor="#8A2BE2"
                color="purple"
                onTransactionUpdate={handleTransactionUpdate} // ✅ Passed correctly
              />
            )}
          </div>
          <div className="flex mt-[10rem]">
            
              <Assets/>

          </div>
          
        </div>
      </div>
      <Search
        updateTrigger={updateTrigger}
        onTransactionUpdate={handleTransactionUpdate}
      />
    </>
  );
};

export default AddSection;
