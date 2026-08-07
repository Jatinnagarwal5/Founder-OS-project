import { NextRequest, NextResponse } from "next/server";
import { generateText } from "@/lib/gemini";
import { getAgentPrompt } from "@/prompts/agentPrompts";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { role = "CEO", message = "", startupContext = "AI Founder Platform" } = body;

    const prompt = getAgentPrompt(role, message, startupContext);
    
    const fallbackResponse = `### ${role} Agent Analysis

Here is my tactical perspective on **"${message}"**:

1. **Strategic Priority**: Focus on locking in early predictable recurring revenue before expanding channel complexity.
2. **Key Metric to Watch**: Maintain a minimum 3:1 LTV to CAC ratio while keeping monthly churn below 2.5%.
3. **Immediate Action Step**: Test outbound targeting with a direct value pitch offer to 50 ideal customer profiles this week.

*Let me know if you would like me to unpack the implementation blueprint further.*`;

    const responseText = await generateText(prompt, fallbackResponse);
    return NextResponse.json({ role, response: responseText });
  } catch (error) {
    console.error("API /api/agent error:", error);
    return NextResponse.json({
      role: "CEO",
      response: "I encountered an error processing your query. Please try asking again.",
    });
  }
}
