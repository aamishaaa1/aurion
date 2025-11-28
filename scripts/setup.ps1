Write-Host "Setting up Aurion - Collective Digital Immune System" -ForegroundColor Cyan
Write-Host ""

# Check for pnpm
$pnpmExists = Get-Command pnpm -ErrorAction SilentlyContinue
if (-not $pnpmExists) {
    Write-Host "[FAIL] pnpm not found. Please install pnpm first:" -ForegroundColor Red
    Write-Host "       npm install -g pnpm"
    exit 1
}

Write-Host "[OK] pnpm found" -ForegroundColor Green
Write-Host ""

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Yellow
pnpm install

Write-Host ""
Write-Host "[OK] Dependencies installed" -ForegroundColor Green
Write-Host ""

# Copy environment file
if (-not (Test-Path .env)) {
    Write-Host "Creating .env file..." -ForegroundColor Yellow
    Copy-Item .env.example .env
    Write-Host "[OK] .env created - please edit with your API keys" -ForegroundColor Green
} else {
    Write-Host "[INFO] .env already exists" -ForegroundColor Blue
}

Write-Host ""
Write-Host "[COMPLETE] Setup finished successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:"
Write-Host "1. Edit .env with your API keys"
Write-Host "2. Start DKG Edge Node (see docs/DKG_INTEGRATION.md)"
Write-Host "3. Run backend: cd backend; pnpm dev"
Write-Host "4. Run frontend: cd frontend; pnpm dev"
Write-Host "5. Open http://localhost:3000"
Write-Host ""
Write-Host "For CLI usage: pnpm aurion --help"
