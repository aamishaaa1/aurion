'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { queryAsset } from '@/lib/api';

export default function AssetPage() {
  const params = useParams();
  const [asset, setAsset] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const ual = decodeURIComponent(params.id as string);
        const result = await queryAsset(ual);
        setAsset(result);
      } catch (error: any) {
        alert(`Failed to load asset: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAsset();
  }, [params.id]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '3rem 1rem', textAlign: 'center' }}>
        <div style={{
          display: 'inline-block',
          width: '48px',
          height: '48px',
          border: '4px solid #e5e7eb',
          borderTopColor: '#3b82f6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p style={{ marginTop: '1rem', color: '#6b7280' }}>Loading asset from DKG...</p>
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="container" style={{ padding: '3rem 1rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Asset not found</h1>
        <p style={{ color: '#6b7280', marginTop: '0.5rem' }}>
          The requested Knowledge Asset could not be found on the DKG.
        </p>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '3rem 1rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            📦 Knowledge Asset
          </h1>
          <p style={{ color: '#6b7280', marginBottom: '1rem', fontSize: '1.125rem' }}>
            Verifiable JSON-LD Knowledge Asset from OriginTrail DKG
          </p>
          <div style={{ display: 'inline-flex', gap: '0.5rem', padding: '0.5rem 1rem', background: '#eff6ff', borderRadius: '0.5rem', fontSize: '0.875rem', color: '#1e40af' }}>
            <span>🔍</span>
            <span>Cryptographically Verified • Immutable • Transparent</span>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Asset Data
          </h3>
          <pre style={{
            background: '#f9fafb',
            padding: '1rem',
            borderRadius: '0.375rem',
            overflowX: 'auto',
            fontSize: '0.875rem',
            fontFamily: 'monospace',
            border: '1px solid var(--border)'
          }}>
            {JSON.stringify(asset.assertion, null, 2)}
          </pre>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Metadata
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
            <p><strong>UAL:</strong> {asset.UAL}</p>
            <p><strong>Timestamp:</strong> {asset.timestamp}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
