'use client';

import { useState } from 'react';
import { publishAsset } from '@/lib/api';

export default function PublishPage() {
  const [jsonInput, setJsonInput] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handlePublish = async () => {
    setLoading(true);
    setResult(null);

    try {
      const asset = JSON.parse(jsonInput);
      const publishResult = await publishAsset(asset);
      setResult(publishResult);
    } catch (error: any) {
      alert(`Publish failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Publish Knowledge Asset</h1>

      <div className="max-w-4xl mx-auto space-y-6">
        <div className="border rounded-lg p-6">
          <label className="block text-sm font-semibold mb-2">
            JSON-LD Knowledge Asset
          </label>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='{"@context": {...}, "@type": "...", ...}'
            className="w-full h-64 p-3 border rounded font-mono text-sm"
          />
          <button
            onClick={handlePublish}
            disabled={loading}
            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Publishing...' : 'Publish to DKG'}
          </button>
        </div>

        {result && (
          <div className="border rounded-lg p-6 bg-green-50">
            <h3 className="text-xl font-bold mb-4">Published Successfully</h3>
            <div className="space-y-2 text-sm">
              <p><strong>UAL:</strong> {result.UAL}</p>
              <p><strong>Assertion ID:</strong> {result.publicAssertionId}</p>
              <p><strong>Timestamp:</strong> {result.timestamp}</p>
            </div>
            <a
              href={`/asset/${encodeURIComponent(result.UAL)}`}
              className="inline-block mt-4 text-blue-600 hover:underline"
            >
              View Asset →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
