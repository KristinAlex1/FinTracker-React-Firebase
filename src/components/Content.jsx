import React from "react";
import expenseImage from "../assets/expense.png";
import reportImage from "../assets/Reports.png";
import incomeImage from "../assets/Income.png";
import savingImage from "../assets/Savings.png";
import debtImage from "../assets/Debt.png";

const Content = () => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-4">
      {/* First Row */}
      <div className="flex flex-wrap w-full justify-center gap-4">
        <div className="w-full md:w-[35%] h-auto md:h-[55rem] mt-[3rem] rounded-3xl bg-gray-900 p-4 md:p-0">
          <h1 className="ml-[2rem] mt-[2rem] flex flex-wrap text-3xl md:text-5xl whitespace-pre-line">
            Track and Tame
          </h1>
          <h1 className="ml-[2rem] mt-[1rem] flex flex-wrap text-3xl md:text-5xl whitespace-pre-line">
            Expenses
          </h1>
          <img
            className="w-[80%] h-auto mt-[2rem] mb-[3rem] mx-auto"
            src={expenseImage}
            alt="Expense"
          />
          <h1 className="text-lg md:text-3xl font-thin text-white mx-4">
            Gain full control over your spending with real-time insights and
            smart budgeting tools. Keep track of every expense, set financial
            goals, and make informed decisions to manage your money better.
          </h1>
        </div>

        <div className="w-full md:w-[45%] h-auto md:h-[55rem] mt-[3rem] rounded-3xl bg-gray-900 p-4 md:p-0">
          <h1 className="ml-[2rem] mt-[2rem] flex flex-wrap text-3xl md:text-5xl whitespace-pre-line">
            Smart Reports
          </h1>
          <img
            className="w-[80%] h-auto mt-[2rem] mx-auto"
            src={reportImage}
            alt="Reports"
          />
          <h1 className="text-lg md:text-3xl font-thin text-white mx-4">
            Get a clear breakdown of your financial trends with detailed
            reports. Analyze your spending patterns, track progress, and make
            data-driven decisions to stay on top of your finances.
          </h1>
        </div>
      </div>

      {/* Second Row */}
      <div className="flex flex-wrap w-full justify-center gap-4">
        <div className="w-full md:w-[27%] h-auto md:h-[45rem] mt-[0.5rem] rounded-3xl bg-gray-900 p-4 md:p-0">
          <h1 className="ml-[2rem] mt-[2rem] flex flex-wrap text-3xl md:text-5xl whitespace-pre-line">
            Income
          </h1>
          <img
            className="w-[80%] h-auto mt-[2rem] mx-auto"
            src={incomeImage}
            alt="Income"
          />
          <h1 className="text-lg md:text-3xl font-thin text-white mx-4">
            Monitor multiple income streams effortlessly. Keep track of your
            earnings, side hustles, and passive income to understand your cash
            flow better and plan your finances effectively.
          </h1>
        </div>

        <div className="w-full md:w-[27%] h-auto md:h-[57rem] mt-[0.5rem] rounded-3xl bg-gray-900 p-4 md:p-0">
          <h1 className="ml-[2rem] mt-[2rem] flex flex-wrap text-3xl md:text-5xl whitespace-pre-line">
            Savings
          </h1>
          <img
            className="w-[80%] h-auto mt-[2rem] mx-auto"
            src={savingImage}
            alt="Savings"
          />
          <h1 className="text-lg md:text-3xl font-thin text-white mx-4">
            Set savings goals and track progress toward financial milestones.
            Automate savings contributions and gain insights into how small
            changes in spending can help grow your savings.
          </h1>
        </div>

        <div className="w-full md:w-[27%] h-auto md:h-[45rem] mt-[0.5rem] rounded-3xl bg-gray-900 p-4 md:p-0">
          <h1 className="ml-[2rem] mt-[2rem] flex flex-wrap text-3xl md:text-5xl whitespace-pre-line">
            Debt Management
          </h1>
          <img
            className="w-[80%] h-auto mt-[2rem] mx-auto"
            src={debtImage}
            alt="Debt"
          />
          <h1 className="text-lg md:text-3xl font-thin text-white mx-4">
            Stay on top of your debts with structured repayment plans. Track
            loan balances, credit card dues, and interest payments while
            receiving smart recommendations to pay off debt faster.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Content;
