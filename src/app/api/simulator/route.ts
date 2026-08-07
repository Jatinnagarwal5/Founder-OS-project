import { NextRequest, NextResponse } from "next/server";
import { generateJSON } from "@/lib/gemini";
import { getSimulatorPrompt } from "@/prompts/simulatorPrompt";
import { defaultDecisionSimulation } from "@/lib/mockData";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { optionA = "Option A", optionB = "Option B", startupContext = "Startup Strategy" } = body;

    const prompt = getSimulatorPrompt(optionA, optionB, startupContext);
    
    const fallback = {
      optionA,
      optionB,
      comparison: {
        prosA: [`High growth upside for ${optionA}`, `Strong market demand potential`],
        consA: [`Higher initial capital burn for ${optionA}`, `Requires specialized execution focus`],
        prosB: [`Lower upfront execution risk for ${optionB}`, `Faster velocity to market launch`],
        consB: [`Lower total addressable revenue ceiling`, `Tighter competition`],
        riskScoreA: 62,
        riskScoreB: 38,
        revenuePotentialA: "High ($1.2M+ ARR potential)",
        revenuePotentialB: "Medium ($500k ARR potential)",
        difficultyA: "Hard",
        difficultyB: "Moderate",
        recommendation: `Pursue ${optionB} in Phase 1 to validate cash flow before transitioning resource investments into ${optionA}.`,
        confidenceScore: 86,
      },
    };

    const result = await generateJSON(prompt, fallback);
    return NextResponse.json(result);
  } catch (error) {
    console.error("API /api/simulator error:", error);
    return NextResponse.json(defaultDecisionSimulation);
  }
}
