#!/bin/bash

echo "Setting up Aurion - Collective Digital Immune System"
echo ""

# Check for pnpm
if ! command -v pnpm &> /dev/null; then
    echo "[FAIL] pnpm not found. Please install pnpm first:"
    echo "       npm install -g pnpm"
    exit 1
fi

echo "[OK] pnpm found"
echo ""

# Install dependencies
echo "Installing dependencies..."
pnpm install

echo ""
echo "[OK] Dependencies installed"
echo ""

# Copy environment file
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env
    echo "[OK] .env created - please edit with your API keys"
else
    echo "[INFO] .env already exists"
fi

echo ""
echo "[COMPLETE] Setup finished successfully!"
echo ""
echo "Next steps:"
echo "1. Edit .env with your API keys"
echo "2. Start DKG Edge Node (see docs/DKG_INTEGRATION.md)"
echo "3. Run backend: cd backend && pnpm dev"
echo "4. Run frontend: cd frontend && pnpm dev"
echo "5. Open http://localhost:3000"
echo ""
echo "For CLI usage: pnpm aurion --help"
