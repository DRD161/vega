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
  Filler,
} from "chart.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Filler,
);

export const defaultOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
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
          const value = context.raw as number;

          return formatCurrency.format(value);
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
      grid: {
        display: false,
      },
      ticks: {
        callback: (value) => {
          if (typeof value === "number") {
            return formatDate(new Date(value).toISOString());
          }
          return value;
        },
      },
    },
    y: {
      type: "linear",
      min: 0,
      grid: {
        display: false,
      },
      ticks: {
        stepSize: 1,
        callback: (value) => {
          if (typeof value === "number") {
            return formatCurrency.format(value);
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

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (data && portfolio) {
      // Get unique dates from the data
      const labels: string[] = Array.from(
        new Set(data.map((item: PricesInterface) => item.asOf)),
      ).sort(
        (a: string, b: string) => new Date(a).getTime() - new Date(b).getTime(),
      );

      const portfolioValues = labels.map((date) => {
        return portfolio
          .filter((portfolioItem) => portfolioItem.asOf === date)
          .reduce((acc, portfolioItem) => acc + portfolioItem.totalValue, 0);
      });

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
          lineTension: 0.2,
          backgroundColor: "rgba(75, 105, 214, 0.5)",
          opacity: "0.2",
          fill: true,
        },
      ];

      const chartData: ChartData<"line"> = {
        labels,
        datasets,
      };

      setLineChartData(chartData);
      setIsLoading(false);
    }
  }, [data, portfolio]);

  return (
    <>
      {!isLoading && (
        <Card className="col-span-full md:col-start-6 md:col-span-10">
          <CardHeader>
            <CardTitle className="flex items-center text-lg font-bold">
              Portfolio History
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
                className="lucide lucide-clock-4 ml-2 text-blue-900"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Line
              className="w-full h-64"
              options={chartOptions}
              data={lineChartData}
            />
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default LineChart;
