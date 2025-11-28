import { verifyText } from '../agent/src/verifier_text';
import { publishAsset } from '../dkg/src/publish';
import { queryAsset } from '../dkg/src/query';

async function testPublish() {
  console.log('Testing Aurion Pipeline...\n');

  // Step 1: Verify text
  console.log('[1/3] Verifying text content...');
  const text = 'Breaking news: Major AI breakthrough announced today.';
  const verificationResult = await verifyText(text, 'test-user');

  console.log(`[OK] Consensus: ${verificationResult.consensus.finalVerdict}`);
  console.log(`     Confidence: ${verificationResult.consensus.confidence}%\n`);

  // Step 2: Publish to DKG
  console.log('[2/3] Publishing to DKG...');
  const publishResult = await publishAsset(verificationResult.knowledgeAsset, 'test-user');

  console.log(`[OK] Published with UAL: ${publishResult.UAL}\n`);

  // Step 3: Query from DKG
  console.log('[3/3] Querying from DKG...');
  const queryResult = await queryAsset(publishResult.UAL);

  console.log(`[OK] Retrieved asset:`);
  console.log(JSON.stringify(queryResult.assertion, null, 2));

  console.log('\n[COMPLETE] Test pipeline finished successfully!');
}

testPublish().catch(console.error);
