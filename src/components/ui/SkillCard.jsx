import React from 'react';

export function SkillCard({ skill }) {
  return (
    <div
      className="glass-card"
      style={{
        padding: '1.25rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <span style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)' }}>
            {skill.name}
          </span>
          <span
            style={{
              fontSize: '0.7rem',
              padding: '0.2rem 0.5rem',
              borderRadius: 'var(--radius-full)',
              background: 'var(--bg-tertiary)',
              color: 'var(--text-muted)'
            }}
          >
            {skill.category}
          </span>
        </div>
        <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>
          {skill.proficiency}%
        </span>
      </div>

      <div
        style={{
          width: '100%',
          height: '7px',
          borderRadius: 'var(--radius-full)',
          background: 'var(--bg-tertiary)',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            width: `${skill.proficiency}%`,
            height: '100%',
            borderRadius: 'var(--radius-full)',
            background: 'var(--accent-gradient)',
            transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        />
      </div>
    </div>
  );
}
