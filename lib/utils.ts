import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetchChartData = async (url: string): Promise<[] | null> => {
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

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-GB", {
    year: "numeric",
    day: "2-digit",
    month: "long",
  });
};

export const formatCurrency: Intl.NumberFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});