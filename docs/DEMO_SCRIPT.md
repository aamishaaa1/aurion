# Aurion Demo Script (5 Minutes)

## Preparation

1. Start DKG Edge Node
2. Start backend: `cd backend && pnpm dev`
3. Start frontend: `cd frontend && pnpm dev`
4. Open browser to http://localhost:3000

## Minute 1: Introduction (60 seconds)

**Say:**
> "Aurion is a Collective Digital Immune System that verifies AI-generated content using multi-agent consensus and publishes verifiable proofs to OriginTrail's Decentralized Knowledge Graph."

**Show:**
- Homepage with 3-layer architecture
- Explain: Agent, Knowledge, Trust layers

## Minute 2: Text Verification (60 seconds)

**Do:**
1. Navigate to /verify
2. Enter text: "Breaking: Major AI breakthrough announced today"
3. Click "Verify Text"

**Show:**
- Multi-agent analysis (5 providers)
- Consensus scores (confidence, agreement)
- Individual agent assessments
- Provenance chain with content hash

**Say:**
> "Five independent AI agents analyze the content. The consensus engine aggregates their scores and detects outliers for quality control."

## Minute 3: Image Deepfake Detection (60 seconds)

**Do:**
1. Switch to Image tab
2. Upload test image
3. Show deepfake risk analysis

**Show:**
- Deepfake risk score
- AI generation probability
- Manipulation indicators
- Authenticity score

**Say:**
> "Our system detects deepfakes and AI-generated images using multi-agent consensus."

## Minute 4: DKG Integration (60 seconds)

**Do:**
1. Click "Publish to DKG"
2. Show published UAL
3. Navigate to asset page
4. Display JSON-LD Knowledge Asset

**Show:**
- UAL (Universal Asset Locator)
- JSON-LD structure with @context
- Provenance chain embedded
- Timestamp and metadata

**Say:**
> "The verification result is published as a verifiable Knowledge Asset to OriginTrail DKG, creating an immutable proof of verification."

## Minute 5: Trust Layer (60 seconds)

**Do:**
1. Navigate to /identity
2. Show Polkadot identity lookup
3. Explain x402 micropayments

**Show:**
- Polkadot identity fields
- Identity judgements
- Payment session concept
- Reputation system

**Say:**
> "We link verified content to Polkadot identities and use x402 micropayments for usage-based pricing. This creates economic incentives and accountability."

## Closing (10 seconds)

**Say:**
> "Aurion scales trust in the age of AI by combining multi-agent verification, decentralized knowledge graphs, and blockchain identity."

## Key Points to Emphasize

✅ Multi-agent consensus (5 LLM providers)
✅ Verifiable JSON-LD Knowledge Assets
✅ OriginTrail DKG integration
✅ Polkadot identity linking
✅ x402 micropayments
✅ MCP protocol support
✅ Complete provenance chains
✅ NeuroWeb compatibility

## Backup Demos

If live demo fails:
- Show CLI: `pnpm aurion verify-text "test"`
- Show code walkthrough
- Show architecture diagrams
