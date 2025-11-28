import DKG from 'dkg.js';

export class DKGClient {
  private dkg: any;
  private nodeUrl: string;
  private blockchain: string;

  constructor() {
    this.nodeUrl = process.env.DKG_NODE_URL || 'http://localhost:8900';
    this.blockchain = process.env.DKG_BLOCKCHAIN || 'otp::testnet';
    
    this.dkg = new DKG({
      endpoint: this.nodeUrl,
      port: parseInt(process.env.DKG_NODE_PORT || '8900'),
      blockchain: {
        name: this.blockchain,
        publicKey: process.env.DKG_PUBLIC_KEY,
        privateKey: process.env.DKG_PRIVATE_KEY
      }
    });
  }

  getClient(): any {
    return this.dkg;
  }

  async getNodeInfo(): Promise<any> {
    try {
      return await this.dkg.node.info();
    } catch (error) {
      console.error('Failed to get node info:', error);
      throw error;
    }
  }
}

export const dkgClient = new DKGClient();
