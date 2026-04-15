import { NextResponse } from "next/server";
import { listCityUpdates } from "@/lib/data";

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const updates = await listCityUpdates(slug);
  return NextResponse.json({ updates });
}
