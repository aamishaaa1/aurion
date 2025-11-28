import Anthropic from '@anthropic-ai/sdk';
import { LLMResponse } from './provider';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

export async function callAnthropic(
  prompt: string,
  systemPrompt?: string,
  timestamp?: string
): Promise<LLMResponse> {
  const message = await client.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    system: systemPrompt,
    messages: [{ role: 'user', content: prompt }]
  });

  const content = message.content[0].type === 'text' ? message.content[0].text : '';

  return {
    provider: 'anthropic',
    content,
    timestamp: timestamp || new Date().toISOString(),
    model: 'claude-3-5-sonnet-20241022'
  };
}
