import { ConsensusResult } from '../../../agent/src/consensus';

export function buildConsensusAsset(consensus: ConsensusResult, contentHash: string) {
  return {
    '@context': {
      '@vocab': 'https://schema.org/',
      'aurion': 'https://aurion.ai/ontology/'
    },
    '@type': 'aurion:ConsensusScore',
    '@id': `aurion:consensus:${contentHash.substring(0, 16)}`,
    'agreement': consensus.agreement,
    'confidence': consensus.confidence,
    'averageScores': consensus.averageScores,
    'outliers': consensus.outliers,
    'finalVerdict': consensus.finalVerdict,
    'timestamp': new Date().toISOString()
  };
}
