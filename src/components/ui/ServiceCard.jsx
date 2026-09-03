import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { Check, ArrowRight } from 'lucide-react';

export function ServiceCard({ service }) {
  const IconComponent = Icons[service.icon] || Icons.Code;

  return (
    <div
      className="glass-card glass-card-interactive"
      style={{
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative'
      }}
    >
      <div
        style={{
          width: '54px',
          height: '54px',
          borderRadius: 'var(--radius-md)',
          background: 'var(--accent-gradient-subtle)',
          border: '1px solid var(--card-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--accent-primary)',
          marginBottom: '1.5rem'
        }}
      >
        <IconComponent size={28} />
      </div>

      <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.75rem' }}>
        {service.title}
      </h3>

      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
        {service.description}
      </p>

      {service.features && service.features.length > 0 && (
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem', flexGrow: 1 }}>
          {service.features.map((feature, idx) => (
            <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              <span style={{ color: 'var(--accent-primary)', marginTop: '2px' }}>
                <Check size={16} />
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}

      <div
        style={{
          paddingTop: '1.25rem',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {service.price ? (
          <div>
            <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Investment
            </span>
            <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {service.price}
            </span>
          </div>
        ) : <div />}

        <Link
          to="/contact"
          state={{ serviceTitle: service.title }}
          className="btn btn-outline btn-sm"
          style={{ gap: '0.4rem' }}
        >
          <span>Inquire</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
