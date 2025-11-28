'use client';

import { useState } from 'react';

interface UploadInputProps {
  onUpload: (content: string | File, type: 'text' | 'image' | 'video') => void;
}

export default function UploadInput({ onUpload }: UploadInputProps) {
  const [activeTab, setActiveTab] = useState<'text' | 'image' | 'video'>('text');
  const [text, setText] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file, activeTab as 'image' | 'video');
    }
  };

  const handleTextSubmit = () => {
    if (text.trim()) {
      onUpload(text, 'text');
    }
  };

  return (
    <div className="border rounded-lg p-6">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab('text')}
          className={`px-4 py-2 rounded ${activeTab === 'text' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
        >
          Text
        </button>
        <button
          onClick={() => setActiveTab('image')}
          className={`px-4 py-2 rounded ${activeTab === 'image' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
        >
          Image
        </button>
        <button
          onClick={() => setActiveTab('video')}
          className={`px-4 py-2 rounded ${activeTab === 'video' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
        >
          Video
        </button>
      </div>

      {activeTab === 'text' && (
        <div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to verify..."
            className="w-full h-32 p-3 border rounded mb-3"
          />
          <button
            onClick={handleTextSubmit}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Verify Text
          </button>
        </div>
      )}

      {(activeTab === 'image' || activeTab === 'video') && (
        <div>
          <input
            type="file"
            accept={activeTab === 'image' ? 'image/*' : 'video/*'}
            onChange={handleFileChange}
            className="w-full p-3 border rounded"
          />
        </div>
      )}
    </div>
  );
}
