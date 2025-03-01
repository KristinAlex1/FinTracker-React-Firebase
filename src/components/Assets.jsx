import React from "react";
import Charts from "./Charts";

const Assets = () => {
  return (
    <div className="h-auto w-auto gap-5 flex flex-row p-8">
      <div className="flex bg-blue-950 border-cyan-50 items-center justify-center border-5 rounded-4xl">
        <Charts
          chartType="Bar"
          tag="chartData"
          title="Income vs Expenses"
          titleSize="32"
        />
      </div>
      <div className="flex items-center justify-center w-[60rem] h-[40rem] bg-blue-600 border-cyan-50 border-5 rounded-4xl">
        <Charts
          chartType="Doughnut"
          tag="chartData"
          title="Doughnut Chart"
          titleSize="30"
        />
        <h1 className="flex items-center gap-12 ml-7 mr-7 mb-20 justify-center flex-col text-4xl font-medium tracking tight text-black ">
          <p className=""> What Does This Chart Tell You?</p>
          
            <ol className="text-2xl font-light text-white">
              <li className="mb-5">
              ● If the blue 🟦(expenses) is bigger → You might be overspending!
              </li>
              <li>
                {" "}
                ● If the red 🟥(income) is bigger → You are saving well! 
              </li>
              <li className="mt-5">
              ● Aim for a
              healthy balance between income & expenses.
              </li>
              <li className="mt-5">
              ● Goal: Maintain a healthy balance between 🟥 income & 🟦 expenses

              </li>
            </ol>
          
        </h1>
      </div>
      <div className="flex bg-blue-950 border-cyan-50 items-center justify-center border-5 rounded-4xl">
        <Charts
          chartType="Pie"
          tag="tagData"
          title="Income vs Expenses"
          titleSize="32"
        />
      </div>
    </div>
  );
};

export default Assets;
