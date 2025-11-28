'use client';

import { useState } from 'react';

export default function IdentityPage() {
  const [address, setAddress] = useState('');
  const [identity, setIdentity] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleLookup = async () => {
    setLoading(true);
    setIdentity(null);

    try {
      // Mock identity lookup - in production, this would call the backend API
      const mockIdentity = {
        address,
        displayName: 'Demo User',
        legal: 'Demo Legal Name',
        web: 'https://example.com',
        twitter: '@demouser',
        email: 'demo@example.com',
        judgements: [{ registrar: 0, judgement: 'Reasonable' }]
      };

      setTimeout(() => {
        setIdentity(mockIdentity);
        setLoading(false);
      }, 1000);
    } catch (error: any) {
      alert(`Lookup failed: ${error.message}`);
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '3rem 1rem' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            ⛓️ Polkadot Identity Lookup
          </h1>
          <p style={{ color: '#6b7280', marginBottom: '1rem', fontSize: '1.125rem' }}>
            Verify on-chain identity and reputation for content creators
          </p>
          <div style={{ display: 'inline-flex', gap: '0.5rem', padding: '0.5rem 1rem', background: '#fef3c7', borderRadius: '0.5rem', fontSize: '0.875rem', color: '#92400e' }}>
            <span>🔐</span>
            <span>Accountability • Reputation • Trust</span>
          </div>
        </div>

        <div className="card">
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>
            Polkadot Address
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid var(--border)',
              borderRadius: '0.375rem',
              marginBottom: '1rem',
              fontSize: '1rem'
            }}
          />
          <button
            onClick={handleLookup}
            disabled={loading || !address}
            className="btn btn-primary"
            style={{ padding: '0.75rem 1.5rem', opacity: (loading || !address) ? 0.5 : 1 }}
          >
            {loading ? 'Looking up...' : 'Lookup Identity'}
          </button>
        </div>

        {identity && (
          <div className="card" style={{ marginTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              Identity Information
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Display Name</p>
                <p style={{ fontWeight: '600' }}>{identity.displayName || 'N/A'}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Legal Name</p>
                <p style={{ fontWeight: '600' }}>{identity.legal || 'N/A'}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Website</p>
                <p style={{ fontWeight: '600' }}>{identity.web || 'N/A'}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Twitter</p>
                <p style={{ fontWeight: '600' }}>{identity.twitter || 'N/A'}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Email</p>
                <p style={{ fontWeight: '600' }}>{identity.email || 'N/A'}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Judgements</p>
                <p style={{ fontWeight: '600' }}>
                  {identity.judgements?.length || 0} judgement(s)
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
