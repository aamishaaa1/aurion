import axios from 'axios';
import { LLMResponse } from './provider';

export async function callXAI(
  prompt: string,
  systemPrompt?: string,
  timestamp?: string
): Promise<LLMResponse> {
  const messages: any[] = [];
  
  if (systemPrompt) {
    messages.push({ role: 'system', content: systemPrompt });
  }
  
  messages.push({ role: 'user', content: prompt });

  const response = await axios.post(
    'https://api.x.ai/v1/chat/completions',
    {
      model: 'grok-beta',
      messages,
      max_tokens: 1024
    },
    {
      headers: {
        'Authorization': `Bearer ${process.env.XAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );

  return {
    provider: 'xai',
    content: response.data.choices[0]?.message?.content || '',
    timestamp: timestamp || new Date().toISOString(),
    model: 'grok-beta'
  };
}
