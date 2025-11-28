export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6">
          Reality Integrity Engine
        </h1>
        <p className="text-xl mb-4 text-gray-600">
          Collective Digital Immune System for AI
        </p>
        <p className="text-lg mb-8 text-gray-500">
          Verifying truth through multi-agent consensus, verifiable knowledge graphs, and decentralized trust
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-bold mb-3">Collective Intelligence</h3>
            <p className="text-gray-600">
              Five independent AI agents analyze content simultaneously, creating consensus through diversity - no single point of failure
            </p>
          </div>

          <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-bold mb-3">Verifiable Proofs</h3>
            <p className="text-gray-600">
              Every verification becomes an immutable Knowledge Asset on OriginTrail DKG - cryptographically verifiable by anyone
            </p>
          </div>

          <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-bold mb-3">Economic Incentives</h3>
            <p className="text-gray-600">
              x402 micropayments and Polkadot identity create accountability - verifiers earn, bad actors pay
            </p>
          </div>
        </div>

        <div className="mt-12 flex gap-4 justify-center">
          <a
            href="/verify"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Start Verifying
          </a>
          <a
            href="/publish"
            className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50"
          >
            Publish Asset
          </a>
        </div>

        <div className="mt-16 text-left">
          <h2 className="text-3xl font-bold mb-4">How the Immune System Works</h2>
          <div className="space-y-6 text-gray-700">
            <div className="border-l-4 border-blue-500 pl-4">
              <strong className="text-lg">Detection Phase</strong>
              <p className="mt-2">Content enters the system and is analyzed by five independent AI agents (like immune cells). Each agent specializes in different aspects: AI generation patterns, factual consistency, manipulation markers, and credibility signals.</p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <strong className="text-lg">Consensus Phase</strong>
              <p className="mt-2">Agent assessments are aggregated using statistical consensus algorithms. Outliers are detected and weighted appropriately. The system calculates confidence scores based on agreement levels and agent diversity.</p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <strong className="text-lg">Verification Phase</strong>
              <p className="mt-2">Results are published as JSON-LD Knowledge Assets to OriginTrail DKG, creating immutable, cryptographically verifiable proofs. Provenance chains link all verification steps.</p>
            </div>

            <div className="border-l-4 border-orange-500 pl-4">
              <strong className="text-lg">Accountability Phase</strong>
              <p className="mt-2">Content is linked to Polkadot on-chain identities. x402 micropayments create economic incentives. Reputation scores build over time, creating natural selection against misinformation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
