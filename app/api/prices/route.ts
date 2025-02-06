import { NextResponse } from "next/server";
import { prices } from "@/app/data/mockData";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const asset = searchParams.get("asset");
    const asOf = searchParams.get("asOf");
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    let filteredPrices = prices;

    if (asset) {
      const assets = asset.split(",");
      filteredPrices = filteredPrices.filter((price) =>
        assets.includes(price.asset),
      );
    }

    if (asOf) {
      filteredPrices = filteredPrices.filter((price) => price.asOf === asOf);
    }

    if (from && to) {
      filteredPrices = filteredPrices.filter(
        (price) => price.asOf >= from && price.asOf <= to,
      );
    }

    return NextResponse.json(filteredPrices);
  } catch (error) {
    console.error("Error fetching prices:", error);
    return NextResponse.json(
      { error: "Failed to fetch prices" },
      { status: 500 },
    );
  }
}
