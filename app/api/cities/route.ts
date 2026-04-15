import { NextResponse } from "next/server";
import { listCities } from "@/lib/data";

export async function GET() {
  const cities = await listCities();
  return NextResponse.json({ cities });
}
