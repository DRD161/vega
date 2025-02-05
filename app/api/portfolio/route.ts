import { NextResponse } from "next/server";
import { portfolios } from "@/app/data/mockData";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const asOf = searchParams.get("asOf");

    let filteredPortfolio = portfolios;

    if (asOf) {
      filteredPortfolio = portfolios.filter(
        (portfolio) => portfolio.asOf === asOf,
      );
    }

    return NextResponse.json(filteredPortfolio);
  } catch (error) {
    console.error("Error fetching portfolios:", error); // Log the error
    return NextResponse.json(
      { error: "Failed to fetch portfolios" },
      { status: 500 },
    );
  }
}
