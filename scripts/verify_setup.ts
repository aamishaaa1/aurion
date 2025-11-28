import * as fs from 'fs';
import * as path from 'path';

console.log('Verifying Aurion Setup...\n');

const requiredFiles = [
  'package.json',
  'pnpm-workspace.yaml',
  'tsconfig.json',
  '.env.example',
  'README.md',
  'agent/package.json',
  'backend/package.json',
  'cli/package.json',
  'dkg/package.json',
  'frontend/package.json',
  'knowledge/package.json',
  'trust/package.json'
];

const requiredDirs = [
  'agent/src',
  'backend/src',
  'cli/bin',
  'dkg/src',
  'frontend/app',
  'knowledge/src',
  'trust/src',
  'docs',
  'scripts'
];

let allGood = true;

console.log('Checking required files...');
for (const file of requiredFiles) {
  const exists = fs.existsSync(file);
  console.log(`  ${exists ? '[OK]' : '[FAIL]'} ${file}`);
  if (!exists) allGood = false;
}

console.log('\nChecking required directories...');
for (const dir of requiredDirs) {
  const exists = fs.existsSync(dir) && fs.statSync(dir).isDirectory();
  console.log(`  ${exists ? '[OK]' : '[FAIL]'} ${dir}`);
  if (!exists) allGood = false;
}

console.log('\nChecking documentation...');
const docs = [
  'docs/ARCHITECTURE.md',
  'docs/AGENT_FLOW.md',
  'docs/KNOWLEDGE_ASSETS.md',
  'docs/TRUST_LAYER.md',
  'docs/DKG_INTEGRATION.md',
  'docs/DEMO_SCRIPT.md'
];

for (const doc of docs) {
  const exists = fs.existsSync(doc);
  console.log(`  ${exists ? '[OK]' : '[FAIL]'} ${doc}`);
  if (!exists) allGood = false;
}

console.log('\nChecking configuration...');
const hasEnvExample = fs.existsSync('.env.example');
const hasEnv = fs.existsSync('.env');
console.log(`  ${hasEnvExample ? '[OK]' : '[FAIL]'} .env.example exists`);
console.log(`  ${hasEnv ? '[OK]' : '[WARN]'} .env exists ${!hasEnv ? '(run: cp .env.example .env)' : ''}`);

console.log('\nChecking package structure...');
try {
  const rootPkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  console.log(`  [OK] Root package.json valid`);
  console.log(`     Name: ${rootPkg.name}`);
  console.log(`     Version: ${rootPkg.version}`);
} catch (error) {
  console.log(`  [FAIL] Root package.json invalid`);
  allGood = false;
}

console.log('\n' + '='.repeat(60));
if (allGood) {
  console.log('[PASS] Setup verification completed successfully!');
  console.log('\nNext steps:');
  console.log('  1. pnpm install');
  console.log('  2. cp .env.example .env (if not done)');
  console.log('  3. Edit .env with your API keys');
  console.log('  4. cd backend && pnpm dev');
  console.log('  5. cd frontend && pnpm dev');
} else {
  console.log('[FAIL] Setup verification failed!');
  console.log('\nSome files or directories are missing.');
  console.log('Please check the errors above.');
  process.exit(1);
}
