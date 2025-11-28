const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function verifyText(text: string, userId?: string) {
  const response = await fetch(`${API_URL}/verify/text`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, userId })
  });
  
  if (!response.ok) {
    throw new Error('Verification failed');
  }
  
  return response.json();
}

export async function verifyImage(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch(`${API_URL}/verify/image`, {
    method: 'POST',
    body: formData
  });
  
  if (!response.ok) {
    throw new Error('Image verification failed');
  }
  
  return response.json();
}

export async function verifyVideo(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch(`${API_URL}/verify/video`, {
    method: 'POST',
    body: formData
  });
  
  if (!response.ok) {
    throw new Error('Video verification failed');
  }
  
  return response.json();
}

export async function publishAsset(asset: any, userId?: string) {
  const response = await fetch(`${API_URL}/publish`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ asset, userId })
  });
  
  if (!response.ok) {
    throw new Error('Publish failed');
  }
  
  return response.json();
}

export async function queryAsset(ual: string) {
  const response = await fetch(`${API_URL}/publish/${ual}`);
  
  if (!response.ok) {
    throw new Error('Query failed');
  }
  
  return response.json();
}
