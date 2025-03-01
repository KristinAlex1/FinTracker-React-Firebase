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

const Charts = ({ type, tag, chartType }) => {
  const [chartData, setChartData] = useState(null);
  const [tagData, setTagData] = useState(null);
  const [sunburstData, setSunburstData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

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
          const month = date ? date.toLocaleString("default", { month: "short" }) : "Unknown";

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

        setChartData({
          labels,
          datasets: [
            {
              label: "Income",
              data: incomeData,
              backgroundColor: "skyblue",
              borderColor: "black",
              borderWidth: 1,
            },
            {
              label: "Expenses",
              data: expenseData,
              backgroundColor: "gray",
              borderColor: "black",
              borderWidth: 1,
            },
          ],
        });

        setTagData({
          labels: Object.keys(tagTotals),
          datasets: [
            {
              label: "Spending by Category",
              data: Object.values(tagTotals),
              backgroundColor: "rgba(54, 162, 235, 0.5)",
              borderColor: "rgba(54, 162, 235, 1)",
            },
          ],
        });

        setSunburstData({
          series: [
            { name: "Total Spending", data: Object.values(sunburstCategories) },
          ],
        });

        console.log("Chart Data:", chartData);
        console.log("Tag Data:", tagData);
        console.log("Sunburst Data:", sunburstData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    if (tag) {
      setData(tagData);
    } else if (type) {
      setData(chartData);
    }
  }, [chartData, tagData, type, tag]);

  return (
    <div className="flex flex-col items-center justify-center mt-[5rem]">
      <h2 className="text-4xl font-thin">Monthly Transactions</h2>
      <div className="flex items-center justify-center w-[90%]">
        <div className="grid grid-cols-3 gap-5">
          {loading || !chartData ? (
            <p>Loading chart...</p>
          ) : chartType === "Bar" ? (
            <Bar data={data} options={{ responsive: true }} />
          ) : chartType === "Pie" ? (
            <Pie data={data} options={{ responsive: true }} />
          ) : chartType === "Doughnut" ? (
            <Doughnut data={data} options={{ responsive: true }} />
          ) : chartType === "Radar" ? (
            <Radar data={data} options={{ responsive: true }} />
          ) : chartType === "PolarArea" ? (
            <PolarArea data={data} options={{ responsive: true }} />
          ) : chartType === "Apex" ? (
            <ReactApexChart
              options={{ chart: { type: "treemap" } }}
              series={sunburstData.series}
              type="treemap"
              height={350}
            />
          ) : (
            <p>No chart type selected</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Charts;
