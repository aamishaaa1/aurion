import { Assessment } from './consensus';

export interface ProvenanceChain {
  contentHash: string;
  timestamp: string;
  verificationSteps: ProvenanceStep[];
  agentCount: number;
  consensusReached: boolean;
}

export interface ProvenanceStep {
  step: number;
  agent: string;
  action: string;
  timestamp: string;
  result: any;
}

export function buildProvenanceChain(
  content: string,
  assessments: Assessment[],
  timestamp: string
): ProvenanceChain {
  const crypto = require('crypto');
  const contentHash = crypto.createHash('sha256').update(content).digest('hex');

  const verificationSteps: ProvenanceStep[] = assessments.map((assessment, index) => ({
    step: index + 1,
    agent: assessment.provider,
    action: 'VERIFY_CONTENT',
    timestamp: assessment.timestamp || timestamp,
    result: {
      scores: Object.keys(assessment)
        .filter(k => typeof assessment[k] === 'number')
        .reduce((obj, k) => ({ ...obj, [k]: assessment[k] }), {})
    }
  }));

  return {
    contentHash,
    timestamp,
    verificationSteps,
    agentCount: assessments.length,
    consensusReached: assessments.length >= 3
  };
}
