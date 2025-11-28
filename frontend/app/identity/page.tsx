'use client';

import { useState } from 'react';

export default function IdentityPage() {
  const [address, setAddress] = useState('');
  const [identity, setIdentity] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleLookup = async () => {
    setLoading(true);
    setIdentity(null);

    try {
      // Mock identity lookup
      const mockIdentity = {
        address,
        displayName: 'Demo User',
        legal: 'Demo Legal Name',
        web: 'https://example.com',
        twitter: '@demouser',
        email: 'demo@example.com',
        judgements: [{ registrar: 0, judgement: 'Reasonable' }]
      };

      setTimeout(() => {
        setIdentity(mockIdentity);
        setLoading(false);
      }, 1000);
    } catch (error: any) {
      alert(`Lookup failed: ${error.message}`);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Polkadot Identity Lookup</h1>

      <div className="max-w-2xl mx-auto space-y-6">
        <div className="border rounded-lg p-6">
          <label className="block text-sm font-semibold mb-2">
            Polkadot Address
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY"
            className="w-full p-3 border rounded mb-3"
          />
          <button
            onClick={handleLookup}
            disabled={loading || !address}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Looking up...' : 'Lookup Identity'}
          </button>
        </div>

        {identity && (
          <div className="border rounded-lg p-6 bg-white">
            <h3 className="text-xl font-bold mb-4">Identity Information</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Display Name</p>
                <p className="font-semibold">{identity.displayName || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Legal Name</p>
                <p className="font-semibold">{identity.legal || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Website</p>
                <p className="font-semibold">{identity.web || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Twitter</p>
                <p className="font-semibold">{identity.twitter || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold">{identity.email || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Judgements</p>
                <p className="font-semibold">
                  {identity.judgements?.length || 0} judgement(s)
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
