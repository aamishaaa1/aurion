# Aurion Quick Start Guide

## Prerequisites

- Node.js 20+
- pnpm 8+
- OriginTrail DKG Edge Node (optional for full functionality)

## Installation

### Windows
```powershell
.\scripts\setup.ps1
```

### Linux/Mac
```bash
chmod +x scripts/setup.sh
./scripts/setup.sh
```

### Manual
```bash
pnpm install
cp .env.example .env
```

## Configuration

Edit `.env` with your API keys:

```env
# Required for agent verification
ANTHROPIC_API_KEY=your_key
GROQ_API_KEY=your_key
MISTRAL_API_KEY=your_key
GOOGLE_API_KEY=your_key
XAI_API_KEY=your_key

# Optional for full DKG functionality
DKG_NODE_URL=http://localhost:8900
POLKADOT_WS_ENDPOINT=wss://neuroweb-testnet.api.onfinality.io/public-ws
```

## Running the Application

### Backend API
```bash
cd backend
pnpm dev
# Runs on http://localhost:3001
```

### Frontend UI
```bash
cd frontend
pnpm dev
# Runs on http://localhost:3000
```

### CLI
```bash
# Verify text
pnpm aurion verify-text "Your text here"

# Verify image
pnpm aurion verify-image ./image.png

# Verify video
pnpm aurion verify-video ./video.mp4

# Publish asset
pnpm aurion publish ./asset.json

# Query asset
pnpm aurion query <UAL>
```

## Testing

### Test Agent System
```bash
cd scripts
npx tsx bootstrap_agents.ts
```

### Test Full Pipeline
```bash
cd scripts
npx tsx test_publish.ts
```

## Usage Examples

### Web UI

1. Open http://localhost:3000
2. Navigate to "Verify"
3. Enter text or upload media
4. View multi-agent consensus results
5. Publish to DKG
6. View Knowledge Asset

### API

```bash
# Verify text
curl -X POST http://localhost:3001/verify/text \
  -H "Content-Type: application/json" \
  -d '{"text": "Your content here"}'

# Publish asset
curl -X POST http://localhost:3001/publish \
  -H "Content-Type: application/json" \
  -d '{"asset": {...}}'
```

### CLI

```bash
# Text verification
pnpm aurion verify-text "Breaking news: AI breakthrough"

# Image verification
pnpm aurion verify-image suspicious-image.jpg

# Publish to DKG
pnpm aurion publish knowledge-asset.json
```

## Project Structure

```
aurion/
├── agent/          # Multi-agent verification (5 LLM providers)
├── backend/        # Fastify REST API
├── cli/            # Command-line interface
├── dkg/            # OriginTrail DKG integration
├── frontend/       # Next.js 15 web UI
├── knowledge/      # JSON-LD schemas & builders
├── trust/          # x402 + Polkadot identity
├── docs/           # Complete documentation
└── scripts/        # Setup & test utilities
```

## Key Features

✅ Multi-agent consensus (5 LLM providers)
✅ Text, image, and video verification
✅ Deepfake detection
✅ JSON-LD Knowledge Assets
✅ OriginTrail DKG publishing
✅ Polkadot identity linking
✅ x402 micropayments
✅ MCP protocol support
✅ Complete provenance chains
✅ Web UI + CLI + API

## Troubleshooting

### "pnpm not found"
```bash
npm install -g pnpm
```

### "API key missing"
Edit `.env` and add your LLM provider API keys

### "DKG connection failed"
DKG Edge Node is optional for testing. The system will work without it, but publishing will fail.

### "Port already in use"
Change ports in `.env`:
```env
BACKEND_PORT=3002
```

## Next Steps

1. Read `docs/ARCHITECTURE.md` for system overview
2. See `docs/DEMO_SCRIPT.md` for demo walkthrough
3. Check `docs/AGENT_FLOW.md` for verification details
4. Review `HACKATHON.md` for submission info

## Support

- Documentation: `/docs`
- Issues: GitHub Issues
- License: MIT
