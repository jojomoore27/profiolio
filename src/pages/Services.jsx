import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Headphones } from 'lucide-react';
import { dataProvider } from '../lib/dataProvider';
import { ServiceCard } from '../components/ui/ServiceCard';

export function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    dataProvider.getServices(false).then(setServices);
  }, []);

  return (
    <div className="container" style={{ paddingBottom: '7rem' }}>
      {/* Page Header */}
      <section style={{ padding: '3rem 0 2rem', maxWidth: '780px' }}>
        <span className="badge" style={{ marginBottom: '1rem' }}>
          SPECIALIZED SERVICES
        </span>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: 800, lineHeight: 1.15 }}>
          Engineering Solutions Tailored for <span className="gradient-text">Speed & Scale.</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.65, marginTop: '1rem' }}>
          From initial MVP architecture to high-concurrency production deployments, I deliver end-to-end technical excellence with transparent pricing and zero compromise on code quality.
        </p>
      </section>

      {/* Services Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '2.25rem',
          margin: '2rem 0 5rem'
        }}
      >
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      {/* Guarantees & Work Standard */}
      <section
        className="glass-card"
        style={{
          padding: '3.5rem 2.5rem',
          background: 'var(--accent-gradient-subtle)',
          border: '1px solid var(--card-hover-border)'
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            Why Clients Rely On My Engineering
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
            Standard practices baked into every contract, audit, and platform build.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ color: 'var(--accent-primary)' }}><Zap size={28} /></div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Lightning Delivery</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Rapid sprint iterations with clean, documented PRs and continuous staging environment deployments.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ color: 'var(--accent-primary)' }}><ShieldCheck size={28} /></div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Zero-Trust Security</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Strict database row-level security (RLS), parameterized queries, and hardened environment isolation.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ color: 'var(--accent-primary)' }}><Headphones size={28} /></div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Dedicated Support</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Post-launch warranty periods, proactive performance monitoring, and team handover sessions.
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <Link to="/contact" className="btn btn-primary btn-lg">
            <span>Request a Custom Quote</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
