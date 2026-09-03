import React from 'react';
import { Briefcase, MapPin, Calendar } from 'lucide-react';

export function ExperienceTimeline({ items }) {
  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {/* Central timeline line */}
      <div
        style={{
          position: 'absolute',
          top: '1.5rem',
          bottom: '1.5rem',
          left: '20px',
          width: '2px',
          background: 'linear-gradient(to bottom, var(--accent-primary), var(--border-prominent))',
          zIndex: 0
        }}
      />

      {items.map((item, idx) => (
        <div
          key={item.id || idx}
          className="animate-fade-in"
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1.75rem',
            zIndex: 1
          }}
        >
          {/* Node Icon */}
          <div
            style={{
              width: '42px',
              height: '42px',
              minWidth: '42px',
              borderRadius: '50%',
              background: item.is_current ? 'var(--accent-gradient)' : 'var(--bg-secondary)',
              border: '2px solid var(--accent-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: item.is_current ? '#ffffff' : 'var(--accent-primary)',
              boxShadow: item.is_current ? '0 0 15px var(--glow-primary)' : 'none'
            }}
          >
            <Briefcase size={18} />
          </div>

          {/* Card */}
          <div className="glass-card" style={{ padding: '1.75rem', flexGrow: 1 }}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                gap: '0.75rem',
                marginBottom: '0.5rem'
              }}
            >
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {item.role}
                </h3>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--accent-primary)', marginTop: '0.2rem' }}>
                  {item.company}
                </h4>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {item.location && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <MapPin size={14} />
                    <span>{item.location}</span>
                  </span>
                )}
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Calendar size={14} />
                  <span>{item.start_date} — {item.end_date}</span>
                </span>
              </div>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.65, marginTop: '0.75rem' }}>
              {item.description}
            </p>

            {item.technologies && item.technologies.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.25rem' }}>
                {item.technologies.map((tech, techIdx) => (
                  <span
                    key={techIdx}
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      padding: '0.25rem 0.65rem',
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--bg-tertiary)',
                      color: 'var(--text-secondary)',
                      border: '1px solid var(--border-subtle)'
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
