import { GoogleGenAI } from "@google/genai";
import { Product } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateProductDescription = async (name: string, brand: string, keywords: string): Promise<string> => {
  if (!apiKey) return "API Key missing. Please configure.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a compelling, short e-commerce product description (approx 2-3 sentences) for a product named "${name}" by "${brand}". Keywords to include: ${keywords}. Focus on benefits, texture, and lifestyle appeal.`,
    });
    return response.text || "No description generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Could not generate description at this time.";
  }
};

export const chatWithStylist = async (history: {role: string, parts: {text: string}[]}[], message: string, products: Product[]): Promise<string> => {
  if (!apiKey) return "I'm offline right now, but I think you'd love our new collection!";

  // Create a context string with available products
  const productContext = products.map(p => `- ${p.name} (${p.brand}): $${p.price}, Category: ${p.category}`).join('\n');
  
  const systemInstruction = `You are "Mix", a helpful and trendy AI Lifestyle Stylist for Mix Brands. 
  You help customers find the perfect items from our curated inventory of sneakers, skincare, and lifestyle goods.
  Be concise, friendly, and knowledgeable about both fashion and beauty.
  
  Here is our current inventory:
  ${productContext}
  
  Only recommend products from this list. If asked about other brands/products, politely steer them to our inventory.`;

  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction,
      },
      history: history as any,
    });

    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "I'm having trouble connecting to the store database right now. Try again later!";
  }
};