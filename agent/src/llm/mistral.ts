import MistralClient from '@mistralai/mistralai';
import { LLMResponse } from './provider';

const client = new MistralClient(process.env.MISTRAL_API_KEY);

export async function callMistral(
  prompt: string,
  systemPrompt?: string,
  timestamp?: string
): Promise<LLMResponse> {
  const messages: any[] = [];
  
  if (systemPrompt) {
    messages.push({ role: 'system', content: systemPrompt });
  }
  
  messages.push({ role: 'user', content: prompt });

  const response = await client.chat({
    model: 'mistral-large-latest',
    messages,
    maxTokens: 1024
  });

  return {
    provider: 'mistral',
    content: response.choices[0]?.message?.content || '',
    timestamp: timestamp || new Date().toISOString(),
    model: 'mistral-large-latest'
  };
}
