import { GoogleGenerativeAI } from '@google/generative-ai';
import { LLMResponse } from './provider';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export async function callGoogle(
  prompt: string,
  systemPrompt?: string,
  timestamp?: string
): Promise<LLMResponse> {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const fullPrompt = systemPrompt ? `${systemPrompt}\n\n${prompt}` : prompt;
  const result = await model.generateContent(fullPrompt);
  const response = await result.response;

  return {
    provider: 'google',
    content: response.text(),
    timestamp: timestamp || new Date().toISOString(),
    model: 'gemini-pro'
  };
}
