# OriginTrail DKG Integration

## Setup

### Install DKG Edge Node

```bash
# Follow official guide
https://docs.origintrail.io/dkg-v6/edge-node-setup
```

### Configure Connection

```env
DKG_NODE_URL=http://localhost:8900
DKG_NODE_PORT=8900
DKG_BLOCKCHAIN=otp::testnet
```

## DKG Client

```typescript
import { dkgClient } from '@aurion/dkg';

// Get node info
const info = await dkgClient.getNodeInfo();
```

## Publishing Assets

```typescript
import { publishAsset } from '@aurion/dkg';

const result = await publishAsset(knowledgeAsset, userId);

// Returns:
{
  UAL: "did:dkg:otp:2043/0x...",
  publicAssertionId: "0x...",
  operation: { ... },
  timestamp: "2025-11-28T10:00:00Z"
}
```

## Querying Assets

```typescript
import { queryAsset } from '@aurion/dkg';

const asset = await queryAsset(UAL);

// Returns:
{
  UAL: "did:dkg:otp:2043/0x...",
  assertion: { ... },
  metadata: { ... },
  timestamp: "2025-11-28T10:00:00Z"
}
```

## Verifying Assets

```typescript
import { verifyAsset } from '@aurion/dkg';

const verification = await verifyAsset(UAL);

// Returns:
{
  UAL: "did:dkg:otp:2043/0x...",
  isValid: true,
  proofHash: "0x...",
  timestamp: "2025-11-28T10:00:00Z"
}
```

## NeuroWeb Integration

Aurion connects to NeuroWeb testnet for:
- Asset storage
- Blockchain anchoring
- Decentralized verification
