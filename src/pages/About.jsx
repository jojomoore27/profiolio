import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Award, Compass, Code2, Users, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { dataProvider } from '../lib/dataProvider';

export function About() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    dataProvider.getProfile().then(setProfile);
  }, []);

  const values = [
    {
      icon: Code2,
      title: 'Architectural Discipline',
      description: 'Clean code is not an afterthought. I construct systems with modular boundaries, thorough typing, and clear separation of concerns.'
    },
    {
      icon: Compass,
      title: 'Design-Driven Engineering',
      description: 'Engineering and aesthetics belong together. Every micro-interaction, transition curve, and pixel spacing is calibrated for maximum ergonomic delight.'
    },
    {
      icon: Users,
      title: 'Empathy for End-Users',
      description: 'Software should feel invisible. I focus on sub-100ms response times, accessibility for all human abilities, and intuitive UX flows.'
    },
    {
      icon: Award,
      title: 'Reliability & Business Impact',
      description: 'Great software solves real commercial problems. Every feature is evaluated by its ability to drive user retention, scalability, and revenue.'
    }
  ];

  return (
    <div className="container" style={{ paddingBottom: '6rem' }}>
      {/* Header Section */}
      <section style={{ padding: '3rem 0', maxWidth: '780px' }}>
        <span className="badge" style={{ marginBottom: '1rem' }}>
          ABOUT ME
        </span>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: 800, lineHeight: 1.15 }}>
          Engineering elegance at the intersection of <span className="gradient-text">design and scale.</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.7, marginTop: '1.5rem' }}>
          {profile?.bio ||
            'I am a senior full-stack developer and digital product architect focused on building high-performance, accessible, and scalable digital products.'}
        </p>
      </section>

      {/* Profile & Story Section */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '4rem',
          alignItems: 'center',
          padding: '3rem 0'
        }}
      >
        <div style={{ position: 'relative' }}>
          <div
            style={{
              aspectRatio: '4/5',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--card-border)'
            }}
          >
            <img
              src={
                profile?.avatar_url ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
              }
              alt={profile?.name || 'Jerry Vance'}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>
            Crafting scalable software with an editorial eye.
          </h2>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Over the past {profile?.years_experience || 6}+ years, I have collaborated with early-stage venture founders, high-growth startups, and established multinational enterprises to bring digital concepts to market.
          </p>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7 }}>
            My approach bridges the traditional gap between creative design agencies and hardcore backend systems engineers. When building with React, Next.js, and Supabase, I guarantee both pixel-level visual perfection and database-level security and speed.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
            <Link to="/contact" className="btn btn-primary">
              <span>Let's Work Together</span>
              <ArrowUpRight size={16} />
            </Link>
            <Link to="/resume" className="btn btn-outline">
              <span>Download Full CV</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Editable Statistics */}
      <section style={{ padding: '3rem 0' }}>
        <div
          className="glass-card"
          style={{
            padding: '3rem 2rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2.5rem',
            textAlign: 'center'
          }}
        >
          <div>
            <div className="gradient-text" style={{ fontSize: '3.2rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
              {profile?.completed_projects || 58}+
            </div>
            <div style={{ color: 'var(--text-primary)', fontWeight: 700, marginTop: '0.25rem' }}>
              Completed Projects
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Web applications, platforms & SaaS
            </div>
          </div>

          <div>
            <div className="gradient-text" style={{ fontSize: '3.2rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
              {profile?.years_experience || 6}+
            </div>
            <div style={{ color: 'var(--text-primary)', fontWeight: 700, marginTop: '0.25rem' }}>
              Years Experience
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Enterprise & startup engineering
            </div>
          </div>

          <div>
            <div className="gradient-text" style={{ fontSize: '3.2rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
              {profile?.happy_clients || 42}+
            </div>
            <div style={{ color: 'var(--text-primary)', fontWeight: 700, marginTop: '0.25rem' }}>
              Happy Clients
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Across North America & Europe
            </div>
          </div>

          <div>
            <div className="gradient-text" style={{ fontSize: '3.2rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
              15+
            </div>
            <div style={{ color: 'var(--text-primary)', fontWeight: 700, marginTop: '0.25rem' }}>
              Core Technologies
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              React, Supabase, Node & Clouds
            </div>
          </div>
        </div>
      </section>

      {/* Core Engineering Values */}
      <section style={{ padding: '3rem 0' }}>
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3.5rem' }}>
          <span className="badge" style={{ marginBottom: '0.75rem' }}>
            PRINCIPLES
          </span>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 800 }}>
            Guiding Philosophy
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div key={idx} className="glass-card" style={{ padding: '2rem' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--accent-gradient-subtle)',
                    color: 'var(--accent-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.25rem'
                  }}
                >
                  <Icon size={24} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                  {val.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.65 }}>
                  {val.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
