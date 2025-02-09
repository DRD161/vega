"use client";
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { PortfolioInterface } from "@/app/data/portfolio";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutProps {
  data: PortfolioInterface[] | null;
}

const DoughnutChart = ({ data }: DoughnutProps) => {
  const [doughnutChartData, setDoughnutChartData] =
    useState<ChartData<"doughnut"> | null>(null);

  useEffect(() => {
    // Initialize asset totals
    const assetTotals: { [key: string]: number } = {};

    // Loop through the fetched data to accumulate values for each asset
    data?.forEach((portfolio: PortfolioInterface) => {
      portfolio.positions.forEach((position) => {
        if (assetTotals[position.asset]) {
          assetTotals[position.asset] += position.value;
        } else {
          assetTotals[position.asset] = position.value;
        }
      });
    });

    const chartData = {
      labels: Object.keys(assetTotals), // Asset names
      datasets: [
        {
          label: "Asset Value Breakdown",
          data: Object.values(assetTotals),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
    setDoughnutChartData(chartData);
  }, [data]);

  return doughnutChartData ? (
    <div>
      <div className="mb-3">
        <p className="text-lg font-bold">Portfolio Balance</p>
        <p className="text-sm text-gray-500 italic">
          Click an asset in the legend to view the balance for that asset
        </p>
      </div>
      <Doughnut data={doughnutChartData} data-testid="doughnutChart" />
    </div>
  ) : null;
};

export default DoughnutChart;
