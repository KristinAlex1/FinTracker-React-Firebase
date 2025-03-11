import Charts from "./Charts";

const Assets = () => {
  return (
    <div className="h-auto w-90% gap-5 p-8">
      <div className="grid grid-cols-2">
        {/* ✅ Line Chart - 80% Width & 60rem Height */}
        <div className="bg-blue-950 border-cyan-50 flex items-center justify-center border-5 rounded-4xl w-[100rem] h-[45vh] overflow-hidden ">
          <div className="w-full h-full flex items-center justify-center mb-[10rem]">
            <Charts
              chartType="Line"
              tag="cumulativeData"
              title="Income vs Expenses"
              titleSize="48"
              fontSize="30"
            />
          </div>
        </div>

        {/* ✅ Empty div for spacing */}
      </div>

      <div className="grid grid-cols-2">
        <div className="flex bg-blue-950 border-cyan-50 items-center justify-center border-5 rounded-4xl">
          <Charts
            chartType="Bar"
            tag="chartData"
            title="Income vs Expenses"
            titleSize="32"
            fontSize="25"
          />
        </div>

        <div className="flex bg-blue-950 border-cyan-50 items-center justify-center border-5 rounded-4xl">
          <Charts
            chartType="Pie"
            tag="tagData"
            title="Spending Pie"
            titleSize="32"
            fontSize="25"
          />
          <h1 className="flex items-center gap-12 ml-7 mr-7 mb-20 justify-center flex-col text-4xl font-medium tracking-tight text-black">
            <p className=""> What Does This Chart Tell You?</p>

            <ol className="text-2xl font-light text-white">
              <li className="mb-5">
                ● If the Blue 🟦 (Office) section is large → You might be spending too much on office-related expenses.
              </li>
              <li>
                ● If the Green 🟩 (Stock) section is significant → Good job! You are investing and building financial security.
              </li>
              <li className="mt-[1rem]">
                ● If the Red 🟥 (Miscellaneous) section is large → You may have unnecessary expenses that can be cut down.
              </li>
              <li className="mt-5">
                ● If the Yellow 🟨 (Food) section is large → Consider budgeting for dining and groceries. 
              </li>
            </ol>
          </h1>
        </div>


        <div className="flex bg-blue-950 border-cyan-50 items-center justify-center border-5 rounded-4xl"></div>

        <div className="flex items-center justify-center w-[60rem] h-[40rem] bg-blue-600 border-cyan-50 border-5 rounded-4xl">
          <Charts
            chartType="Doughnut"
            tag="chartData"
            title="Doughnut Chart"
            titleSize="30"
            fontSize="24"
          />
          <h1 className="flex items-center gap-12 ml-7 mr-7 mb-20 justify-center flex-col text-4xl font-medium tracking-tight text-black">
            <p className=""> What Does This Chart Tell You?</p>

            <ol className="text-2xl font-light text-white">
              <li className="mb-5">
                ● If the blue 🟦 (Income) is bigger → You are saving well!
              </li>
              <li>
                ● If the Green 🟩 (Expenses) is bigger → You might be
                overspending!
              </li>
              <li className="mt-[1rem]">
                ● If the Orange 🟧 (Assets) is bigger → You are building wealth
                and securing your future!
              </li>
              <li className="mt-5">
                ● Goal: Maintain a healthy balance between 🟥 income & 🟦
                expenses
              </li>
            </ol>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Assets;
