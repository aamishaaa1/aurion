import { dkgClient } from './client';
import { auditLog } from '../../trust/src/audit_log';

export interface PublishResult {
  UAL: string;
  publicAssertionId: string;
  operation: any;
  timestamp: string;
}

export async function publishAsset(
  asset: any,
  userId?: string
): Promise<PublishResult> {
  const dkg = dkgClient.getClient();
  
  try {
    const result = await dkg.asset.create(asset, {
      epochsNum: 2
    });

    const publishResult: PublishResult = {
      UAL: result.UAL,
      publicAssertionId: result.publicAssertionId,
      operation: result.operation,
      timestamp: new Date().toISOString()
    };

    // Log to audit
    const contentHash = asset['@id'] || asset.contentHash || 'unknown';
    auditLog.log('PUBLISH_ASSET', contentHash, publishResult, userId, {
      UAL: result.UAL
    });

    return publishResult;
  } catch (error: any) {
    console.error('Failed to publish asset:', error);
    throw new Error(`DKG publish failed: ${error.message}`);
  }
}
