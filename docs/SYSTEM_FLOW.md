# Aurion System Flow Diagrams

## Complete Verification Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INPUT                               │
│              Text / Image / Video Content                        │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      CONTENT ROUTER                              │
│  • Detect content type (text/image/video)                       │
│  • Determine priority (high/medium/low)                         │
│  • Estimate processing time                                     │
│  • Select appropriate agents                                    │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                   PARALLEL AGENT EXECUTION                       │
│                                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │ Anthropic│  │   Groq   │  │ Mistral  │  │  Google  │       │
│  │  Claude  │  │  Llama   │  │  Large   │  │  Gemini  │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
│       ↓             ↓             ↓             ↓               │
│  Assessment    Assessment    Assessment    Assessment           │
│                                                                  │
│  ┌──────────┐                                                   │
│  │   xAI    │                                                   │
│  │   Grok   │                                                   │
│  └──────────┘                                                   │
│       ↓                                                          │
│  Assessment                                                      │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                     CONSENSUS ENGINE                             │
│                                                                  │
│  1. Aggregate Scores                                            │
│     averageScore = sum(scores) / count                          │
│                                                                  │
│  2. Calculate Agreement                                         │
│     stdDev = sqrt(variance)                                     │
│     agreement = max(0, 100 - stdDev * 2)                        │
│                                                                  │
│  3. Detect Outliers                                             │
│     if |score - avg| > 2 * stdDev: outlier                      │
│                                                                  │
│  4. Compute Confidence                                          │
│     confidence = (agreement + agentBonus) / 2                   │
│                                                                  │
│  5. Final Verdict                                               │
│     HIGH_CONFIDENCE / MODERATE / UNCERTAIN                      │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                  PROVENANCE CHAIN BUILDER                        │
│                                                                  │
│  1. Hash Content                                                │
│     contentHash = SHA256(content)                               │
│                                                                  │
│  2. Record Steps                                                │
│     step1: Agent A verified → result                            │
│     step2: Agent B verified → result                            │
│     ...                                                          │
│                                                                  │
│  3. Link Assessments                                            │
│     Each step includes timestamp, agent, action, result         │
│                                                                  │
│  4. Build Chain                                                 │
│     ProvenanceChain with all verification steps                 │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                 KNOWLEDGE ASSET CREATION                         │
│                                                                  │
│  Build JSON-LD Asset:                                           │
│  {                                                               │
│    "@context": {...},                                           │
│    "@type": "aurion:TruthAssessment",                          │
│    "contentHash": "sha256:...",                                 │
│    "consensusScore": 85.5,                                      │
│    "provenanceChain": {...},                                    │
│    "timestamp": "2025-11-28T10:00:00Z"                         │
│  }                                                               │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      TRUST LAYER                                 │
│                                                                  │
│  1. x402 Micropayment                                           │
│     • Create session                                            │
│     • Record usage (0.001-0.010 NEURO)                         │
│     • Initiate payment                                          │
│                                                                  │
│  2. Polkadot Identity                                           │
│     • Resolve on-chain identity                                 │
│     • Link to content hash                                      │
│     • Verify judgements                                         │
│                                                                  │
│  3. Reputation Update                                           │
│     • Update user score                                         │
│     • Record verification count                                 │
│     • Calculate accuracy rate                                   │
│                                                                  │
│  4. Audit Log                                                   │
│     • Log verification event                                    │
│     • Record timestamp                                          │
│     • Store metadata                                            │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    DKG PUBLISHING                                │
│                                                                  │
│  1. Connect to DKG Edge Node                                    │
│     endpoint: http://localhost:8900                             │
│                                                                  │
│  2. Publish Asset                                               │
│     dkg.asset.create(knowledgeAsset, { epochsNum: 2 })         │
│                                                                  │
│  3. Receive UAL                                                 │
│     UAL: did:dkg:otp:2043/0x...                                │
│                                                                  │
│  4. Anchor to NeuroWeb                                          │
│     Blockchain confirmation                                     │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      RESULT DELIVERY                             │
│                                                                  │
│  Return to User:                                                │
│  • Consensus results                                            │
│  • Agent assessments                                            │
│  • Provenance chain                                             │
│  • Knowledge Asset                                              │
│  • UAL (if published)                                           │
│  • Payment receipt                                              │
│  • Reputation update                                            │
└─────────────────────────────────────────────────────────────────┘
```

## MCP Integration Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                      MCP CLIENT                                  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                   CREATE SESSION                                 │
│  sessionId = mcp-{timestamp}-{random}                           │
│  context = { contentType, userId, startTime }                   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                   AGENT COORDINATION                             │
│                                                                  │
│  Agent 1 → MCP → Share context                                  │
│  Agent 2 → MCP → Access shared context                          │
│  Agent 3 → MCP → Update context                                 │
│  ...                                                             │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                   MESSAGE HISTORY                                │
│                                                                  │
│  messages: [                                                     │
│    { role: 'user', content: '...', timestamp: '...' },         │
│    { role: 'assistant', content: '...', timestamp: '...' }     │
│  ]                                                               │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                   CLOSE SESSION                                  │
│  Store final results                                            │
│  Clean up resources                                             │
└─────────────────────────────────────────────────────────────────┘
```

## Payment Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                   USER REQUEST                                   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│              CREATE x402 SESSION                                 │
│  sessionId = x402-{timestamp}-{random}                          │
│  totalCost = 0                                                  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│              RECORD USAGE EVENTS                                 │
│                                                                  │
│  Event 1: Text verification → +0.001 NEURO                      │
│  Event 2: DKG publish → +0.002 NEURO                            │
│  Event 3: Identity link → +0.001 NEURO                          │
│                                                                  │
│  totalCost = 0.004 NEURO                                        │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│              INITIATE PAYMENT                                    │
│                                                                  │
│  payment = {                                                     │
│    paymentId: "pay-{timestamp}",                                │
│    amount: 0.004,                                               │
│    currency: "NEURO",                                           │
│    sender: userAddress,                                         │
│    recipient: serviceAddress,                                   │
│    status: "pending"                                            │
│  }                                                               │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│              PROCESS PAYMENT                                     │
│  • Verify balance                                               │
│  • Execute transfer                                             │
│  • Update status: "completed"                                   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│              CREATE SETTLEMENT                                   │
│  • Aggregate payments                                           │
│  • Batch settlement                                             │
│  • Generate receipt                                             │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

```
Input → Router → Agents → Consensus → Provenance → Asset → Trust → DKG → Output
  ↓       ↓        ↓         ↓           ↓          ↓       ↓      ↓      ↓
Text    Type    5 LLMs   Aggregate   Hash+Chain   JSON-LD  x402   Publish Result
Image   Select  Parallel  Scores     Steps        Schema   Pay    UAL     User
Video   Agents  Execute   Agreement  Link         Build    ID     Store   Display
```
