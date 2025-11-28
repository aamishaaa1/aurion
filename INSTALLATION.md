# Aurion Installation Guide

## System Requirements

- **Node.js**: 20.x or higher
- **pnpm**: 8.x or higher
- **Operating System**: Windows, macOS, or Linux
- **RAM**: 4GB minimum, 8GB recommended
- **Disk Space**: 2GB for dependencies

## Quick Installation

### Windows (PowerShell)
```powershell
# Run setup script
.\scripts\setup.ps1

# Verify installation
npx tsx scripts/verify_setup.ts
```

### Linux/macOS (Bash)
```bash
# Make script executable
chmod +x scripts/setup.sh

# Run setup script
./scripts/setup.sh

# Verify installation
npx tsx scripts/verify_setup.ts
```

### Manual Installation
```bash
# Install dependencies
pnpm install

# Copy environment template
cp .env.example .env

# Verify setup
npx tsx scripts/verify_setup.ts
```

## Configuration

### 1. API Keys (Required for Agent Layer)

Edit `.env` and add your LLM provider API keys:

```env
# Anthropic Claude
ANTHROPIC_API_KEY=sk-ant-...

# Groq
GROQ_API_KEY=gsk_...

# Mistral
MISTRAL_API_KEY=...

# Google Gemini
GOOGLE_API_KEY=...

# xAI Grok
XAI_API_KEY=...
```

**Get API Keys:**
- Anthropic: https://console.anthropic.com
- Groq: https://console.groq.com
- Mistral: https://console.mistral.ai
- Google: https://makersuite.google.com
- xAI: https://x.ai

### 2. DKG Configuration (Optional)

For full DKG functionality, install and configure OriginTrail DKG Edge Node:

```env
DKG_NODE_URL=http://localhost:8900
DKG_NODE_PORT=8900
DKG_BLOCKCHAIN=otp::testnet
```

**Install DKG Edge Node:**
Follow: https://docs.origintrail.io/dkg-v6/edge-node-setup

### 3. Polkadot Configuration (Optional)

```env
POLKADOT_WS_ENDPOINT=wss://neuroweb-testnet.api.onfinality.io/public-ws
POLKADOT_ACCOUNT_SEED=your_seed_phrase
```

### 4. x402 Configuration (Optional)

```env
X402_GATEWAY_URL=http://localhost:8402
X402_PAYMENT_ADDRESS=your_payment_address
```

### 5. Backend Configuration

```env
BACKEND_PORT=3001
BACKEND_HOST=localhost
```

### 6. Frontend Configuration

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Running the Application

### Development Mode

#### Terminal 1: Backend
```bash
cd backend
pnpm dev
```
Backend runs on http://localhost:3001

#### Terminal 2: Frontend
```bash
cd frontend
pnpm dev
```
Frontend runs on http://localhost:3000

### Production Mode

```bash
# Build all packages
pnpm build

# Start backend
cd backend
pnpm start

# Start frontend (in new terminal)
cd frontend
pnpm start
```

## Verification

### Test Agent System
```bash
cd scripts
npx tsx bootstrap_agents.ts
```

Expected output:
```
🚀 Bootstrapping Aurion Agents...

Testing anthropic...
✅ anthropic: Hello from Aurion...

Testing groq...
✅ groq: Hello from Aurion...

...

🎉 Bootstrap complete!
```

### Test Full Pipeline
```bash
cd scripts
npx tsx test_publish.ts
```

Expected output:
```
🧪 Testing Aurion Pipeline...

1️⃣ Verifying text content...
✅ Consensus: HIGH_CONFIDENCE
   Confidence: 85.5%

2️⃣ Publishing to DKG...
✅ Published with UAL: did:dkg:otp:2043/0x...

3️⃣ Querying from DKG...
✅ Retrieved asset

🎉 Test complete!
```

### Test CLI
```bash
pnpm aurion verify-text "Test content"
```

### Test Web UI
1. Open http://localhost:3000
2. Navigate to /verify
3. Enter test text
4. Click "Verify Text"
5. View results

## Troubleshooting

### "pnpm not found"
```bash
npm install -g pnpm
```

### "API key missing"
1. Check `.env` file exists
2. Verify API keys are set
3. Restart backend server

### "Port already in use"
Change port in `.env`:
```env
BACKEND_PORT=3002
```

### "DKG connection failed"
DKG is optional for testing. The system works without it, but publishing will fail.

To fix:
1. Install DKG Edge Node
2. Start DKG node
3. Verify connection: http://localhost:8900

### "Module not found"
```bash
# Clean install
rm -rf node_modules
pnpm install
```

### "TypeScript errors"
```bash
# Rebuild
pnpm build
```

## Package-Specific Installation

### Agent Package
```bash
cd agent
pnpm install
pnpm build
```

### Backend Package
```bash
cd backend
pnpm install
pnpm build
```

### Frontend Package
```bash
cd frontend
pnpm install
pnpm build
```

### CLI Package
```bash
cd cli
pnpm install
pnpm build
```

## Environment Variables Reference

### Required
- `ANTHROPIC_API_KEY` - Anthropic Claude API key
- `GROQ_API_KEY` - Groq API key
- `MISTRAL_API_KEY` - Mistral API key
- `GOOGLE_API_KEY` - Google Gemini API key
- `XAI_API_KEY` - xAI Grok API key

### Optional
- `DKG_NODE_URL` - DKG node URL (default: http://localhost:8900)
- `DKG_NODE_PORT` - DKG node port (default: 8900)
- `DKG_BLOCKCHAIN` - DKG blockchain (default: otp::testnet)
- `POLKADOT_WS_ENDPOINT` - Polkadot WebSocket endpoint
- `POLKADOT_ACCOUNT_SEED` - Polkadot account seed phrase
- `X402_GATEWAY_URL` - x402 gateway URL
- `X402_PAYMENT_ADDRESS` - Payment address
- `BACKEND_PORT` - Backend port (default: 3001)
- `BACKEND_HOST` - Backend host (default: localhost)
- `NEXT_PUBLIC_API_URL` - Frontend API URL

## Post-Installation

### 1. Verify Setup
```bash
npx tsx scripts/verify_setup.ts
```

### 2. Test Agents
```bash
npx tsx scripts/bootstrap_agents.ts
```

### 3. Test Pipeline
```bash
npx tsx scripts/test_publish.ts
```

### 4. Start Development
```bash
# Terminal 1
cd backend && pnpm dev

# Terminal 2
cd frontend && pnpm dev
```

### 5. Open Browser
http://localhost:3000

## Next Steps

- Read `QUICKSTART.md` for usage guide
- See `docs/ARCHITECTURE.md` for system design
- Check `docs/DEMO_SCRIPT.md` for demo walkthrough
- Review `PROJECT_OVERVIEW.md` for complete overview

## Support

- Documentation: `/docs`
- Issues: GitHub Issues
- License: MIT
