import { callAnthropic } from './anthropic';
import { callGroq } from './groq';
import { callMistral } from './mistral';
import { callGoogle } from './google';
import { callXAI } from './xai';

export type LLMProvider = 'anthropic' | 'groq' | 'mistral' | 'google' | 'xai';

export interface LLMResponse {
  provider: LLMProvider;
  content: string;
  timestamp: string;
  model: string;
}

export async function callLLM(
  provider: LLMProvider,
  prompt: string,
  systemPrompt?: string
): Promise<LLMResponse> {
  const timestamp = new Date().toISOString();

  switch (provider) {
    case 'anthropic':
      return callAnthropic(prompt, systemPrompt, timestamp);
    case 'groq':
      return callGroq(prompt, systemPrompt, timestamp);
    case 'mistral':
      return callMistral(prompt, systemPrompt, timestamp);
    case 'google':
      return callGoogle(prompt, systemPrompt, timestamp);
    case 'xai':
      return callXAI(prompt, systemPrompt, timestamp);
    default:
      throw new Error(`Unknown provider: ${provider}`);
  }
}

export async function callMultipleLLMs(
  providers: LLMProvider[],
  prompt: string,
  systemPrompt?: string
): Promise<LLMResponse[]> {
  const promises = providers.map(provider => 
    callLLM(provider, prompt, systemPrompt).catch(err => {
      console.error(`Error calling ${provider}:`, err.message);
      return null;
    })
  );

  const results = await Promise.all(promises);
  return results.filter(r => r !== null) as LLMResponse[];
}
