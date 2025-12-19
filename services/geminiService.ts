
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, Project } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generatePortfolioContent = async (profile: UserProfile, projects: Project[]) => {
  const model = ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `
      Act as a world-class technical recruiter and senior software engineer. 
      Generate a professional GitHub profile README and a career summary based on the following:
      Name: ${profile.name}
      Role: ${profile.role}
      Bio: ${profile.bio}
      Skills: ${profile.skills.map(s => s.name).join(', ')}
      Projects: ${projects.map(p => `${p.title}: ${p.description}`).join('; ')}

      The response MUST be a valid JSON object with:
      1. "readme": A professional markdown README.
      2. "suggestions": 3 bullet points to improve their profile.
      3. "summary": A 2-sentence elevator pitch.
    `,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          readme: { type: Type.STRING },
          suggestions: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          summary: { type: Type.STRING }
        },
        required: ["readme", "suggestions", "summary"]
      }
    }
  });

  const response = await model;
  return JSON.parse(response.text);
};

export const chatWithCoach = async (message: string, profile: UserProfile) => {
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are an AI Career Coach for Developers. You are helping ${profile.name}, a ${profile.role}. Be encouraging, insightful, and technical. Give specific advice on improving code quality, landing interviews, and negotiating salaries.`,
    }
  });

  const result = await chat.sendMessage({ message });
  return result.text;
};
