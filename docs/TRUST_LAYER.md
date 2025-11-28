# Trust Layer Documentation

## Overview

The Trust Layer provides economic incentives, identity verification, and audit trails.

## x402 Micropayment Protocol

### Session Management

```typescript
// Create payment session
const sessionId = await x402Gateway.createSession(userId);

// Record usage
await x402Gateway.recordUsage(sessionId, 'VERIFY_TEXT', 0.001);

// Initiate payment
const payment = await x402Gateway.initiatePayment(
  sessionId,
  senderAddress,
  recipientAddress
);
```

### Payment Flow

```
┌─────────────────────────────────────────────────────────┐
│                  User Request                            │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│              Create x402 Session                         │
│  sessionId = x402-{timestamp}-{random}                   │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│              Record Usage Events                         │
│  • Text verification: 0.001 NEURO                        │
│  • Image verification: 0.005 NEURO                       │
│  • Video verification: 0.010 NEURO                       │
│  • DKG publish: 0.002 NEURO                              │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│              Calculate Total Cost                        │
│  totalCost = sum(usageEvents)                            │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│              Initiate Payment                            │
│  • Create payment record                                 │
│  • Status: pending → completed                           │
│  • Currency: NEURO                                       │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│              Settlement                                  │
│  • Aggregate payments                                    │
│  • Batch settlement                                      │
│  • Update status                                         │
└─────────────────────────────────────────────────────────┘
```

## Polkadot Identity Integration

### Identity Resolution

```typescript
// Connect to NeuroWeb
await identityResolver.connect();

// Get identity
const identity = await identityResolver.getIdentity(address);

// Returns:
{
  address: "5GrwvaEF...",
  display: "Alice",
  legal: "Alice Smith",
  web: "https://alice.example",
  twitter: "@alice",
  email: "alice@example.com",
  judgements: [...]
}
```

### Identity Linking

Link verified content to Polkadot identity:

```typescript
const identityLink = buildIdentityLink(identity, contentHash);
await publishAsset(identityLink);
```

## Reputation System

### Score Calculation

```typescript
// Get user reputation
const reputation = reputationSystem.getScore(userId);

// Update after verification
reputationSystem.updateScore(userId, verificationAccurate);
```

### Reputation Metrics

- **Score**: 0-100 (starts at 50)
- **Verifications Count**: Total verifications
- **Accuracy Rate**: % of accurate verifications
- **Last Updated**: Timestamp

### Score Updates

- Accurate verification: +2 points
- Inaccurate verification: -5 points
- Capped at 0-100 range

## Audit Log

### Logging Events

```typescript
auditLog.log(
  'VERIFY_TEXT',
  contentHash,
  result,
  userId,
  { additionalMetadata }
);
```

### Query Audit Trail

```typescript
// Get all entries for user
const entries = auditLog.getEntries({ userId });

// Filter by action
const verifications = auditLog.getEntries({ action: 'VERIFY_TEXT' });

// Date range
const recent = auditLog.getEntries({
  startDate: '2025-11-01T00:00:00Z',
  endDate: '2025-11-30T23:59:59Z'
});
```

### Audit Entry Structure

```typescript
{
  id: "audit-{timestamp}-{random}",
  timestamp: "2025-11-28T10:00:00Z",
  userId: "user123",
  action: "VERIFY_TEXT",
  contentHash: "sha256:...",
  result: { ... },
  metadata: { ... }
}
```

## Settlement Engine

### Create Settlement

```typescript
const settlement = await settlementEngine.createSettlement(sessionId);
```

### Settlement Structure

```typescript
{
  settlementId: "settle-{timestamp}",
  sessionId: "x402-...",
  totalAmount: 0.018,
  payments: [...],
  status: "completed",
  timestamp: "2025-11-28T10:00:00Z"
}
```

## Security Considerations

1. **Payment Verification**: All payments verified on-chain
2. **Identity Proofs**: Polkadot judgements required
3. **Audit Trail**: Immutable log of all actions
4. **Reputation**: Prevents spam and abuse
5. **Rate Limiting**: Per-user request limits
