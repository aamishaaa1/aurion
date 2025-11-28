'use client';

interface ProvenanceTimelineProps {
  steps: Array<{
    step: number;
    agent: string;
    action: string;
    timestamp: string;
    result: any;
  }>;
}

export default function ProvenanceTimeline({ steps }: ProvenanceTimelineProps) {
  return (
    <div className="space-y-4">
      {steps.map((step, idx) => (
        <div key={idx} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
              {step.step}
            </div>
            {idx < steps.length - 1 && (
              <div className="w-0.5 h-12 bg-blue-200"></div>
            )}
          </div>
          <div className="flex-1 pb-8">
            <p className="font-semibold capitalize">{step.agent}</p>
            <p className="text-sm text-gray-600">{step.action}</p>
            <p className="text-xs text-gray-400">
              {new Date(step.timestamp).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
