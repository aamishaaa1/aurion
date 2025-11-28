'use client';

interface ConsensusGraphProps {
  consensus: {
    confidence: number;
    agreement: number;
    averageScores: Record<string, number>;
  };
}

export default function ConsensusGraph({ consensus }: ConsensusGraphProps) {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">Confidence</span>
          <span className="text-sm font-bold">{consensus.confidence}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: `${consensus.confidence}%` }}
          ></div>
        </div>
      </div>

      <div>
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">Agreement</span>
          <span className="text-sm font-bold">{consensus.agreement}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full"
            style={{ width: `${consensus.agreement}%` }}
          ></div>
        </div>
      </div>

      {Object.entries(consensus.averageScores).map(([key, value]) => (
        <div key={key}>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </span>
            <span className="text-sm font-bold">{value}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-purple-600 h-2 rounded-full"
              style={{ width: `${value}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}
