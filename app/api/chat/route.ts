import { NextResponse } from "next/server";
import { z } from "zod";
import { getCity, listCityUpdates } from "@/lib/data";
import { getOpenAI } from "@/lib/openai";

const schema = z.object({
  question: z.string().min(3)
});

export async function POST(request: Request) {
  const url = new URL(request.url);
  const citySlug = url.searchParams.get("city") || "dubai";
  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid question" }, { status: 400 });
  }

  const city = await getCity(citySlug);
  const updates = await listCityUpdates(citySlug);

  if (!city) {
    return NextResponse.json({ answer: "I could not find that city." }, { status: 404 });
  }

  const context = {
    city,
    updates: updates.slice(0, 5)
  };

  const client = getOpenAI();
  if (!client) {
    return NextResponse.json({
      answer: `Demo mode: ${city.name} is currently ${city.level} risk with score ${city.score}. Latest summary: ${city.summary}`
    });
  }

  const completion = await client.responses.create({
    model: "gpt-4.1-mini",
    input: [
      {
        role: "system",
        content: "Answer as a concise operational city assistant using only the provided context."
      },
      {
        role: "user",
        content: `Context: ${JSON.stringify(context)}\n\nQuestion: ${parsed.data.question}`
      }
    ]
  });

  return NextResponse.json({ answer: completion.output_text });
}
