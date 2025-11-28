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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {steps.map((step, idx) => (
        <div key={idx} style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              width: '2rem',
              height: '2rem',
              borderRadius: '50%',
              background: '#3b82f6',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.875rem',
              fontWeight: 'bold'
            }}>
              {step.step}
            </div>
            {idx < steps.length - 1 && (
              <div style={{ width: '0.125rem', height: '3rem', background: '#bfdbfe' }}></div>
            )}
          </div>
          <div style={{ flex: 1, paddingBottom: '2rem' }}>
            <p style={{ fontWeight: '600', textTransform: 'capitalize' }}>{step.agent}</p>
            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>{step.action}</p>
            <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
              {new Date(step.timestamp).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
