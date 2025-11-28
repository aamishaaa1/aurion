# Knowledge Assets Documentation

## JSON-LD Schema Definitions

### TruthAssessment

Verifiable truth assessment for content.

```json
{
  "@context": {
    "@vocab": "https://schema.org/",
    "aurion": "https://aurion.ai/ontology/"
  },
  "@type": "aurion:TruthAssessment",
  "@id": "aurion:truth:abc123...",
  "contentHash": "sha256:...",
  "consensusScore": 85.5,
  "aiGeneratedProbability": 75,
  "factualScore": 80,
  "misinformationRisk": 25,
  "verificationTimestamp": "2025-11-28T10:00:00Z",
  "agentCount": 5,
  "provenanceChain": { ... }
}
```

### ConsensusScore

Multi-agent consensus results.

```json
{
  "@context": {
    "@vocab": "https://schema.org/",
    "aurion": "https://aurion.ai/ontology/"
  },
  "@type": "aurion:ConsensusScore",
  "@id": "aurion:consensus:abc123...",
  "agreement": 92.5,
  "confidence": 88.0,
  "averageScores": {
    "aiGenerated": 75,
    "factualScore": 80
  },
  "outliers": ["provider1"],
  "finalVerdict": "HIGH_CONFIDENCE"
}
```

### DeepfakeRisk

Deepfake and manipulation assessment.

```json
{
  "@context": {
    "@vocab": "https://schema.org/",
    "aurion": "https://aurion.ai/ontology/"
  },
  "@type": "aurion:DeepfakeRisk",
  "@id": "aurion:deepfake:abc123...",
  "contentHash": "sha256:...",
  "deepfakeRisk": 45,
  "aiGenerated": 50,
  "manipulationScore": 40,
  "authenticityScore": 60,
  "detectionMethod": "multi-agent-consensus",
  "timestamp": "2025-11-28T10:00:00Z"
}
```

### ProvenanceChain

Verification provenance trail.

```json
{
  "@context": {
    "@vocab": "https://schema.org/",
    "aurion": "https://aurion.ai/ontology/"
  },
  "@type": "aurion:ProvenanceChain",
  "@id": "aurion:provenance:abc123...",
  "contentHash": "sha256:...",
  "timestamp": "2025-11-28T10:00:00Z",
  "verificationSteps": [
    {
      "@type": "aurion:VerificationStep",
      "step": 1,
      "agent": "anthropic",
      "action": "VERIFY_CONTENT",
      "timestamp": "2025-11-28T10:00:01Z",
      "result": { ... }
    }
  ],
  "agentCount": 5,
  "consensusReached": true
}
```

### PolkadotIdentityLink

Link to Polkadot on-chain identity.

```json
{
  "@context": {
    "@vocab": "https://schema.org/",
    "aurion": "https://aurion.ai/ontology/",
    "polkadot": "https://polkadot.network/ontology/"
  },
  "@type": "aurion:PolkadotIdentityLink",
  "@id": "aurion:identity:5GrwvaEF...",
  "address": "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
  "displayName": "Alice",
  "legal": "Alice Smith",
  "web": "https://alice.example",
  "twitter": "@alice",
  "email": "alice@example.com",
  "judgements": [...],
  "linkedContent": "sha256:...",
  "verificationTimestamp": "2025-11-28T10:00:00Z"
}
```

## Asset Builders

Each schema has a corresponding builder function:

- `buildTruthAssessment()` - Creates truth assessment asset
- `buildConsensusAsset()` - Creates consensus score asset
- `buildDeepfakeRisk()` - Creates deepfake risk asset
- `buildProvenanceAsset()` - Creates provenance chain asset
- `buildIdentityLink()` - Creates identity link asset

## Publishing to DKG

Assets are published to OriginTrail DKG using:

```typescript
const result = await publishAsset(knowledgeAsset, userId);
// Returns: { UAL, publicAssertionId, operation, timestamp }
```

## Querying from DKG

Retrieve assets using UAL:

```typescript
const asset = await queryAsset(UAL);
// Returns: { UAL, assertion, metadata, timestamp }
```

## Verification

Verify asset integrity:

```typescript
const verification = await verifyAsset(UAL);
// Returns: { UAL, isValid, proofHash, timestamp, details }
```
