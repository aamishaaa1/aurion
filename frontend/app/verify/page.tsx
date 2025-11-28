'use client';

import { useState } from 'react';
import UploadInput from '@/components/UploadInput';
import VerificationResult from '@/components/VerificationResult';
import { verifyText, verifyImage, verifyVideo, publishAsset } from '@/lib/api';

export default function VerifyPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [published, setPublished] = useState<any>(null);

  const handleUpload = async (content: string | File, type: 'text' | 'image' | 'video') => {
    setLoading(true);
    setResult(null);
    setPublished(null);

    try {
      let verificationResult;

      if (type === 'text') {
        verificationResult = await verifyText(content as string);
      } else if (type === 'image') {
        verificationResult = await verifyImage(content as File);
      } else {
        verificationResult = await verifyVideo(content as File);
      }

      setResult(verificationResult);
    } catch (error: any) {
      alert(`Verification failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    if (!result?.knowledgeAsset) return;

    setLoading(true);
    try {
      const publishResult = await publishAsset(result.knowledgeAsset);
      setPublished(publishResult);
      alert(`Published! UAL: ${publishResult.UAL}`);
    } catch (error: any) {
      alert(`Publish failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Verify Content</h1>

      <div className="max-w-4xl mx-auto space-y-8">
        <UploadInput onUpload={handleUpload} />

        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Analyzing with multi-agent consensus...</p>
          </div>
        )}

        {result && !loading && (
          <>
            <VerificationResult result={result} />

            <div className="flex gap-4">
              <button
                onClick={handlePublish}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
              >
                Publish to DKG
              </button>
            </div>

            {published && (
              <div className="border rounded-lg p-6 bg-green-50">
                <h3 className="text-xl font-bold mb-2">Published Successfully</h3>
                <p className="text-sm text-gray-700">UAL: {published.UAL}</p>
                <a
                  href={`/asset/${encodeURIComponent(published.UAL)}`}
                  className="text-blue-600 hover:underline"
                >
                  View Asset →
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
