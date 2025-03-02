import React, { useEffect, useState } from "react";
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
import ReactApexChart from "react-apexcharts";

import db, { auth } from "../pages/firebase";
import { collection, getDocs } from "firebase/firestore";

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
    const fetchTransactions = async () => {
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

        const transactions = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (!transactions.length) {
          console.warn("No transactions found");
          setLoading(false);
          return;
        }

        const monthlyData = {};
        const tagTotals = {};
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
            monthlyData[month] = { income: 0, expenses: 0 };
          }

          if (transaction.type === "Income") {
            monthlyData[month].income += amount;
          } else if (transaction.type === "Expenses") {
            monthlyData[month].expenses += amount;
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
        const backgroundColors = tagLabels.map((_, i) => predefinedColors[i % predefinedColors.length]);
        const borderColors = backgroundColors.map(color => color.replace("0.8", "1")); // Darker border
        
        setTagData({
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
        });

        

        // 🔍 Debugging: Check Colors in Console
        console.log("Tag Labels:", tagLabels);
        console.log("Tag Data:", tagValues);
        console.log("Generated Colors:", backgroundColors);

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

    fetchTransactions();
  }, [updateTrigger]);

  useEffect(() => {
    console.log("Updated Chart Data:", chartData);
    console.log("Updated Tag Data:", tagData);
    console.log("Updated Sunburst Data:", sunburstData);
  }, [chartData, tagData, sunburstData]);

  useEffect(() => {
    if (tag === "tagData" && tagData) {
      setData(tagData);
    } else if (tag === "chartData" && chartData) {
      setData(chartData);
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
        {loading || !chartData || !chartData.datasets ? (
          <p className="text-white text-2xl">Loading chart...</p>
        ) : (
          <div className="w-full h-full">
            {chartType === "Bar" && <Bar data={data} options={chartOptions} />}
            {chartType === "Pie" && <Pie data={data} options={chartOptions} />}
            {chartType === "Doughnut" && (
              <Doughnut data={data} options={chartOptions} />
            )}
            {chartType === "Radar" && (
              <Radar data={data} options={chartOptions} />
            )}
            {chartType === "PolarArea" && (
              <PolarArea data={data} options={chartOptions} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Charts;
