import { NextResponse } from "next/server";
import { getCity } from "@/lib/data";

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const city = await getCity(slug);

  if (!city) {
    return NextResponse.json({ error: "City not found" }, { status: 404 });
  }

  return NextResponse.json({ city });
}
