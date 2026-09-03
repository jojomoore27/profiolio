import React from 'react';

export function Skeleton({ width = '100%', height = '20px', borderRadius = 'var(--radius-sm)', style = {} }) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: 'var(--border-prominent)',
        opacity: 0.6,
        animation: 'skeleton-shimmer 1.6s infinite ease-in-out',
        ...style
      }}
    />
  );
}

export function ProjectSkeleton() {
  return (
    <div className="glass-card" style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Skeleton height="220px" borderRadius="var(--radius-md)" />
      <Skeleton width="40%" height="16px" />
      <Skeleton width="80%" height="24px" />
      <Skeleton width="100%" height="14px" />
      <Skeleton width="60%" height="14px" />
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
        <Skeleton width="60px" height="24px" borderRadius="var(--radius-full)" />
        <Skeleton width="70px" height="24px" borderRadius="var(--radius-full)" />
      </div>
    </div>
  );
}
