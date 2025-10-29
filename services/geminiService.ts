
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const systemInstruction = `You are Mwalimu AI, a helpful AI assistant for Tanzanian school students. 
Provide brief, clear, and accurate answers to educational questions. 
You must understand and respond in both English and Swahili. 
Keep your answers concise and easy to understand for a student audience. Format your responses using markdown for better readability.`;

export const getAnswer = async (question: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: question }] }],
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Samahani, nimepata tatizo. Tafadhali jaribu tena.\n\n(Sorry, I encountered an error. Please try again.)";
  }
};
