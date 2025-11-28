'use client';

interface JsonldViewerProps {
  data: any;
}

export default function JsonldViewer({ data }: JsonldViewerProps) {
  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <pre className="text-sm overflow-x-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
