"use client";

import React, { useEffect, useState } from "react";
import {
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  TimeScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import { formatDate, formatCurrency } from "@/lib/utils";
import { PricesInterface } from "@/app/data/prices";
import { PortfolioInterface } from "@/app/data/portfolio";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
);

export const defaultOptions: ChartOptions<"line"> = {
  responsive: true,
  clip: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Total Portfolio Value Over Time",
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          const value = context.raw as number; // Type assertion to ensure value is a number

          // Format the value using your formatCurrency function
          return formatCurrency.format(value); // Format currency
        },
      },
    },
  },
  scales: {
    x: {
      type: "time",
      time: {
        unit: "day",
        displayFormats: {
          day: "DD MM YYYY",
        },
      },
      ticks: {
        callback: (value) => {
          if (typeof value === "number") {
            return formatDate(new Date(value).toISOString()); // Format date
          }
          return value;
        },
      },
    },
    y: {
      type: "linear",
      min: 0,
      ticks: {
        stepSize: 1,
        callback: (value) => {
          if (typeof value === "number") {
            return formatCurrency.format(value); // Format Y-axis currency
          }
          return value;
        },
      },
    },
  },
};

interface LineChartProps {
  data: PricesInterface[] | null;
  portfolio: PortfolioInterface[] | null;
}

const LineChart = ({ data, portfolio }: LineChartProps) => {
  const [lineChartData, setLineChartData] = useState<ChartData<"line">>({
    labels: [],
    datasets: [],
  });

  const [chartOptions, setChartOptions] =
    useState<ChartOptions<"line">>(defaultOptions);

  useEffect(() => {
    if (data && portfolio) {
      // Get unique dates from the data
      const labels = Array.from(new Set(data.map((item) => item.asOf))).sort(
        (a, b) => new Date(a).getTime() - new Date(b).getTime(),
      );

      // Aggregate portfolio values for each unique date
      const portfolioValues = labels.map((date) => {
        return portfolio
          .filter((portfolioItem) => portfolioItem.asOf === date)
          .reduce((acc, portfolioItem) => acc + portfolioItem.totalValue, 0);
      });

      // Set dynamic max and min for the Y-axis
      const maxValue = Math.max(...portfolioValues);
      const minValue = Math.min(...portfolioValues);
      const range = maxValue - minValue;
      const stepSize = Math.max(1, Math.floor(range / 10));

      setChartOptions((prevOptions) => ({
        ...prevOptions,
        scales: {
          ...prevOptions.scales,
          y: {
            type: "linear",
            min: minValue,
            max: maxValue,
            ticks: {
              stepSize,
              callback: (value) => {
                if (typeof value === "number") {
                  return formatCurrency.format(value);
                }
                return value;
              },
            },
          },
        },
      }));

      const datasets = [
        {
          label: "Total Portfolio Value",
          data: portfolioValues,
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: false,
        },
      ];

      const chartData: ChartData<"line"> = {
        labels,
        datasets,
      };

      setLineChartData(chartData);
    }
  }, [data, portfolio]);

  return (
    <Line className="w-full h-96" options={chartOptions} data={lineChartData} />
  );
};

export default LineChart;
