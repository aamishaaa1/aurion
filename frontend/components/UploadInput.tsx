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

  const tabStyle = (isActive: boolean) => ({
    padding: '0.5rem 1.5rem',
    borderRadius: '0.375rem',
    border: 'none',
    cursor: 'pointer',
    background: isActive ? 'var(--primary)' : '#f3f4f6',
    color: isActive ? 'white' : '#374151',
    fontWeight: isActive ? '600' : '400',
    transition: 'all 0.2s'
  });

  return (
    <div className="card">
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button onClick={() => setActiveTab('text')} style={tabStyle(activeTab === 'text')}>
          Text
        </button>
        <button onClick={() => setActiveTab('image')} style={tabStyle(activeTab === 'image')}>
          Image
        </button>
        <button onClick={() => setActiveTab('video')} style={tabStyle(activeTab === 'video')}>
          Video
        </button>
      </div>

      {activeTab === 'text' && (
        <div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to verify for AI generation, factual accuracy, or manipulation..."
            style={{
              width: '100%',
              minHeight: '150px',
              padding: '0.75rem',
              border: '1px solid var(--border)',
              borderRadius: '0.375rem',
              marginBottom: '1rem',
              fontSize: '1rem',
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
          />
          <button
            onClick={handleTextSubmit}
            className="btn btn-primary"
            style={{ padding: '0.75rem 1.5rem' }}
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
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px dashed var(--border)',
              borderRadius: '0.375rem',
              cursor: 'pointer'
            }}
          />
          <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
            {activeTab === 'image'
              ? 'Deepfake detection, AI artifact analysis, manipulation markers'
              : 'Temporal consistency, face swap detection, audio-visual sync'}
          </p>
        </div>
      )}
    </div>
  );
}
