import { ConsensusResult } from '../../../agent/src/consensus';

export function buildDeepfakeRisk(
  contentHash: string,
  consensus: ConsensusResult,
  timestamp: string
) {
  return {
    '@context': {
      '@vocab': 'https://schema.org/',
      'aurion': 'https://aurion.ai/ontology/'
    },
    '@type': 'aurion:DeepfakeRisk',
    '@id': `aurion:deepfake:${contentHash.substring(0, 16)}`,
    'contentHash': contentHash,
    'deepfakeRisk': consensus.averageScores.deepfakeRisk || 0,
    'aiGenerated': consensus.averageScores.aiGenerated || 0,
    'manipulationScore': consensus.averageScores.manipulationScore || 0,
    'authenticityScore': consensus.averageScores.authenticityScore || 100,
    'detectionMethod': 'multi-agent-consensus',
    'timestamp': timestamp,
    'confidence': consensus.confidence,
    'finalVerdict': consensus.finalVerdict
  };
}
