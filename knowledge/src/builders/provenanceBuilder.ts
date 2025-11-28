import { ProvenanceChain } from '../../../agent/src/provenance';

export function buildProvenanceAsset(provenance: ProvenanceChain) {
  return {
    '@context': {
      '@vocab': 'https://schema.org/',
      'aurion': 'https://aurion.ai/ontology/'
    },
    '@type': 'aurion:ProvenanceChain',
    '@id': `aurion:provenance:${provenance.contentHash.substring(0, 16)}`,
    'contentHash': provenance.contentHash,
    'timestamp': provenance.timestamp,
    'verificationSteps': provenance.verificationSteps.map(step => ({
      '@type': 'aurion:VerificationStep',
      'step': step.step,
      'agent': step.agent,
      'action': step.action,
      'timestamp': step.timestamp,
      'result': step.result
    })),
    'agentCount': provenance.agentCount,
    'consensusReached': provenance.consensusReached
  };
}
