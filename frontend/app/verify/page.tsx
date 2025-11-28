'use client';

import { useState } from 'react';
import UploadInput from '@/components/UploadInput';
import VerificationResult from '@/components/VerificationResult';
import { verifyText, verifyImage, verifyVideo, publishAsset } from '@/lib/api';

export default function VerifyPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [published, setPublished] = useState<any>(null);

  const handleUpload = async (content: string | File, type: 'text' | 'image' | 'video') => {
    setLoading(true);
    setResult(null);
    setPublished(null);

    try {
      let verificationResult;

      if (type === 'text') {
        verificationResult = await verifyText(content as string);
      } else if (type === 'image') {
        verificationResult = await verifyImage(content as File);
      } else {
        verificationResult = await verifyVideo(content as File);
      }

      setResult(verificationResult);
    } catch (error: any) {
      alert(`Verification failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    if (!result?.knowledgeAsset) return;

    setLoading(true);
    try {
      const publishResult = await publishAsset(result.knowledgeAsset);
      setPublished(publishResult);
      alert(`Published! UAL: ${publishResult.UAL}`);
    } catch (error: any) {
      alert(`Publish failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '3rem 1rem' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            🔬 Verify Content
          </h1>
          <p style={{ color: '#6b7280', marginBottom: '1rem', fontSize: '1.125rem' }}>
            Multi-agent consensus verification powered by 5 independent AI models
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', fontSize: '0.875rem', color: '#6b7280' }}>
            <span style={{ padding: '0.25rem 0.75rem', background: '#eff6ff', borderRadius: '9999px', color: '#1e40af' }}>Anthropic Claude</span>
            <span style={{ padding: '0.25rem 0.75rem', background: '#f0fdf4', borderRadius: '9999px', color: '#166534' }}>Groq Llama</span>
            <span style={{ padding: '0.25rem 0.75rem', background: '#fef3c7', borderRadius: '9999px', color: '#92400e' }}>Mistral</span>
            <span style={{ padding: '0.25rem 0.75rem', background: '#fce7f3', borderRadius: '9999px', color: '#9f1239' }}>Google Gemini</span>
            <span style={{ padding: '0.25rem 0.75rem', background: '#f3e8ff', borderRadius: '9999px', color: '#6b21a8' }}>xAI Grok</span>
          </div>
        </div>

        <UploadInput onUpload={handleUpload} />

        {loading && (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <div style={{
              display: 'inline-block',
              width: '48px',
              height: '48px',
              border: '4px solid #e5e7eb',
              borderTopColor: '#3b82f6',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            <p style={{ marginTop: '1rem', color: '#6b7280', fontWeight: '600' }}>
              Analyzing with multi-agent consensus...
            </p>
            <p style={{ marginTop: '0.5rem', color: '#9ca3af', fontSize: '0.875rem' }}>
              Anthropic • Groq • Mistral • Google • xAI
            </p>
          </div>
        )}

        {result && !loading && (
          <>
            <VerificationResult result={result} />

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button
                onClick={handlePublish}
                className="btn"
                style={{
                  background: 'var(--success)',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  fontSize: '1rem'
                }}
              >
                Publish to DKG
              </button>
            </div>

            {published && (
              <div className="card" style={{
                background: '#d1fae5',
                borderColor: '#10b981',
                marginTop: '1.5rem'
              }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#065f46' }}>
                  Published Successfully
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#047857', marginBottom: '0.5rem' }}>
                  UAL: {published.UAL}
                </p>
                <a
                  href={`/asset/${encodeURIComponent(published.UAL)}`}
                  style={{ color: '#3b82f6', textDecoration: 'underline' }}
                >
                  View Asset on DKG
                </a>
              </div>
            )}
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
