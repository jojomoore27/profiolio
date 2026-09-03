import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export function NotFound() {
  return (
    <div
      className="container"
      style={{
        minHeight: 'calc(75vh - 76px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '3rem 1.5rem'
      }}
    >
      <div className="glass-card" style={{ maxWidth: '540px', padding: '3.5rem 2.5rem' }}>
        <span
          className="gradient-text"
          style={{ fontSize: '6rem', fontWeight: 800, fontFamily: 'var(--font-heading)', lineHeight: 1 }}
        >
          404
        </span>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '1rem 0 0.5rem' }}>
          Page Not Located
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem' }}>
          The requested route, case study, or resource does not exist or has been relocated to another slug.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-primary">
            <Home size={18} />
            <span>Return to Home</span>
          </Link>
          <Link to="/projects" className="btn btn-secondary">
            <ArrowLeft size={18} />
            <span>Browse Works</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
