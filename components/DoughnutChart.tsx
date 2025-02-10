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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
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
  };

  return (
    doughnutChartData && (
      <div className="col-span-full md:col-start-1 md:col-span-5 md:pr-6 mb-6 md:mb-0">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center text-lg font-bold">
              Latest Portfolio Balance
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-circle-dollar-sign ml-2 text-blue-900"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                <path d="M12 18V6" />
              </svg>
            </CardTitle>
            <CardDescription className="text-sm text-gray-500 italic">
              Click an asset in the legend to view the balance for that asset
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Doughnut
              className="w-full h-64"
              data={doughnutChartData}
              options={chartOptions}
            />
          </CardContent>
        </Card>
      </div>
    )
  );
};

export default DoughnutChart;
