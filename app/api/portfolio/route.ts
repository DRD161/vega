import { NextResponse } from "next/server";
import { portfolios, PortfolioInterface } from "@/app/data/portfolio";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const asOf = searchParams.get("asOf");

    if (asOf && isNaN(Date.parse(asOf))) {
      return NextResponse.json(
        { error: "Invalid date format for 'asOf'" },
        { status: 400 },
      );
    }

    // Filter portfolios based on `asOf` parameter
    const filteredPortfolio: PortfolioInterface[] = asOf
      ? portfolios.filter((portfolio) => portfolio.asOf === asOf)
      : portfolios;

    return NextResponse.json(filteredPortfolio);
  } catch (error) {
    console.error("Error fetching portfolios:", error); // Log detailed error
    return NextResponse.json(
      { error: "Failed to fetch portfolios" },
      { status: 500 },
    );
  }
}
