export interface PolkadotIdentity {
  address: string;
  displayName?: string;
  legal?: string;
  web?: string;
  twitter?: string;
  email?: string;
  judgements?: any[];
}

export function buildIdentityLink(
  identity: PolkadotIdentity,
  contentHash: string
) {
  return {
    '@context': {
      '@vocab': 'https://schema.org/',
      'aurion': 'https://aurion.ai/ontology/',
      'polkadot': 'https://polkadot.network/ontology/'
    },
    '@type': 'aurion:PolkadotIdentityLink',
    '@id': `aurion:identity:${identity.address}`,
    'address': identity.address,
    'displayName': identity.displayName,
    'legal': identity.legal,
    'web': identity.web,
    'twitter': identity.twitter,
    'email': identity.email,
    'judgements': identity.judgements || [],
    'linkedContent': contentHash,
    'verificationTimestamp': new Date().toISOString()
  };
}
