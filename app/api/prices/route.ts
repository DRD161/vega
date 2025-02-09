import { NextResponse } from "next/server";
import { prices, PricesInterface } from "@/app/data/prices";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const asset = searchParams.get("asset");
    const asOf = searchParams.get("asOf");

    let filteredPrices: PricesInterface[] = prices;

    if (asset) {
      const assets = asset.split(",");
      filteredPrices = filteredPrices.filter((price) =>
        assets.includes(price.asset),
      );
    }

    if (asOf) {
      filteredPrices = filteredPrices.filter(
        (price: PricesInterface) => price.asOf === asOf,
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
