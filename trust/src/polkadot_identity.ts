import { ApiPromise, WsProvider } from '@polkadot/api';

export interface PolkadotIdentityInfo {
  address: string;
  display?: string;
  legal?: string;
  web?: string;
  twitter?: string;
  email?: string;
  judgements: any[];
}

export class PolkadotIdentityResolver {
  private api: ApiPromise | null = null;
  private wsEndpoint: string;

  constructor(wsEndpoint?: string) {
    this.wsEndpoint = wsEndpoint || process.env.POLKADOT_WS_ENDPOINT || 'wss://neuroweb-testnet.api.onfinality.io/public-ws';
  }

  async connect(): Promise<void> {
    if (this.api) return;
    
    const provider = new WsProvider(this.wsEndpoint);
    this.api = await ApiPromise.create({ provider });
  }

  async getIdentity(address: string): Promise<PolkadotIdentityInfo | null> {
    await this.connect();
    
    if (!this.api) {
      throw new Error('API not connected');
    }

    const identity = await this.api.query.identity.identityOf(address);
    
    if (identity.isNone) {
      return null;
    }

    const identityData = identity.unwrap();
    const info = identityData.info;

    return {
      address,
      display: info.display.isRaw ? info.display.asRaw.toUtf8() : undefined,
      legal: info.legal.isRaw ? info.legal.asRaw.toUtf8() : undefined,
      web: info.web.isRaw ? info.web.asRaw.toUtf8() : undefined,
      twitter: info.twitter.isRaw ? info.twitter.asRaw.toUtf8() : undefined,
      email: info.email.isRaw ? info.email.asRaw.toUtf8() : undefined,
      judgements: identityData.judgements.toJSON() as any[]
    };
  }

  async disconnect(): Promise<void> {
    if (this.api) {
      await this.api.disconnect();
      this.api = null;
    }
  }
}

export const identityResolver = new PolkadotIdentityResolver();
