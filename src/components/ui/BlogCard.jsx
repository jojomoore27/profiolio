import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export function BlogCard({ post }) {
  return (
    <article
      className="glass-card glass-card-interactive"
      style={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '16/9', backgroundColor: 'var(--bg-tertiary)' }}>
        <img
          src={post.featured_image}
          alt={post.title}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />
        <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
          <span className="badge" style={{ backdropFilter: 'blur(8px)', background: 'rgba(9, 13, 22, 0.75)' }}>
            {post.category}
          </span>
        </div>
      </div>

      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1, gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Calendar size={14} />
            <span>{post.published_at || 'Recent'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Clock size={14} />
            <span>{post.read_time || '5 min read'}</span>
          </div>
        </div>

        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, lineHeight: 1.35 }}>
          <Link
            to={`/blog/${post.slug}`}
            style={{ color: 'var(--text-primary)', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
          >
            {post.title}
          </Link>
        </h3>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, flexGrow: 1 }}>
          {post.excerpt}
        </p>

        <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
          <Link
            to={`/blog/${post.slug}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--accent-primary)'
            }}
          >
            <span>Read Article</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
