'use client';

import { useState } from 'react';
import { publishAsset } from '@/lib/api';

export default function PublishPage() {
  const [jsonInput, setJsonInput] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handlePublish = async () => {
    setLoading(true);
    setResult(null);

    try {
      const asset = JSON.parse(jsonInput);
      const publishResult = await publishAsset(asset);
      setResult(publishResult);
    } catch (error: any) {
      alert(`Publish failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '3rem 1rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            🔗 Publish Knowledge Asset
          </h1>
          <p style={{ color: '#6b7280', marginBottom: '1rem', fontSize: '1.125rem' }}>
            Publish verified content as JSON-LD Knowledge Asset to OriginTrail DKG
          </p>
          <div style={{ display: 'inline-flex', gap: '0.5rem', padding: '0.5rem 1rem', background: '#f0fdf4', borderRadius: '0.5rem', fontSize: '0.875rem', color: '#166534' }}>
            <span>✅</span>
            <span>Immutable • Verifiable • Decentralized</span>
          </div>
        </div>

        <div className="card">
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>
            JSON-LD Knowledge Asset
          </label>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='{"@context": "https://schema.org/", "@type": "aurion:TruthAssessment", ...}'
            style={{
              width: '100%',
              minHeight: '300px',
              padding: '0.75rem',
              border: '1px solid var(--border)',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              fontFamily: 'monospace',
              resize: 'vertical',
              marginBottom: '1rem'
            }}
          />
          <button
            onClick={handlePublish}
            disabled={loading}
            className="btn btn-primary"
            style={{ padding: '0.75rem 1.5rem', opacity: loading ? 0.5 : 1 }}
          >
            {loading ? 'Publishing to DKG...' : 'Publish to DKG'}
          </button>
        </div>

        {result && (
          <div className="card" style={{ background: '#d1fae5', borderColor: '#10b981', marginTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#065f46' }}>
              Published Successfully
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: '#047857' }}>
              <p><strong>UAL:</strong> {result.UAL}</p>
              <p><strong>Assertion ID:</strong> {result.publicAssertionId}</p>
              <p><strong>Timestamp:</strong> {result.timestamp}</p>
            </div>
            <a
              href={`/asset/${encodeURIComponent(result.UAL)}`}
              style={{ display: 'inline-block', marginTop: '1rem', color: '#3b82f6', textDecoration: 'underline' }}
            >
              View Asset on DKG
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
