import React from 'react';
import { cn } from '../../utils/cn';

interface LoadingStateProps {
  type: 'card' | 'list' | 'text' | 'image';
  count?: number;
}

const LoadingState: React.FC<LoadingStateProps> = ({ type, count = 1 }) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <div className="bg-zinc-900 p-6 rounded-lg">
            <div className="h-48 bg-zinc-800 animate-pulse rounded-lg mb-4" />
            <div className="space-y-2">
              <div className="h-4 bg-zinc-800 animate-pulse rounded w-3/4" />
              <div className="h-4 bg-zinc-800 animate-pulse rounded w-1/2" />
            </div>
          </div>
        );
      case 'list':
        return (
          <div className="space-y-4">
            {Array(count).fill(0).map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-zinc-800 animate-pulse rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-zinc-800 animate-pulse rounded w-3/4" />
                  <div className="h-4 bg-zinc-800 animate-pulse rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        );
      case 'text':
        return (
          <div className="space-y-2">
            {Array(count).fill(0).map((_, i) => (
              <div key={i} className="h-4 bg-zinc-800 animate-pulse rounded w-full" />
            ))}
          </div>
        );
      case 'image':
        return <div className="h-64 bg-zinc-800 animate-pulse rounded" />;
      default:
        return <div className="h-4 bg-zinc-800 animate-pulse rounded w-full" />;
    }
  };

  return (
    <div className={cn(
      'animate-pulse',
      type === 'card' && 'grid gap-6 md:grid-cols-2 lg:grid-cols-3'
    )}>
      {Array(type === 'card' ? count : 1).fill(0).map((_, i) => (
        <div key={i}>{renderSkeleton()}</div>
      ))}
    </div>
  );
};

export default LoadingState;