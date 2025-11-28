# Aurion Architecture

## System Overview

Aurion implements a three-layer architecture for AI content verification:

```
┌─────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Next.js    │  │     CLI      │  │   REST API   │  │
│  │   Frontend   │  │   Interface  │  │   (Fastify)  │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│                     AGENT LAYER                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Multi-Agent Verification System                  │  │
│  │  ├─ Text Verifier (5 LLM providers)              │  │
│  │  ├─ Image Verifier (Deepfake detection)          │  │
│  │  ├─ Video Verifier (Manipulation detection)      │  │
│  │  ├─ Consensus Engine (Score aggregation)         │  │
│  │  └─ Provenance Builder (Chain creation)          │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │  MCP Client (Model Context Protocol)             │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│                   KNOWLEDGE LAYER                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │  JSON-LD Schema Definitions                       │  │
│  │  ├─ TruthAssessment.jsonld                       │  │
│  │  ├─ ConsensusScore.jsonld                        │  │
│  │  ├─ DeepfakeRisk.jsonld                          │  │
│  │  ├─ ProvenanceChain.jsonld                       │  │
│  │  └─ PolkadotIdentityLink.jsonld                  │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Asset Builders (JSON-LD construction)           │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│                     TRUST LAYER                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │  x402 Micropayment Gateway                        │  │
│  │  ├─ Session management                           │  │
│  │  ├─ Usage metering                               │  │
│  │  └─ Payment settlement                           │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Polkadot Identity Resolver                       │  │
│  │  └─ On-chain identity verification                │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Reputation System + Audit Log                    │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│                      DKG LAYER                           │
│  ┌──────────────────────────────────────────────────┐  │
│  │  OriginTrail DKG Client                           │  │
│  │  ├─ Asset Publishing                             │  │
│  │  ├─ Asset Querying                               │  │
│  │  └─ Asset Verification                           │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │  DKG Edge Node (Local)                            │  │
│  │  └─ NeuroWeb Testnet Connection                  │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## Component Interactions

### 1. Content Verification Flow

```
User Input → Router → Agent Pipeline → Consensus → Knowledge Asset → DKG
```

### 2. Multi-Agent Consensus

- 5 LLM providers: Anthropic, Groq, Mistral, Google, xAI
- Each agent analyzes independently
- Consensus engine aggregates scores
- Outlier detection for quality control

### 3. Knowledge Asset Creation

- JSON-LD format with @context
- Schema.org + custom Aurion ontology
- Linked provenance chains
- Cryptographic content hashing

### 4. Trust Mechanisms

- x402 micropayments for usage
- Polkadot identity linking
- Reputation scoring
- Audit trail logging

## Technology Stack

- **Backend**: Fastify (Node.js)
- **Agent**: TypeScript + Multiple LLM SDKs
- **Frontend**: Next.js 15 + React 18
- **DKG**: dkg.js + OriginTrail
- **Blockchain**: Polkadot.js + NeuroWeb
- **Styling**: Tailwind CSS
