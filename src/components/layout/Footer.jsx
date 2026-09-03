import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Instagram, Mail, ArrowUpRight } from 'lucide-react';

export function Footer({ siteSettings, profile }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-subtle)',
        background: 'var(--bg-secondary)',
        paddingTop: '4.5rem',
        paddingBottom: '3rem',
        marginTop: '6rem'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem'
          }}
        >
          {/* Col 1: Bio */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <Link
              to="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                fontWeight: 800,
                fontSize: '1.35rem',
                fontFamily: 'var(--font-heading)'
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--accent-gradient)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: 800
                }}
              >
                {siteSettings?.logo_text?.charAt(0) || 'J'}
              </div>
              <span>{siteSettings?.logo_text || 'JERRY VANCE'}</span>
            </Link>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: '320px' }}>
              {profile?.bio || 'Building scalable web architectures, design systems, and resilient digital products for forward-thinking enterprises.'}
            </p>

            <div style={{ display: 'flex', gap: '0.85rem', marginTop: '0.5rem' }}>
              {siteSettings?.github_url && (
                <a
                  href={siteSettings.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="theme-toggle"
                  title="GitHub"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'var(--bg-tertiary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-secondary)'
                  }}
                >
                  <Github size={18} />
                </a>
              )}
              {siteSettings?.linkedin_url && (
                <a
                  href={siteSettings.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'var(--bg-tertiary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-secondary)'
                  }}
                >
                  <Linkedin size={18} />
                </a>
              )}
              {siteSettings?.twitter_url && (
                <a
                  href={siteSettings.twitter_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Twitter/X"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'var(--bg-tertiary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-secondary)'
                  }}
                >
                  <Twitter size={18} />
                </a>
              )}
              {siteSettings?.instagram_url && (
                <a
                  href={siteSettings.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Instagram"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'var(--bg-tertiary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-secondary)'
                  }}
                >
                  <Instagram size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem' }}>
              Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <li>
                <Link to="/" style={{ color: 'var(--text-secondary)' }}>Home</Link>
              </li>
              <li>
                <Link to="/about" style={{ color: 'var(--text-secondary)' }}>About</Link>
              </li>
              <li>
                <Link to="/projects" style={{ color: 'var(--text-secondary)' }}>Projects</Link>
              </li>
              <li>
                <Link to="/services" style={{ color: 'var(--text-secondary)' }}>Services</Link>
              </li>
              <li>
                <Link to="/experience" style={{ color: 'var(--text-secondary)' }}>Experience</Link>
              </li>
              <li>
                <Link to="/blog" style={{ color: 'var(--text-secondary)' }}>Blog Articles</Link>
              </li>
              <li>
                <Link to="/resume" style={{ color: 'var(--text-secondary)' }}>Resume / CV</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem' }}>
              Specialties
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <li>Full-Stack React Architecture</li>
              <li>PostgreSQL & Supabase Backends</li>
              <li>Design Systems & Headless UI</li>
              <li>High-Throughput Web Applications</li>
              <li>Performance & Core Web Vitals</li>
              <li>API Development & Integrations</li>
            </ul>
          </div>

          {/* Col 4: Direct Inquiries */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem' }}>
              Let's Connect
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem' }}>
              Have an upcoming project or looking for architectural consulting? Send a note:
            </p>
            <a
              href={`mailto:${siteSettings?.contact_email || 'jerry@vancecraft.io'}`}
              className="btn btn-outline btn-sm"
              style={{ width: '100%', justifyContent: 'flex-start', padding: '0.7rem 1rem' }}
            >
              <Mail size={16} />
              <span>{siteSettings?.contact_email || 'hello@jerrydev.io'}</span>
            </a>

            <div style={{ marginTop: '1.5rem' }}>
              <Link
                to="/admin/dashboard"
                style={{
                  fontSize: '0.78rem',
                  color: 'var(--text-muted)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <span>Access CMS Dashboard</span>
                <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>
        </div>

        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.85rem',
            color: 'var(--text-muted)'
          }}
        >
          <p>{siteSettings?.footer_text || `© ${currentYear} Jerry Vance. All rights reserved.`}</p>
          <p>Engineered with React, Node, Supabase & Modern CSS</p>
        </div>
      </div>
    </footer>
  );
}
