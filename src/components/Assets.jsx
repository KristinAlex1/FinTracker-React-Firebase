import Charts from "./Charts";

const Assets = () => {
  return (
    <div className="h-auto w-full gap-8 p-10 flex justify-between">
      {/* ✅ Left Side Finance Tips */}
      <div className="flex flex-col gap-100 w-[30rem]">
        <div className="bg-blue-800 text-white p-5 rounded-3xl shadow-lg">
          <h2 className="text-2xl font-semibold">💡 Budgeting Tip</h2>
          <p className="text-lg mt-2">Track your expenses to know where your money is going.</p>
        </div>
        <div className="bg-green-700 text-white p-5 rounded-3xl shadow-lg">
          <h2 className="text-2xl font-semibold">💰 Savings Tip</h2>
          <p className="text-lg mt-2">Follow the 50/30/20 rule for better money management.</p>
        </div>
        <div className="bg-orange-600 text-white p-5 rounded-3xl shadow-lg">
          <h2 className="text-2xl font-semibold">📈 Investment Tip</h2>
          <p className="text-lg mt-2">Start investing early to take advantage of compound interest.</p>
        </div>
        <div className="bg-purple-700 text-white p-5 rounded-3xl shadow-lg">
          <h2 className="text-2xl font-semibold">🚀 Income Growth</h2>
          <p className="text-lg mt-2">Look for side hustles to boost your monthly earnings.</p>
        </div>
        <div className="bg-red-700 text-white p-5 rounded-3xl shadow-lg">
          <h2 className="text-2xl font-semibold">⚠️ Debt Tip</h2>
          <p className="text-lg mt-2">Pay off high-interest debt first to save on interest costs.</p>
        </div>
      </div>

      {/* ✅ Main Content (Charts in Center) */}
      <div className="w-full max-w-[80rem]">
        {/* ✅ Full-width Line Chart */}
        <div className="bg-blue-950 border-cyan-50 flex items-center justify-center border-4 rounded-4xl w-full h-[50vh] overflow-hidden p-5 shadow-lg">
          <Charts
            chartType="Line"
            tag="chartData"
            title="Income vs Expenses"
            titleSize="58"
            fontSize="30"
          />
        </div>

        {/* ✅ Second row - Bar & Pie Charts */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          <div className="flex flex-col items-center justify-center bg-blue-950 border-cyan-50 border-4 rounded-4xl p-6 shadow-lg">
            <Charts
              chartType="Bar"
              tag="chartData"
              title="Income vs Expenses"
              titleSize="32"
              fontSize="25"
            />
            <h1 className="text-white text-3xl font-semibold mt-4">What Does This Chart Tell You?</h1>
            <ol className="text-lg text-gray-300 mt-2 space-y-2">
              <li>🟦 If Income is higher → You are saving well!</li>
              <li>🟩 If Expenses are higher → You might be overspending.</li>
              <li>🟧 If Assets are increasing → You are building wealth.</li>
            </ol>
          </div>

          <div className="flex flex-col items-center justify-center bg-blue-950 border-cyan-50 border-4 rounded-4xl p-6 shadow-lg">
            <Charts
              chartType="Pie"
              tag="chartData"
              title="Spending Pie"
              titleSize="32"
              fontSize="25"
            />
            <h1 className="text-white text-3xl font-semibold mt-4">What Does This Chart Tell You?</h1>
            <ol className="text-lg text-gray-300 mt-2 space-y-2">
              <li>🟦 If Office spending is high → Reduce work expenses.</li>
              <li>🟩 If Stock spending is high → Great job investing!</li>
              <li>🟥 If Miscellaneous is large → Reduce unnecessary costs.</li>
            </ol>
          </div>
        </div>

        {/* ✅ Third row - Polar & Doughnut Charts */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          <div className="flex flex-col items-center justify-center bg-blue-950 border-cyan-50 border-4 rounded-4xl p-6 shadow-lg">
            <Charts
              chartType="PolarArea"
              tag="chartData"
              title="Polar Chart"
              titleSize="30"
              fontSize="24"
            />
            <h1 className="text-white text-3xl font-semibold mt-4">What Does This Chart Tell You?</h1>
            <ol className="text-lg text-gray-300 mt-2 space-y-2">
              <li>🟦 If Income is the largest → You are in a great position!</li>
              <li>🟩 If Expenses dominate → Consider reducing spending.</li>
              <li>🟧 If Assets are growing → You are building financial security.</li>
            </ol>
          </div>

          <div className="flex flex-col items-center justify-center bg-blue-950 border-cyan-50 border-4 rounded-4xl p-6 shadow-lg">
            <Charts
              chartType="Doughnut"
              tag="chartData"
              title="Doughnut Chart"
              titleSize="30"
              fontSize="24"
            />
            <h1 className="text-white text-3xl font-semibold mt-4">What Does This Chart Tell You?</h1>
            <ol className="text-lg text-gray-300 mt-2 space-y-2">
              <li>🟦 If Income is bigger → You are saving well!</li>
              <li>🟩 If Expenses are bigger → You might be overspending.</li>
              <li>🟧 If Assets are increasing → You are securing your future.</li>
            </ol>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[80rem]">
        {/* ✅ Full-width Line Chart */}
        <div className="bg-blue-950 border-cyan-50 flex items-center justify-center border-4 rounded-4xl w-full h-[50vh] overflow-hidden p-5 shadow-lg">
          <Charts
            chartType="Line"
            tag="tagData"
            title="Tracking by Categories"
            titleSize="58"
            fontSize="30"
          />
        </div>

        {/* ✅ Second row - Bar & Pie Charts */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          <div className="flex flex-col items-center justify-center bg-blue-950 border-cyan-50 border-4 rounded-4xl p-6 shadow-lg">
            <Charts
              chartType="Bar"
              tag="tagData"
              title="Income vs Expenses"
              titleSize="32"
              fontSize="25"
            />
            <h1 className="text-white text-3xl font-semibold mt-4">What Does This Chart Tell You?</h1>
            <ol className="text-lg text-gray-300 mt-2 space-y-2">
              <li>🟦 If Income is higher → You are saving well!</li>
              <li>🟩 If Expenses are higher → You might be overspending.</li>
              <li>🟧 If Assets are increasing → You are building wealth.</li>
            </ol>
          </div>

          <div className="flex flex-col items-center justify-center bg-blue-950 border-cyan-50 border-4 rounded-4xl p-6 shadow-lg">
            <Charts
              chartType="Pie"
              tag="tagData"
              title="Spending Pie"
              titleSize="32"
              fontSize="25"
            />
            <h1 className="text-white text-3xl font-semibold mt-4">What Does This Chart Tell You?</h1>
            <ol className="text-lg text-gray-300 mt-2 space-y-2">
              <li>🟦 If Office spending is high → Reduce work expenses.</li>
              <li>🟩 If Stock spending is high → Great job investing!</li>
              <li>🟥 If Miscellaneous is large → Reduce unnecessary costs.</li>
            </ol>
          </div>
        </div>

        {/* ✅ Third row - Polar & Doughnut Charts */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          <div className="flex flex-col items-center justify-center bg-blue-950 border-cyan-50 border-4 rounded-4xl p-6 shadow-lg">
            <Charts
              chartType="PolarArea"
              tag="tagData"
              title="Polar Chart"
              titleSize="30"
              fontSize="24"
            />
            <h1 className="text-white text-3xl font-semibold mt-4">What Does This Chart Tell You?</h1>
            <ol className="text-lg text-gray-300 mt-2 space-y-2">
              <li>🟦 If Income is the largest → You are in a great position!</li>
              <li>🟩 If Expenses dominate → Consider reducing spending.</li>
              <li>🟧 If Assets are growing → You are building financial security.</li>
            </ol>
          </div>

          <div className="flex flex-col items-center justify-center bg-blue-950 border-cyan-50 border-4 rounded-4xl p-6 shadow-lg">
            <Charts
              chartType="Doughnut"
              tag="tagData"
              title="Doughnut Chart"
              titleSize="30"
              fontSize="24"
            />
            <h1 className="text-white text-3xl font-semibold mt-4">What Does This Chart Tell You?</h1>
            <ol className="text-lg text-gray-300 mt-2 space-y-2">
              <li>🟦 If Income is bigger → You are saving well!</li>
              <li>🟩 If Expenses are bigger → You might be overspending.</li>
              <li>🟧 If Assets are increasing → You are securing your future.</li>
            </ol>
          </div>
        </div>
      </div>
      

      {/* ✅ Right Side Finance Tips */}
      <div className="flex flex-col gap-130 w-[40rem]">
        <div className="bg-blue-600 text-white p-5 mt-15 rounded-3xl shadow-lg">
          <h2 className="text-2xl font-semibold">📊 Smart Spending</h2>
          <p className="text-lg mt-2">Use cash instead of credit to control impulse purchases.</p>
        </div>
        <div className="bg-green-600 text-white p-5 rounded-3xl shadow-lg">
          <h2 className="text-2xl font-semibold">🔄 Emergency Fund</h2>
          <p className="text-lg mt-2">Save at least 3-6 months of expenses for emergencies.</p>
        </div>
        <div className="bg-orange-700 text-white p-5 rounded-3xl shadow-lg">
          <h2 className="text-2xl font-semibold">🏦 Retirement Savings</h2>
          <p className="text-lg mt-2">Start saving for retirement early, even with small amounts.</p>
        </div>
        <div className="bg-purple-600 text-white p-5 rounded-3xl shadow-lg">
          <h2 className="text-2xl font-semibold">📉 Avoid Lifestyle Inflation</h2>
          <p className="text-lg mt-2">Increase savings when income rises, not just expenses.</p>
        </div>
        <div className="bg-red-600 text-white p-5 rounded-3xl shadow-lg">
          <h2 className="text-2xl font-semibold">📖 Financial Literacy</h2>
          <p className="text-lg mt-2">Read finance books to improve your money management skills.</p>
        </div>
      </div>
    </div>
  );
};

export default Assets;
