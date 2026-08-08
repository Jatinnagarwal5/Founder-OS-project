export function getSimulatorPrompt(optionA: string, optionB: string, startupContext: string): string {
  return `You are Helm AI Decision Simulator Engine. 
Compare the following two strategic options for a startup and evaluate them objectively. 
Respond ONLY with a valid, structured JSON object (no markdown, pure JSON).

Startup Context: "${startupContext}"
Option A: "${optionA}"
Option B: "${optionB}"

Return JSON matching this exact structure:
{
  "optionA": "${optionA}",
  "optionB": "${optionB}",
  "comparison": {
    "prosA": ["Bullet point 1", "Bullet point 2", "Bullet point 3"],
    "consA": ["Bullet point 1", "Bullet point 2"],
    "prosB": ["Bullet point 1", "Bullet point 2", "Bullet point 3"],
    "consB": ["Bullet point 1", "Bullet point 2"],
    "riskScoreA": 65,
    "riskScoreB": 40,
    "revenuePotentialA": "High ($1.5M+ ARR)",
    "revenuePotentialB": "Medium ($600k ARR)",
    "difficultyA": "Hard (High upfront capital)",
    "difficultyB": "Moderate (Leverage existing assets)",
    "recommendation": "Detailed 2-sentence executive decision recommendation.",
    "confidenceScore": 88
  }
}`;
}
