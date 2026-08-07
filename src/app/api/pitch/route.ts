import { NextRequest, NextResponse } from "next/server";
import { generateJSON } from "@/lib/gemini";
import { getPitchPrompt } from "@/prompts/pitchPrompt";
import { defaultPitchDeck } from "@/lib/mockData";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { idea = "AI Founder Operating System" } = body;

    const prompt = getPitchPrompt(idea);
    const result = await generateJSON(prompt, defaultPitchDeck);

    return NextResponse.json({ slides: result });
  } catch (error) {
    console.error("API /api/pitch error:", error);
    return NextResponse.json({ slides: defaultPitchDeck });
  }
}
