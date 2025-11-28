export interface Assessment {
  provider: string;
  [key: string]: any;
}

export interface ConsensusResult {
  averageScores: Record<string, number>;
  agreement: number;
  confidence: number;
  outliers: string[];
  finalVerdict: string;
}

export function buildConsensus(assessments: Assessment[]): ConsensusResult {
  if (assessments.length === 0) {
    throw new Error('No assessments provided');
  }

  if (assessments.length < 3) {
    console.warn('Consensus requires at least 3 agents for reliability');
  }

  const scoreKeys = Object.keys(assessments[0]).filter(
    k => typeof assessments[0][k] === 'number' && k !== 'timestamp'
  );

  const averageScores: Record<string, number> = {};
  const stdDevs: Record<string, number> = {};
  const medianScores: Record<string, number> = {};

  // Calculate average, median, and standard deviation for each metric
  for (const key of scoreKeys) {
    const values = assessments.map(a => a[key] as number).sort((a, b) => a - b);

    // Average
    const avg = values.reduce((sum, v) => sum + v, 0) / values.length;
    averageScores[key] = Math.round(avg * 100) / 100;

    // Median (more robust to outliers)
    const mid = Math.floor(values.length / 2);
    medianScores[key] = values.length % 2 === 0
      ? (values[mid - 1] + values[mid]) / 2
      : values[mid];

    // Standard deviation
    const variance = values.reduce((sum, v) => sum + Math.pow(v - avg, 2), 0) / values.length;
    stdDevs[key] = Math.sqrt(variance);
  }

  // Agreement score: lower std dev = higher agreement
  const avgStdDev = Object.values(stdDevs).reduce((sum, v) => sum + v, 0) / Object.values(stdDevs).length;
  const agreement = Math.max(0, Math.min(100, 100 - avgStdDev * 2));

  // Confidence: combination of agreement and agent count
  // More agents = higher confidence, but with diminishing returns
  const agentBonus = Math.min(20, (assessments.length / 5) * 20);
  const confidence = Math.min(100, (agreement * 0.8) + agentBonus);

  // Outlier detection using 2-sigma rule
  const outliers: string[] = [];
  for (const assessment of assessments) {
    let outlierCount = 0;
    for (const key of scoreKeys) {
      const value = assessment[key] as number;
      const avg = averageScores[key];
      if (Math.abs(value - avg) > stdDevs[key] * 2) {
        outlierCount++;
      }
    }
    // Mark as outlier if deviates on multiple metrics
    if (outlierCount >= scoreKeys.length / 2) {
      outliers.push(assessment.provider);
    }
  }

  // Final verdict based on confidence and agreement
  let finalVerdict = 'UNCERTAIN';
  if (confidence > 80 && agreement > 75) {
    finalVerdict = 'HIGH_CONFIDENCE';
  } else if (confidence > 60 && agreement > 60) {
    finalVerdict = 'MODERATE_CONFIDENCE';
  } else if (confidence > 40) {
    finalVerdict = 'LOW_CONFIDENCE';
  }

  return {
    averageScores,
    agreement: Math.round(agreement * 100) / 100,
    confidence: Math.round(confidence * 100) / 100,
    outliers,
    finalVerdict
  };
}
