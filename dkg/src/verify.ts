import { dkgClient } from './client';

export interface VerificationResult {
  UAL: string;
  isValid: boolean;
  proofHash: string;
  timestamp: string;
  details?: any;
}

export async function verifyAsset(UAL: string): Promise<VerificationResult> {
  const dkg = dkgClient.getClient();
  
  try {
    const asset = await dkg.asset.get(UAL);
    
    // Verify the asset exists and has valid structure
    const isValid = !!(
      asset &&
      asset.assertion &&
      asset.assertion['@context'] &&
      asset.assertion['@type']
    );

    return {
      UAL,
      isValid,
      proofHash: asset.publicAssertionId || '',
      timestamp: new Date().toISOString(),
      details: asset
    };
  } catch (error: any) {
    console.error('Failed to verify asset:', error);
    return {
      UAL,
      isValid: false,
      proofHash: '',
      timestamp: new Date().toISOString(),
      details: { error: error.message }
    };
  }
}
