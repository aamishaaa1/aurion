export default function Home() {
  return (
    <div className="container" style={{ padding: '3rem 1rem' }}>
      <div className="hero">
        <h1>Reality Integrity Engine</h1>
        <p style={{ fontSize: '1.5rem', color: '#6b7280', marginBottom: '1rem' }}>
          Collective Digital Immune System for AI
        </p>
        <p style={{ fontSize: '1.125rem', color: '#9ca3af', maxWidth: '800px', margin: '0 auto 2rem' }}>
          Verifying truth through multi-agent consensus, verifiable knowledge graphs, and decentralized trust
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap' }}>
          <a href="/verify" className="btn btn-primary" style={{ fontSize: '1.125rem', padding: '0.75rem 2rem', textDecoration: 'none' }}>
            Start Verifying
          </a>
          <a
            href="/publish"
            className="btn"
            style={{
              fontSize: '1.125rem',
              padding: '0.75rem 2rem',
              border: '2px solid var(--primary)',
              color: 'var(--primary)',
              background: 'transparent',
              textDecoration: 'none'
            }}
          >
            Publish to DKG
          </a>
        </div>
      </div>

      <div className="grid grid-3">
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{
            width: '60px',
            height: '60px',
            margin: '0 auto 1rem',
            background: '#3b82f6',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem'
          }}>
            🔬
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Multi-Agent Consensus
          </h3>
          <p style={{ color: '#6b7280' }}>
            Five independent AI agents (Anthropic, Groq, Mistral, Google, xAI) analyze content simultaneously - no single point of failure
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{
            width: '60px',
            height: '60px',
            margin: '0 auto 1rem',
            background: '#10b981',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem'
          }}>
            🔗
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Verifiable Knowledge
          </h3>
          <p style={{ color: '#6b7280' }}>
            Every verification becomes an immutable JSON-LD Knowledge Asset on OriginTrail DKG - cryptographically verifiable by anyone
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{
            width: '60px',
            height: '60px',
            margin: '0 auto 1rem',
            background: '#f59e0b',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem'
          }}>
            💰
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Economic Incentives
          </h3>
          <p style={{ color: '#6b7280' }}>
            x402 micropayments and Polkadot identity create accountability - accurate verifiers earn, bad actors pay
          </p>
        </div>
      </div>

      <div style={{ marginTop: '4rem', maxWidth: '900px', marginLeft: 'auto', marginRight: 'auto' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', textAlign: 'center' }}>
          🛡️ How the Immune System Works
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ borderLeft: '4px solid #3b82f6', paddingLeft: '1.5rem' }}>
            <strong style={{ fontSize: '1.25rem', color: '#3b82f6' }}>🔍 Phase 1: Detection</strong>
            <p style={{ marginTop: '0.5rem', color: '#4b5563' }}>
              Content enters the system and is analyzed by five independent AI agents (like immune cells). Each agent specializes in different aspects: AI generation patterns, factual consistency, manipulation markers, and credibility signals.
            </p>
          </div>

          <div style={{ borderLeft: '4px solid #10b981', paddingLeft: '1.5rem' }}>
            <strong style={{ fontSize: '1.25rem', color: '#10b981' }}>🤝 Phase 2: Consensus</strong>
            <p style={{ marginTop: '0.5rem', color: '#4b5563' }}>
              Agent assessments are aggregated using statistical consensus algorithms. Outliers are detected and weighted appropriately. The system calculates confidence scores based on agreement levels and agent diversity.
            </p>
          </div>

          <div style={{ borderLeft: '4px solid #8b5cf6', paddingLeft: '1.5rem' }}>
            <strong style={{ fontSize: '1.25rem', color: '#8b5cf6' }}>✅ Phase 3: Verification</strong>
            <p style={{ marginTop: '0.5rem', color: '#4b5563' }}>
              Results are published as JSON-LD Knowledge Assets to OriginTrail DKG, creating immutable, cryptographically verifiable proofs. Provenance chains link all verification steps with timestamps and signatures.
            </p>
          </div>

          <div style={{ borderLeft: '4px solid #f59e0b', paddingLeft: '1.5rem' }}>
            <strong style={{ fontSize: '1.25rem', color: '#f59e0b' }}>⚖️ Phase 4: Accountability</strong>
            <p style={{ marginTop: '0.5rem', color: '#4b5563' }}>
              Content is linked to Polkadot on-chain identities. x402 micropayments create economic incentives. Reputation scores build over time, creating natural selection against misinformation.
            </p>
          </div>
        </div>
      </div>

      <div style={{
        marginTop: '4rem',
        padding: '2.5rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '0.75rem',
        textAlign: 'center',
        color: 'white'
      }}>
        <h3 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          🧬 Why Immune System, Not Fact Checker?
        </h3>
        <p style={{ maxWidth: '800px', margin: '0 auto 1.5rem', fontSize: '1.125rem', lineHeight: '1.7' }}>
          Aurion doesn&apos;t claim absolute truth. Like your immune system, it provides probabilistic confidence scores from diverse, independent sources. It&apos;s infrastructure for verifiable reality in an age where reality itself can be generated.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔬</div>
            <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Diverse Detection</strong>
            <span style={{ fontSize: '0.875rem', opacity: 0.9 }}>5 independent agents</span>
          </div>
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🧠</div>
            <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Collective Memory</strong>
            <span style={{ fontSize: '0.875rem', opacity: 0.9 }}>DKG knowledge graph</span>
          </div>
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔄</div>
            <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Adaptive Learning</strong>
            <span style={{ fontSize: '0.875rem', opacity: 0.9 }}>Improves over time</span>
          </div>
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚡</div>
            <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Economic Selection</strong>
            <span style={{ fontSize: '0.875rem', opacity: 0.9 }}>Truth is incentivized</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '4rem', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          The Reality Crisis
        </h3>
        <p style={{ color: '#6b7280', maxWidth: '700px', margin: '0 auto 2rem', fontSize: '1.125rem' }}>
          AI can now generate photorealistic deepfakes, hallucinate facts with confidence, and spread misinformation at machine speed. Traditional fact-checkers can&apos;t scale. Centralized platforms can be biased. We need a new approach.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ padding: '1.5rem', background: '#fef2f2', borderRadius: '0.5rem', borderLeft: '4px solid #ef4444' }}>
            <strong style={{ color: '#991b1b', display: 'block', marginBottom: '0.5rem' }}>❌ Traditional Approach</strong>
            <p style={{ fontSize: '0.875rem', color: '#7f1d1d' }}>Single AI detector, centralized control, opaque decisions, no transparency</p>
          </div>
          <div style={{ padding: '1.5rem', background: '#f0fdf4', borderRadius: '0.5rem', borderLeft: '4px solid #10b981' }}>
            <strong style={{ color: '#065f46', display: 'block', marginBottom: '0.5rem' }}>✅ Aurion Approach</strong>
            <p style={{ fontSize: '0.875rem', color: '#064e3b' }}>Multi-agent consensus, decentralized, verifiable proofs, complete transparency</p>
          </div>
        </div>
      </div>
    </div>
  );
}
