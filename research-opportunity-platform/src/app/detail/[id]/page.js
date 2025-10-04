import { Suspense } from 'react';
import DetailContent from './DetailContent';

export default function DetailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    }>
      <DetailContent />
    </Suspense>
  );
}