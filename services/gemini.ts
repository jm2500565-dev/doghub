
import { GoogleGenAI, Type } from "@google/genai";

// Always use process.env.API_KEY directly for initialization
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const summarizeRepo = async (content: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Act as a productivity assistant. Summarize the following GitHub repository/issue information so a developer can understand it quickly without browsing the actual site. Provide: 1. Repo Name 2. Core purpose 3. Top 3 urgent tasks/issues 4. A motivational 'Keep Focus' message. Content: ${content}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          repoName: { type: Type.STRING },
          summary: { type: Type.STRING },
          keyIssues: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          recentActivity: { type: Type.STRING }
        },
        required: ["repoName", "summary", "keyIssues", "recentActivity"]
      }
    }
  });

  try {
    // response.text is a property, not a method
    return JSON.parse(response.text?.trim() || '{}');
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    return null;
  }
};

export const generateQuestStep = async (history: { role: 'user' | 'model', text: string }[], action: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    // Wrapped multiple parts in a { parts: [...] } structure
    contents: {
      parts: [
        { text: "You are the Game Master of 'The Silicon Dungeon', a text-based RPG for developers. Every scene must include tech puns. The player is trying to reach the Cloud Core." },
        ...history.map(h => ({ text: `${h.role === 'user' ? 'Action: ' : 'Scene: '}${h.text}` })),
        { text: `Action: ${action}` }
      ]
    },
    config: {
      temperature: 0.8,
      maxOutputTokens: 200,
    }
  });

  // response.text is a property
  return response.text;
};
