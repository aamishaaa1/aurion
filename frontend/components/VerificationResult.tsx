'use client';

interface VerificationResultProps {
  result: any;
}

export default function VerificationResult({ result }: VerificationResultProps) {
  if (!result) return null;

  const { consensus, assessments, provenance } = result;

  const getVerdictColor = (verdict: string) => {
    if (verdict.includes('HIGH')) return 'var(--success)';
    if (verdict.includes('MODERATE')) return 'var(--warning)';
    return 'var(--danger)';
  };

  const getVerdictEmoji = (verdict: string) => {
    if (verdict.includes('HIGH')) return '✅';
    if (verdict.includes('MODERATE')) return '⚠️';
    return '❌';
  };

  const agentLabels: Record<string, string> = {
    anthropic: 'Anthropic',
    groq: 'Groq',
    mistral: 'Mistral',
    google: 'Google',
    xai: 'xAI'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2rem' }}>
      <div className="card" style={{ background: 'var(--card)' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
          Consensus Results
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          <div>
            <p style={{ color: '#6b7280', marginBottom: '0.5rem' }}>Confidence Score</p>
            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
              {consensus.confidence}%
            </p>
          </div>
          <div>
            <p style={{ color: '#6b7280', marginBottom: '0.5rem' }}>Agent Agreement</p>
            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--success)' }}>
              {consensus.agreement}%
            </p>
          </div>
        </div>
        <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--background)', borderRadius: '0.375rem' }}>
          <p style={{ color: '#6b7280', marginBottom: '0.5rem' }}>Final Verdict</p>
          <p style={{ fontSize: '1.5rem', fontWeight: '600', color: getVerdictColor(consensus.finalVerdict) }}>
            {getVerdictEmoji(consensus.finalVerdict)} {consensus.finalVerdict}
          </p>
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Multi-Agent Assessments
        </h3>
        <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
          Independent analysis from 5 AI providers
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {assessments.map((assessment: any, idx: number) => {
            return (
              <div
                key={idx}
                style={{
                  borderLeft: '4px solid var(--primary)',
                  paddingLeft: '1rem',
                  background: 'var(--card)',
                  padding: '1rem',
                  borderRadius: '0.375rem'
                }}
              >
                <p style={{ fontWeight: '600', textTransform: 'capitalize', marginBottom: '0.5rem' }}>
                  {agentLabels[assessment.provider.toLowerCase()] || assessment.provider}
                </p>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                  {Object.entries(assessment)
                    .filter(([, value]) => typeof value === 'number')
                    .map(([metricKey, metricValue]) => (
                      <span key={metricKey}>
                        <strong>{metricKey}:</strong> {String(metricValue)}%
                      </span>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {provenance && (
        <div className="card" style={{ background: '#f0f9ff' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Provenance Chain
          </h3>
          <div style={{ fontSize: '0.875rem', color: '#374151' }}>
            <p style={{ marginBottom: '0.5rem' }}>
              <strong>Content Hash:</strong> <code style={{ background: '#e5e7eb', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>
                {provenance.contentHash?.substring(0, 40)}...
              </code>
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              <strong>Agents Participated:</strong> {provenance.agentCount}
            </p>
            <p>
              <strong>Consensus Reached:</strong> {provenance.consensusReached ? 'Yes' : 'No'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
