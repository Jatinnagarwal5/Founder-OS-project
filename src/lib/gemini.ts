import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function generateJSON<T>(prompt: string, fallbackData: T): Promise<T> {
  if (!genAI || !apiKey) {
    console.warn("GEMINI_API_KEY not configured. Returning intelligent fallback data.");
    return fallbackData;
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.7,
      },
    });

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    if (!responseText) {
      return fallbackData;
    }

    // Sanitize response text if wrapped in ```json ```
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
    console.error("Gemini API call error:", error);
    return fallbackData;
  }
}

export async function generateText(prompt: string, fallbackText: string): Promise<string> {
  if (!genAI || !apiKey) {
    return fallbackText;
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return text || fallbackText;
  } catch (error) {
    console.error("Gemini text generation error:", error);
    return fallbackText;
  }
}

