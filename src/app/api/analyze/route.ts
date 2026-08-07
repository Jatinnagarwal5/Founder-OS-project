import { NextRequest, NextResponse } from "next/server";
import { generateJSON } from "@/lib/gemini";
import { getAnalyzePrompt } from "@/prompts/analyzePrompt";
import {
  defaultStartupData,
  defaultCompetitors,
  defaultPitchDeck,
  defaultRoadmap,
  defaultActionPlan,
} from "@/lib/mockData";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const idea = body?.idea || "AI Operating System for Startups";

    const prompt = getAnalyzePrompt(idea);
    const fallback = {
      startupData: {
        ...defaultStartupData,
        name: idea.length > 25 ? idea.substring(0, 25) + "..." : idea,
        tagline: `AI-Powered Autonomous Platform for ${idea}`,
      },
      competitors: defaultCompetitors,
      pitchDeck: defaultPitchDeck,
      roadmap: defaultRoadmap,
      actionPlan: defaultActionPlan,
    };

    const result = await generateJSON(prompt, fallback);
    return NextResponse.json(result);
  } catch (error) {
    console.error("API /api/analyze error:", error);
    return NextResponse.json({
      startupData: defaultStartupData,
      competitors: defaultCompetitors,
      pitchDeck: defaultPitchDeck,
      roadmap: defaultRoadmap,
      actionPlan: defaultActionPlan,
    });
  }
}
