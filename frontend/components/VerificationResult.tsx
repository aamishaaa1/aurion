'use client';

interface VerificationResultProps {
  result: any;
}

export default function VerificationResult({ result }: VerificationResultProps) {
  if (!result) return null;

  const { consensus, assessments, provenance } = result;

  return (
    <div className="space-y-6">
      <div className="border rounded-lg p-6 bg-white">
        <h3 className="text-2xl font-bold mb-4">Consensus Results</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Confidence</p>
            <p className="text-3xl font-bold text-blue-600">{consensus.confidence}%</p>
          </div>
          <div>
            <p className="text-gray-600">Agreement</p>
            <p className="text-3xl font-bold text-green-600">{consensus.agreement}%</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-gray-600">Final Verdict</p>
          <p className="text-xl font-semibold">{consensus.finalVerdict}</p>
        </div>
      </div>

      <div className="border rounded-lg p-6 bg-white">
        <h3 className="text-xl font-bold mb-4">Agent Assessments</h3>
        <div className="space-y-3">
          {assessments.map((assessment: any, idx: number) => (
            <div key={idx} className="border-l-4 border-blue-500 pl-4">
              <p className="font-semibold capitalize">{assessment.provider}</p>
              <div className="text-sm text-gray-600">
                {Object.entries(assessment)
                  .filter(([key, value]) => typeof value === 'number')
                  .map(([key, value]) => (
                    <span key={key} className="mr-4">
                      {key}: {value}%
                    </span>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {provenance && (
        <div className="border rounded-lg p-6 bg-white">
          <h3 className="text-xl font-bold mb-4">Provenance Chain</h3>
          <p className="text-sm text-gray-600 mb-2">
            Hash: {provenance.contentHash?.substring(0, 32)}...
          </p>
          <p className="text-sm text-gray-600">
            Agents: {provenance.agentCount} | Consensus: {provenance.consensusReached ? 'Yes' : 'No'}
          </p>
        </div>
      )}
    </div>
  );
}
