import { useEffect, useState } from "react";
import { Bar, Pie, Doughnut, Radar, PolarArea } from "react-chartjs-2";
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
  Filler
);

const Charts = ({ type, tag, chartType, title, titleSize }) => {
  const [chartData, setChartData] = useState(null);
  const [tagData, setTagData] = useState(null);
  const [sunburstData, setSunburstData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [updateTrigger, setUpdateTrigger] = useState(false);

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

  const fetchTransactions = async (userId) => {
    if (!userId) return;
  
    try {
      const transactionsRef = collection(db, "users", userId, "transactions");
      const querySnapshot = await getDocs(transactionsRef);
  
      const transactions = querySnapshot.docs.map((doc) => ({
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
            backgroundColor: ["#4CAF50", "#F44336", "#FFEB3B"], // Green, Red, Yellow
            borderColor: ["#388E3C", "#D32F2F", "#FBC02D"],
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

    if (tag === "tagData" && tagData && tagData.datasets?.length > 0) {
      console.log("Setting tagData to state...");
      setData(tagData);
    } else if (
      tag === "chartData" &&
      chartData &&
      chartData.datasets?.length > 0
    ) {
      console.log("Setting chartData to state...");
      setData(chartData);
    } else {
      console.warn("Chart data is missing, cannot update state.");
    }
  }, [chartData, tagData, tag]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // ✅ Allow it to stretch
    aspectRatio: 2, // ✅ Adjusts the height/width ratio
    layout: {
      padding: 10, // ✅ More space around the graph
    },
    plugins: {
      legend: {
        labels: {
          color: "#ffffff",
          font: {
            size: 22, // ✅ Even bigger legend text
            weight: "thin",
          },
        },
      },
      title: {
        display: true,
        text: title,
        color: "#ffffff",
        font: {
          size: titleSize, // ✅ Bigger and bolder title
          weight: "bolder",
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#ffffff",
        bodyColor: "#dddddd",
        borderColor: "#ff5733",
        borderWidth: 15,
        cornerRadius: 10,
        titleFont: {
          size: 32, // ✅ Bigger tooltip title
          weight: "bold",
        },
        bodyFont: {
          size: 24,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white",
          font: { size: 20, weight: "thin" },
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
      y: {
        ticks: {
          color: "#ffffff",
          font: { size: 18, weight: "thin" },
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
    },
    elements: {
      bar: {
        borderWidth: 2, // ✅ Thick bars
        borderRadius: 5,
        barThickness: 80, // ✅ Force bigger bars
      },
    },
    animation: {
      duration: 3000, // ✅ Slower, smoother animation
      easing: "easeOutBounce",
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Charts;
