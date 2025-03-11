import { useEffect, useState } from "react";
import { Bar, Pie, Doughnut, Radar, PolarArea, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
  Filler,
} from "chart.js";

import "chartjs-chart-funnel";
import "chartjs-chart-geo";
import ChartDataLabels from "chartjs-plugin-datalabels";

import db, { auth } from "../pages/firebase";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

// ✅ Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
  Filler,
  ChartDataLabels
);

const Charts = ({ type, tag, chartType, title, titleSize, fontSize }) => {
  const [chartData, setChartData] = useState(null);
  const [tagData, setTagData] = useState(null);
  const [sunburstData, setSunburstData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [cumulativeData, setCumulativeData] = useState(false);
  const balanceData = [];
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchTransactions(user.uid); // Ensure user ID is passed correctly
      } else {
        setLoading(false);
        console.warn("User not signed in.");
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const processTransactionData = (transactions) => {
    let balance = 0;
    const labels = [];
    const newBalanceData = [];
    
  
    // ✅ Sort transactions by date (Ensure chronological order)
    transactions.sort((a, b) => a.date.seconds - b.date.seconds);

    transactions.forEach((transaction) => {
        const date = new Date(transaction.date.seconds * 1000).toLocaleDateString();
        
        // ✅ Avoid duplicate labels for the same day
        if (!labels.includes(date)) {
            labels.push(date);
        }

        if (transaction.type === "Income") {
            balance += transaction.amount;
        } else if (transaction.type === "Expenses") {
            balance -= transaction.amount;
        }

        newBalanceData.push(balance);
    });
  
    // ✅ Fill missing dates to create a continuous X-axis
    const fullLabels = [];
    let currentDate = new Date(
      Math.min(...transactions.map((t) => t.date.seconds)) * 1000
    );
    let lastDate = new Date(
      Math.max(...transactions.map((t) => t.date.seconds)) * 1000
    );
  
    while (currentDate <= lastDate) {
      const formattedDate = currentDate.toLocaleDateString();
      fullLabels.push(formattedDate);
      currentDate.setDate(currentDate.getDate() + 1); // ✅ Move to next day
    }
  
    console.log("Processed Full Labels:", fullLabels);
    console.log("Filtered Last 10 Transactions:", transactions);
    console.log("New Balance Data:", newBalanceData);
  
    return { labels: fullLabels, balanceData: newBalanceData };
  };
  

  const fetchTransactions = async (userId) => {
    if (!userId) return;

    try {
        const transactionsRef = collection(db, "users", userId, "transactions");
        const querySnapshot = await getDocs(transactionsRef);

        let transactions = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        if (!transactions.length) {
            console.warn("No transactions found");
            setLoading(false);
            return;
        }

        console.log("Fetched transactions:", transactions); // ✅ Debugging Log

        const monthlyData = {};
        const tagTotals = {};
        const typeTotals = { Income: 0, Expenses: 0, Assets: 0 }; // ✅ NEW: Store type-wise totals
        const sunburstCategories = {};

        // ✅ Sort transactions by date (Ensure latest transactions are first)
        transactions.sort((a, b) => b.date.seconds - a.date.seconds);

        // ✅ Get the last 10 transactions (Most recent first)
        transactions = transactions.slice(0, 10).reverse(); // Reverse so oldest comes first

        console.log("Last 10 transactions:", transactions);

        // ✅ Process transactions for Line Chart
        const { labels: transactionLabels, balanceData } = processTransactionData(transactions);

        const cumulativeChartData = {
            labels: transactionLabels, // Now properly ordered
            datasets: [
                {
                    label: "Cumulative Balance",
                    data: balanceData,
                    borderColor: "#36A2EB",
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    fill: false,
                    borderWidth: 3,
                    pointRadius: 6,
                    pointBackgroundColor: "#36A2EB",
                    pointBorderColor: "#ffffff",
                    pointHoverRadius: 8,
                    tension: 0.3,
                },
            ],
        };

        // ✅ Check if data exists before setting state
        if (cumulativeChartData.datasets[0].data.length > 0) {
            setCumulativeData(cumulativeChartData);
        } else {
            console.warn("No cumulative balance data to display.");
        }

        // ✅ Process transactions for other charts
        transactions.forEach((transaction) => {
            if (!transaction.date?.seconds) {
                console.warn(`Transaction ${transaction.id} has no date field.`);
            }
            const date = transaction.date?.seconds
                ? new Date(transaction.date.seconds * 1000)
                : null;
            const month = date
                ? date.toLocaleString("default", { month: "short" })
                : "Unknown";

            const amount = Number(transaction.amount) || 0;

            if (!monthlyData[month]) {
                monthlyData[month] = { income: 0, expenses: 0, assets: 0 };
            }

            if (transaction.type === "Income") {
                monthlyData[month].income += amount;
                typeTotals.Income += amount; // ✅ Add to Income total
            } else if (transaction.type === "Expenses") {
                monthlyData[month].expenses += amount;
                typeTotals.Expenses += amount; // ✅ Add to Expenses total
            } else if (transaction.type === "Assets") {
                monthlyData[month].assets += amount;
                typeTotals.Assets += amount; // ✅ Add to Assets total
            }

            if (transaction.tag) {
                tagTotals[transaction.tag] =
                    (tagTotals[transaction.tag] || 0) + amount;
                sunburstCategories[transaction.tag] = {
                    x: transaction.tag,
                    y: (sunburstCategories[transaction.tag]?.y || 0) + amount,
                };
            }
        });

        const labels = Object.keys(monthlyData);
        const incomeData = labels.map((month) => monthlyData[month].income);
        const expenseData = labels.map((month) => monthlyData[month].expenses);
        const assetData = labels.map((month) => monthlyData[month].assets);

        const predefinedColors = [
            "rgba(255, 99, 132, 0.8)", // Red
            "rgba(54, 162, 235, 0.8)", // Blue
            "rgba(255, 206, 86, 0.8)", // Yellow
            "rgba(75, 192, 192, 0.8)", // Green
            "rgba(153, 102, 255, 0.8)", // Purple
            "rgba(255, 159, 64, 0.8)", // Orange
            "rgba(201, 203, 207, 0.8)", // Gray
        ];

        // ✅ Assign colors explicitly based on index
        const tagLabels = Object.keys(tagTotals);
        const tagValues = Object.values(tagTotals);

        // Ensure we don't run out of colors
        const backgroundColors = tagLabels.map(
            (_, i) => predefinedColors[i % predefinedColors.length]
        );
        const borderColors = backgroundColors.map((color) =>
            color.replace("0.8", "1")
        ); // Darker border

        const newTagData = {
            labels: tagLabels,
            datasets: [
                {
                    label: "Spending by Category",
                    data: tagValues,
                    backgroundColor: backgroundColors, // ✅ Assign unique colors
                    borderColor: borderColors, // ✅ Darker border
                    borderWidth: 2,
                },
            ],
        };

        if (newTagData.datasets[0].data.length > 0) {
            setTagData(newTagData);
        } else {
            console.warn("No tag data to display.");
        }

        console.log("Final Tag Data:", newTagData); // ✅ Debugging Log

        // ✅ NEW: Create `chartData` for transaction types
        const newChartData = {
            labels: ["Income", "Expenses", "Assets"], // ✅ Transaction Types
            datasets: [
                {
                    label: "Financial Summary",
                    data: [typeTotals.Income, typeTotals.Expenses, typeTotals.Assets], // ✅ Values for each type
                    backgroundColor: ["#36A2EB", "#4BC0C0", "#FF9F40"], // Blue, Green, Orange
                    borderColor: ["#9BD1FA", "#A7E5E5", "#FFD8B0"],
                    borderWidth: 2,
                },
            ],
        };

        if (newChartData.datasets[0].data.some((value) => value > 0)) {
            setChartData(newChartData);
        } else {
            console.warn("No type data to display.");
        }

        console.log("Final Chart Data:", newChartData); // ✅ Debugging Log

        setSunburstData({
            series: [
                { name: "Total Spending", data: Object.values(sunburstCategories) },
            ],
        });

        setLoading(false);
    } catch (error) {
        console.error("Error fetching transactions:", error);
        setLoading(false);
    }
};


  useEffect(() => {
    console.log("Checking Data Availability...");
    console.log("Chart Data:", chartData);
    console.log("Tag Data:", tagData);
    console.log("Cumulative Data:", cumulativeData);
    console.log("Min Y-Axis Value:", Math.min(...balanceData));
    console.log("Max Y-Axis Value:", Math.max(...balanceData));

    if (tag === "tagData" && tagData && tagData.datasets?.length > 0) {
      setData(tagData);
    } else if (
      tag === "chartData" &&
      chartData &&
      chartData.datasets?.length > 0
    ) {
      setData(chartData);
    } else if (
      tag === "cumulativeData" &&
      cumulativeData &&
      cumulativeData.datasets?.length > 0
    ) {
      setData(cumulativeData);
    } else {
      console.warn("Chart data is missing, cannot update state.");
    }
  }, [chartData, tagData, cumulativeData, tag]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow resizing but limit height below
    aspectRatio: 1.5, // Ensures normal size across all charts
    layout: {
      padding: {
        left: 20,
        right: 20,
        top: 30,
        bottom: 40,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        align: "center",
        labels: {
          color: "#ffffff",
          font: {
            size: fontSize || 16,
            weight: "normal",
          },
          boxWidth: 10,
          padding: 10,
        },
      },
      title: {
        display: true,
        text: title,
        color: "#ffffff",
        font: {
          size: titleSize || 20,
          weight: "bold",
        },
        padding: {
          bottom: 20,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#ffffff",
        bodyColor: "#dddddd",
        borderColor: "#ff5733",
        borderWidth: 2,
        cornerRadius: 10,
      },
      datalabels: {
        color: "#fff",
        font: { size: 24, weight: "bold" },
        display: (context) => context.dataset.data[context.dataIndex] !== null,
        formatter: (value) => `$${value.toFixed(2)}`,
        anchor: "end",
        align: "top",
        clip: false,
        offset: 5,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        suggestedMin:
          balanceData.length > 0 ? Math.min(...balanceData) - 1000 : 0,
        suggestedMax:
          balanceData.length > 0 ? Math.max(...balanceData) + 1000 : 6000,
        ticks: {
          color: "#ffffff",
          font: { size: 24, weight: "normal" },
          stepSize: 500,
          callback: (value) => `$${value.toLocaleString()}`,
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
      x: {
        ticks: {
          color: "white",
          font: { size: 24, weight: "bold" },
          maxRotation: 0,
          minRotation: 30,
          autoSkip: false,
          maxTicksLimit: 10,
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
    },
    elements: {
      line: {
        tension: 0.3, // Ensures a smooth line
        borderWidth: 2, // Thinner lines for better scaling
      },
      point: {
        radius: 6, // Reduce point size for balance
        backgroundColor: "#36A2EB",
        hoverRadius: 7,
      },
    },
    animation: {
      duration: 1500,
      easing: "easeOutQuart",
    },
  };

  return (
    <div className="flex flex-col w-full h-auto">
      <div className="flex  p-8 rounded-lg shadow-lg w-[30rem] h-[40rem]">
        {loading || !data || !data.datasets ? (
          <p className="text-white text-2xl">Loading chart...</p>
        ) : (
          <div className="w-full h-full">
            {chartType === "Bar" && data.datasets.length > 0 && (
              <Bar data={data} options={chartOptions} />
            )}
            {chartType === "Pie" && data.datasets.length > 0 && (
              <Pie data={data} options={chartOptions} />
            )}
            {chartType === "Doughnut" && data.datasets.length > 0 && (
              <Doughnut data={data} options={chartOptions} />
            )}
            {chartType === "Radar" && data.datasets.length > 0 && (
              <Radar data={data} options={chartOptions} />
            )}
            {chartType === "PolarArea" && data.datasets.length > 0 && (
              <PolarArea data={data} options={chartOptions} />
            )}
            {chartType === "Line" && data.datasets.length > 0 && (
              <div className="w-[80rem] h-[40rem] p-6 bg-dark-900 rounded-lg shadow-lg">
                <Line data={data} options={chartOptions} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Charts;
