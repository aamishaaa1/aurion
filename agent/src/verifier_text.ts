import { callMultipleLLMs, LLMProvider } from './llm/provider';
import { buildConsensus } from './consensus';
import { buildProvenanceChain } from './provenance';
import { buildTruthAssessment } from '../../knowledge/src/builders/truthBuilder';

const SYSTEM_PROMPT = `You are a specialized content verification agent in a collective immune system. Your role is to independently assess content authenticity.

Analyze the text for:
1. AI generation patterns (repetitive structures, unnatural phrasing, generic language)
2. Factual consistency (internal contradictions, verifiable claims, temporal coherence)
3. Misinformation markers (sensationalism, lack of sources, emotional manipulation)
4. Credibility signals (specificity, nuance, expert knowledge)

Be conservative - uncertainty is acceptable. Your assessment will be combined with other agents.

Respond in JSON:
{
  "aiGenerated": <0-100>,
  "factualScore": <0-100>,
  "misinformationRisk": <0-100>,
  "reasoning": "<specific observations, not generic statements>"
}`;

export async function verifyText(text: string, userId?: string) {
  const timestamp = new Date().toISOString();

  const providers: LLMProvider[] = ['anthropic', 'groq', 'mistral', 'google', 'xai'];

  const prompt = `Analyze this text:\n\n"${text}"`;

  const responses = await callMultipleLLMs(providers, prompt, SYSTEM_PROMPT);

  const assessments = responses.map(r => {
    try {
      const parsed = JSON.parse(r.content);
      return {
        provider: r.provider,
        ...parsed,
        timestamp: r.timestamp
      };
    } catch {
      return {
        provider: r.provider,
        aiGenerated: 50,
        factualScore: 50,
        misinformationRisk: 50,
        reasoning: 'Parse error',
        timestamp: r.timestamp
      };
    }
  });

  const consensus = buildConsensus(assessments);
  const provenance = buildProvenanceChain(text, assessments, timestamp);
  const truthAsset = buildTruthAssessment(text, consensus, provenance, userId);

  return {
    assessments,
    consensus,
    provenance,
    knowledgeAsset: truthAsset,
    timestamp
  };
}
