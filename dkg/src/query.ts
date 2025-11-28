import { dkgClient } from './client';

export interface QueryResult {
  UAL: string;
  assertion: any;
  metadata: any;
  timestamp: string;
}

export async function queryAsset(UAL: string): Promise<QueryResult> {
  const dkg = dkgClient.getClient();
  
  try {
    const result = await dkg.asset.get(UAL);

    return {
      UAL,
      assertion: result.assertion,
      metadata: result.metadata,
      timestamp: new Date().toISOString()
    };
  } catch (error: any) {
    console.error('Failed to query asset:', error);
    throw new Error(`DKG query failed: ${error.message}`);
  }
}

export async function searchAssets(query: any): Promise<any[]> {
  const dkg = dkgClient.getClient();
  
  try {
    const results = await dkg.graph.query(query, 'SELECT');
    return results;
  } catch (error: any) {
    console.error('Failed to search assets:', error);
    throw new Error(`DKG search failed: ${error.message}`);
  }
}
