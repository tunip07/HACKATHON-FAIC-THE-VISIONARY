import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("GEMINI_API_KEY is not set. AI features will not work.");
}

export const ai = new GoogleGenAI({ apiKey: apiKey || "" });

export const getGeminiProModel = () => {
  return "gemini-3.1-pro-preview";
};

export async function chatWithAI(prompt: string) {
  try {
    const response = await ai.models.generateContent({
      model: getGeminiProModel(),
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Xin lỗi, đã có lỗi xảy ra khi kết nối với AI.";
  }
}
