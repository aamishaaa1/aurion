import { ConsensusResult } from '../../../agent/src/consensus';
import { ProvenanceChain } from '../../../agent/src/provenance';

export function buildTruthAssessment(
  content: string,
  consensus: ConsensusResult,
  provenance: ProvenanceChain,
  userId?: string
) {
  const crypto = require('crypto');
  const contentHash = crypto.createHash('sha256').update(content).digest('hex');

  return {
    '@context': {
      '@vocab': 'https://schema.org/',
      'aurion': 'https://aurion.ai/ontology/',
      'dkg': 'https://dkg.origintrail.io/ontology/'
    },
    '@type': 'aurion:TruthAssessment',
    '@id': `aurion:truth:${contentHash.substring(0, 16)}`,
    'contentHash': contentHash,
    'consensusScore': consensus.confidence,
    'aiGeneratedProbability': consensus.averageScores.aiGenerated || 0,
    'factualScore': consensus.averageScores.factualScore || 0,
    'misinformationRisk': consensus.averageScores.misinformationRisk || 0,
    'verificationTimestamp': new Date().toISOString(),
    'agentCount': provenance.agentCount,
    'provenanceChain': {
      '@type': 'aurion:ProvenanceChain',
      '@id': `aurion:provenance:${contentHash.substring(0, 16)}`,
      ...provenance
    },
    'userId': userId,
    'finalVerdict': consensus.finalVerdict
  };
}
