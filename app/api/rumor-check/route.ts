import { NextResponse } from "next/server";
import { z } from "zod";
import { getOpenAI } from "@/lib/openai";

const schema = z.object({
  claim: z.string().min(5)
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid claim" }, { status: 400 });
  }

  const client = getOpenAI();
  if (!client) {
    return NextResponse.json({
      verdict: "unclear",
      confidence: 0.42,
      explanation: `Demo mode: add OPENAI_API_KEY to run real rumor analysis. Claim received: ${parsed.data.claim}`
    });
  }

  const completion = await client.responses.create({
    model: "gpt-4.1-mini",
    input: [
      {
        role: "system",
        content: "Return JSON with verdict, confidence, and explanation. Keep the answer cautious and operational."
      },
      {
        role: "user",
        content: parsed.data.claim
      }
    ],
    text: {
      format: {
        type: "json_schema",
        name: "rumor_check",
        schema: {
          type: "object",
          additionalProperties: false,
          properties: {
            verdict: {
              type: "string",
              enum: ["likely_true", "unclear", "likely_false"]
            },
            confidence: { type: "number" },
            explanation: { type: "string" }
          },
          required: ["verdict", "confidence", "explanation"]
        }
      }
    }
  });

  const text = completion.output_text || "{}";
  return NextResponse.json(JSON.parse(text));
}
