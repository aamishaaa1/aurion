import Groq from 'groq-sdk';
import { LLMResponse } from './provider';

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export async function callGroq(
  prompt: string,
  systemPrompt?: string,
  timestamp?: string
): Promise<LLMResponse> {
  const messages: any[] = [];
  
  if (systemPrompt) {
    messages.push({ role: 'system', content: systemPrompt });
  }
  
  messages.push({ role: 'user', content: prompt });

  const completion = await client.chat.completions.create({
    model: 'llama-3.1-70b-versatile',
    messages,
    max_tokens: 1024
  });

  return {
    provider: 'groq',
    content: completion.choices[0]?.message?.content || '',
    timestamp: timestamp || new Date().toISOString(),
    model: 'llama-3.1-70b-versatile'
  };
}
