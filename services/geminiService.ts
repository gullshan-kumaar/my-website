import { GoogleGenAI, Type } from "@google/genai";
import { BriefResult } from "../types";

const apiKey = process.env.API_KEY || '';

// Initialize only if key exists to avoid immediate crash, handle checks later
const ai = new GoogleGenAI({ apiKey });

export const generateCreativeBrief = async (
  businessName: string,
  industry: string,
  vibe: string
): Promise<BriefResult> => {
  if (!apiKey) {
    throw new Error("API Key is missing.");
  }

  const prompt = `
    Act as a world-class creative director. I need a mini creative brief for a client.
    
    Client Name: ${businessName}
    Industry: ${industry}
    Desired Vibe: ${vibe}
    
    Provide:
    1. A catchy, modern Slogan (max 10 words).
    2. A Visual Direction suggestion (colors, style, mood) (max 30 words).
    3. A one-sentence Strategic Approach (max 30 words).
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            slogan: { type: Type.STRING, description: "A catchy slogan" },
            visualDirection: { type: Type.STRING, description: "Visual style suggestions" },
            strategy: { type: Type.STRING, description: "Strategic approach summary" }
          },
          required: ["slogan", "visualDirection", "strategy"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from Gemini.");
    }

    const result = JSON.parse(text) as BriefResult;
    return result;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate creative brief. Please try again.");
  }
};

export const sendChatMessage = async (
  history: { role: string; parts: { text: string }[] }[],
  message: string
): Promise<string> => {
  if (!apiKey) {
    return "I'm sorry, but I can't connect to my brain right now (API Key missing).";
  }

  try {
    const chat = ai.chats.create({
      model: "gemini-3-pro-preview",
      config: {
        systemInstruction: `You are the AI assistant for MastDzyn.com, a high-end digital creative agency. 
        Your persona is professional, creative, knowledgeable, and slightly witty.
        
        Key Information about MastDzyn:
        - We specialize in Logo & Branding, Packaging, Digital Marketing, and 3D Animation.
        - We build brands that defy the ordinary.
        - We are located in the Design District, New York.
        - Contact: hello@mastdzyn.com | +1 (888) CRE-8IVE.
        
        Your Goal:
        - Answer questions about our services.
        - Explain our design philosophy (bold, strategic, data-driven).
        - Encourage users to "Start a Project" by visiting the contact section.
        - Keep responses concise (under 50 words usually) unless asked for details.
        
        If asked for pricing: Explain that every project is bespoke and encourage them to book a consultation for a quote.`,
      },
      history: history,
    });

    const result = await chat.sendMessage({ message });
    return result.text || "I'm speechless. Could you try asking that again?";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "I seem to be having a creative block. Please try again in a moment.";
  }
};