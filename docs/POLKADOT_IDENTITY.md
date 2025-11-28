# Polkadot Identity Integration

## Overview

Aurion links verified content to Polkadot on-chain identities.

## Setup

```env
POLKADOT_WS_ENDPOINT=wss://neuroweb-testnet.api.onfinality.io/public-ws
```

## Identity Resolver

```typescript
import { identityResolver } from '@aurion/trust';

// Connect to chain
await identityResolver.connect();

// Get identity
const identity = await identityResolver.getIdentity(address);
```

## Identity Structure

```typescript
{
  address: "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
  display: "Alice",
  legal: "Alice Smith",
  web: "https://alice.example",
  twitter: "@alice",
  email: "alice@example.com",
  judgements: [
    { registrar: 0, judgement: "Reasonable" }
  ]
}
```

## Linking Content

```typescript
import { buildIdentityLink } from '@aurion/knowledge';

const link = buildIdentityLink(identity, contentHash);
await publishAsset(link);
```

## Use Cases

1. **Content Attribution**: Link verified content to creator
2. **Reputation**: Build trust through identity
3. **Accountability**: Traceable content provenance
