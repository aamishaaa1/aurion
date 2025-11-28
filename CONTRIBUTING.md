# Contributing to Aurion

## Development Setup

1. Install dependencies:
```bash
pnpm install
```

2. Configure environment:
```bash
cp .env.example .env
# Edit .env with your API keys
```

3. Start development:
```bash
# Terminal 1: Backend
cd backend
pnpm dev

# Terminal 2: Frontend
cd frontend
pnpm dev
```

## Project Structure

```
aurion/
├── agent/          # Multi-agent verification system
├── backend/        # Fastify API server
├── cli/            # Command-line interface
├── dkg/            # OriginTrail DKG integration
├── docs/           # Documentation
├── frontend/       # Next.js UI
├── knowledge/      # JSON-LD schemas
├── scripts/        # Utility scripts
└── trust/          # x402 + Polkadot integration
```

## Code Style

- TypeScript strict mode
- ESLint + Prettier
- Functional programming preferred
- Comprehensive error handling

## Testing

```bash
pnpm test
```

## Pull Requests

1. Fork the repository
2. Create feature branch
3. Make changes
4. Add tests
5. Submit PR

## License

MIT
