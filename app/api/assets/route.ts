import { NextResponse } from "next/server";
import { assets } from "@/app/data/assets";

export async function GET() {
  try {
    return NextResponse.json(assets);
  } catch (error) {
    console.log("Error fetching assets:", error);
    return NextResponse.json(
      { error: "Failed to fetch assets" },
      { status: 500 },
    );
  }
}
