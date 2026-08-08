import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// Verified supported model names for Google Gemini API
const CANDIDATE_MODELS = [
  "gemini-flash-latest",
  "gemini-3.6-flash",
  "gemini-3.5-flash",
  "gemini-flash-lite-latest",
  "gemini-2.0-flash"
];

export async function generateJSON<T>(prompt: string, fallbackData: T): Promise<T> {
  if (!genAI || !apiKey) {
    console.warn("GEMINI_API_KEY not configured. Returning fallback data.");
    return fallbackData;
  }

  for (const modelName of CANDIDATE_MODELS) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.7,
        },
      });

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();

      if (!responseText) continue;

      let cleanJSON = responseText.trim();
      if (cleanJSON.startsWith("```json")) {
        cleanJSON = cleanJSON.substring(7);
      } else if (cleanJSON.startsWith("```")) {
        cleanJSON = cleanJSON.substring(3);
      }
      if (cleanJSON.endsWith("```")) {
        cleanJSON = cleanJSON.substring(0, cleanJSON.length - 3);
      }
      cleanJSON = cleanJSON.trim();

      return JSON.parse(cleanJSON) as T;
    } catch (error) {
      console.warn(`Gemini API call failed with model ${modelName}:`, (error as Error)?.message || error);
    }
  }

  console.error("All Gemini API models failed for generateJSON. Returning fallback data.");
  return fallbackData;
}

export async function generateText(prompt: string, fallbackText: string): Promise<string> {
  if (!genAI || !apiKey) {
    return fallbackText;
  }

  for (const modelName of CANDIDATE_MODELS) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      if (text) return text;
    } catch (error) {
      console.warn(`Gemini text generation failed with model ${modelName}:`, (error as Error)?.message || error);
    }
  }

  console.error("All Gemini API models failed for generateText. Returning fallback text.");
  return fallbackText;
}


