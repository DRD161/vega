import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  AssetsInterface,
  PortfolioInterface,
  PricesInterface,
} from "@/app/data/mockData";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetchChartData() {
  const baseUrl: string = "http://localhost:3000";
  const assetsEndpoint: string = `${baseUrl}/api/assets`;
  const portfolioEndpoint: string = `${baseUrl}/api/portfolio`;
  const pricesEndpoint: string = `${baseUrl}/api/prices`;

  const fetchChartData = async (url: string) => {
    try {
      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) {
        throw new Error(
          `Failed to fetch from ${url}. Status: ${response.status}`,
        );
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${url}:`, error);
      return null;
    }
  };

  const [assetsData, portfolioData, pricesData] = await Promise.all([
    fetchChartData(assetsEndpoint),
    fetchChartData(portfolioEndpoint),
    fetchChartData(pricesEndpoint),
  ]);

  return {
    assetsData: assetsData as AssetsInterface[] | null,
    portfolioData: portfolioData as PortfolioInterface[] | null,
    pricesData: pricesData as PricesInterface[] | null,
  };
}
