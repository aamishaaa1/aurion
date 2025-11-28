# Agent Flow Documentation

## Multi-Agent Verification Pipeline

### Overview

Aurion uses a multi-agent system where 5 independent LLM providers analyze content and reach consensus.

### Agent Providers

1. **Anthropic Claude** - Advanced reasoning
2. **Groq Llama** - Fast inference
3. **Mistral** - European AI perspective
4. **Google Gemini** - Multimodal analysis
5. **xAI Grok** - Real-time knowledge

### Verification Flow

```
┌─────────────────────────────────────────────────────────┐
│                    Content Input                         │
│              (Text / Image / Video)                      │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│                  Content Router                          │
│  • Detect content type                                   │
│  • Determine priority                                    │
│  • Estimate processing time                              │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│              Parallel Agent Execution                    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐               │
│  │ Agent 1  │ │ Agent 2  │ │ Agent 3  │ ...           │
│  │Anthropic │ │  Groq    │ │ Mistral  │               │
│  └──────────┘ └──────────┘ └──────────┘               │
│       ↓             ↓             ↓                      │
│  Assessment    Assessment    Assessment                 │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│                 Consensus Engine                         │
│  • Aggregate scores                                      │
│  • Calculate agreement                                   │
│  • Detect outliers                                       │
│  • Compute confidence                                    │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│              Provenance Chain Builder                    │
│  • Hash content                                          │
│  • Record verification steps                             │
│  • Link agent assessments                                │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│            Knowledge Asset Creation                      │
│  • Build JSON-LD structure                               │
│  • Add consensus metadata                                │
│  • Include provenance                                    │
└─────────────────────────────────────────────────────────┘
```

## Text Verification

### System Prompt
```
You are an AI content verification expert. Analyze the given text and assess:
1. Likelihood it was AI-generated (0-100%)
2. Factual accuracy indicators
3. Potential misinformation markers
4. Source credibility signals
```

### Output Format
```json
{
  "aiGenerated": 75,
  "factualScore": 60,
  "misinformationRisk": 40,
  "reasoning": "High AI probability due to..."
}
```

## Image Verification

### Detection Methods
- Deepfake indicators
- AI generation artifacts
- Manipulation traces
- Authenticity signals

### Metrics
- `deepfakeRisk`: 0-100%
- `aiGenerated`: 0-100%
- `manipulationScore`: 0-100%
- `authenticityScore`: 0-100%

## Video Verification

### Analysis Points
- Temporal consistency
- Face swap detection
- Audio-visual sync
- Frame manipulation

## Consensus Algorithm

### Score Aggregation
```typescript
averageScore = sum(agentScores) / agentCount
```

### Agreement Calculation
```typescript
stdDev = sqrt(variance(scores))
agreement = max(0, 100 - stdDev * 2)
```

### Confidence Score
```typescript
confidence = (agreement + (agentCount / 5) * 20) / 2
```

### Outlier Detection
Agents with scores > 2 standard deviations from mean are flagged.

## MCP Integration

Model Context Protocol enables:
- Session management
- Message history
- Context sharing between agents
- Coordinated multi-agent workflows
