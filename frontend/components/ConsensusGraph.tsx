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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>Confidence</span>
          <span style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>{consensus.confidence}%</span>
        </div>
        <div style={{ width: '100%', background: '#e5e7eb', borderRadius: '9999px', height: '0.5rem' }}>
          <div
            style={{
              background: '#3b82f6',
              height: '0.5rem',
              borderRadius: '9999px',
              width: `${consensus.confidence}%`,
              transition: 'width 0.3s ease'
            }}
          ></div>
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>Agreement</span>
          <span style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>{consensus.agreement}%</span>
        </div>
        <div style={{ width: '100%', background: '#e5e7eb', borderRadius: '9999px', height: '0.5rem' }}>
          <div
            style={{
              background: '#10b981',
              height: '0.5rem',
              borderRadius: '9999px',
              width: `${consensus.agreement}%`,
              transition: 'width 0.3s ease'
            }}
          ></div>
        </div>
      </div>

      {Object.entries(consensus.averageScores).map(([key, value]) => (
        <div key={key}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: '500', textTransform: 'capitalize' }}>
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </span>
            <span style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>{value}%</span>
          </div>
          <div style={{ width: '100%', background: '#e5e7eb', borderRadius: '9999px', height: '0.5rem' }}>
            <div
              style={{
                background: '#8b5cf6',
                height: '0.5rem',
                borderRadius: '9999px',
                width: `${value}%`,
                transition: 'width 0.3s ease'
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}
