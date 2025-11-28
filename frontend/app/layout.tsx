import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aurion - Reality Integrity Engine',
  description: 'Collective Digital Immune System for AI - Verifying truth through decentralized consensus'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav className="nav">
          <div className="container nav-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '1.75rem' }}>🛡️</span>
              <div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)', lineHeight: '1.2' }}>
                  AURION
                </h1>
                <span style={{ fontSize: '0.75rem', color: '#6b7280', display: 'block' }}>
                  Reality Integrity Engine
                </span>
              </div>
            </div>
            <div className="nav-links">
              <a href="/">Home</a>
              <a href="/verify">Verify Content</a>
              <a href="/publish">Publish to DKG</a>
              <a href="/identity">Identity</a>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer style={{
          borderTop: '1px solid var(--border)',
          padding: '3rem 0 2rem',
          marginTop: '4rem',
          background: 'var(--card)'
        }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>🛡️</span>
                  <strong style={{ fontSize: '1.25rem', color: 'var(--primary)' }}>AURION</strong>
                </div>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: '1.6' }}>
                  Collective Digital Immune System for AI. Verifying truth through decentralized consensus.
                </p>
              </div>
              <div>
                <strong style={{ display: 'block', marginBottom: '0.75rem', color: 'var(--foreground)' }}>Technology</strong>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                  <span>🔗 OriginTrail DKG</span>
                  <span>⛓️ Polkadot Identity</span>
                  <span>💳 x402 Micropayments</span>
                  <span>🤖 Multi-Agent AI</span>
                </div>
              </div>
              <div>
                <strong style={{ display: 'block', marginBottom: '0.75rem', color: 'var(--foreground)' }}>Resources</strong>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
                  <a href="/" style={{ color: '#6b7280', textDecoration: 'none' }}>Home</a>
                  <a href="/verify" style={{ color: '#6b7280', textDecoration: 'none' }}>Verify Content</a>
                  <a href="/publish" style={{ color: '#6b7280', textDecoration: 'none' }}>Publish to DKG</a>
                  <a href="/identity" style={{ color: '#6b7280', textDecoration: 'none' }}>Identity Lookup</a>
                </div>
              </div>
            </div>
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', textAlign: 'center', color: '#6b7280', fontSize: '0.875rem' }}>
              <p>Built for a more trustworthy AI future 🌐</p>
              <p style={{ marginTop: '0.5rem', opacity: 0.8 }}>
                OriginTrail / Polkadot / Umanitek Hackathon 2025
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
