"use client";
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  TooltipItem,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { PortfolioInterface } from "@/app/data/portfolio";
import { formatCurrency } from "@/lib/utils";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutProps {
  data: PortfolioInterface[] | null;
}

const DoughnutChart = ({ data }: DoughnutProps) => {
  const [doughnutChartData, setDoughnutChartData] =
    useState<ChartData<"doughnut"> | null>(null);

  useEffect(() => {
    if (!data) return;

    // Find the latest date in the portfolio data
    const latestPortfolio = data.reduce((latest, current) =>
      new Date(latest.asOf) > new Date(current.asOf) ? latest : current,
    );

    // Get the positions (assets) for the latest date
    const assetTotals: { [key: string]: number } = {};
    latestPortfolio.positions.forEach((position) => {
      assetTotals[position.asset] = position.value;
    });

    // Prepare the chart data
    const chartData = {
      labels: Object.keys(assetTotals), // Asset names
      datasets: [
        {
          label: "Asset Value Breakdown (Latest Date)",
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
        <p className="text-lg font-bold">Latest Portfolio Balance</p>
        <p className="text-sm text-gray-500 italic">
          Click an asset in the legend to view the balance for that asset
        </p>
      </div>
      <div className="w-1/2">
        <Doughnut
          data={doughnutChartData}
          options={{
            plugins: {
              tooltip: {
                callbacks: {
                  label: (tooltipItem: TooltipItem<"doughnut">) => {
                    const value: number = tooltipItem.raw as number;
                    return `${tooltipItem.label}: ${formatCurrency.format(value)}`;
                  },
                },
              },
            },
          }}
        />
      </div>
    </div>
  ) : null;
};

export default DoughnutChart;
