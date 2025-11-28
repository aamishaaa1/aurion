'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { queryAsset } from '@/lib/api';

export default function AssetPage() {
  const params = useParams();
  const [asset, setAsset] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const ual = decodeURIComponent(params.id as string);
        const result = await queryAsset(ual);
        setAsset(result);
      } catch (error: any) {
        alert(`Failed to load asset: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAsset();
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4">Loading asset...</p>
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold">Asset not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Knowledge Asset</h1>

      <div className="max-w-4xl mx-auto space-y-6">
        <div className="border rounded-lg p-6 bg-white">
          <h3 className="text-xl font-bold mb-4">Asset Data</h3>
          <pre className="bg-gray-50 p-4 rounded overflow-x-auto text-sm">
            {JSON.stringify(asset.assertion, null, 2)}
          </pre>
        </div>

        <div className="border rounded-lg p-6 bg-white">
          <h3 className="text-xl font-bold mb-4">Metadata</h3>
          <div className="space-y-2 text-sm">
            <p><strong>UAL:</strong> {asset.UAL}</p>
            <p><strong>Timestamp:</strong> {asset.timestamp}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
