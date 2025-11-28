'use client';

interface IdentityBadgeProps {
  identity: {
    address: string;
    displayName?: string;
    judgements?: any[];
  };
}

export default function IdentityBadge({ identity }: IdentityBadgeProps) {
  const hasJudgements = identity.judgements && identity.judgements.length > 0;

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 border rounded-full bg-white">
      <span className="text-sm font-semibold">
        {identity.displayName || identity.address.substring(0, 8)}
      </span>
      {hasJudgements && (
        <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
          ✓ Verified
        </span>
      )}
    </div>
  );
}
