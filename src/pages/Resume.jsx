import React, { useState, useEffect } from 'react';
import { Download, Printer, ExternalLink, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { dataProvider } from '../lib/dataProvider';
import { showToast } from '../components/ui/Toast';

export function Resume() {
  const [profile, setProfile] = useState(null);
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    Promise.all([
      dataProvider.getProfile(),
      dataProvider.getExperience(),
      dataProvider.getSkills()
    ]).then(([p, e, s]) => {
      setProfile(p);
      setExperience(e);
      setSkills(s);
    });
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    showToast('Preparing PDF download dialog...');
    window.print();
  };

  return (
    <div className="container-narrow" style={{ paddingBottom: '7rem', paddingTop: '2rem' }}>
      {/* Action Header (Hidden in Print) */}
      <div
        className="no-print"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '2.5rem',
          paddingBottom: '1.5rem',
          borderBottom: '1px solid var(--border-subtle)'
        }}
      >
        <div>
          <span className="badge" style={{ marginBottom: '0.5rem' }}>
            CURRICULUM VITAE
          </span>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Official Resume</h1>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={handlePrint} className="btn btn-secondary btn-sm">
            <Printer size={16} />
            <span>Print</span>
          </button>
          <button onClick={handleDownload} className="btn btn-primary btn-sm">
            <Download size={16} />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Resume Document Sheet */}
      <div
        className="glass-card"
        style={{
          padding: '3rem',
          backgroundColor: 'var(--bg-secondary)',
          display: 'flex',
          flexDirection: 'column',
          gap: '2.5rem'
        }}
      >
        {/* Header Section */}
        <div style={{ borderBottom: '2px solid var(--accent-primary)', paddingBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
            {profile?.name || 'Jerry Vance'}
          </h1>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--accent-primary)', marginTop: '0.25rem' }}>
            {profile?.title || 'Staff Full-Stack Architect & Digital Product Designer'}
          </h2>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.5rem',
              marginTop: '1.25rem',
              fontSize: '0.875rem',
              color: 'var(--text-muted)'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Mail size={14} /> {profile?.email || 'jerry@vancecraft.io'}
            </span>
            {profile?.phone && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Phone size={14} /> {profile.phone}
              </span>
            )}
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <MapPin size={14} /> {profile?.location || 'San Francisco, CA'}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Globe size={14} /> www.jerrydev.io
            </span>
          </div>
        </div>

        {/* Executive Summary */}
        <section>
          <h3
            style={{
              fontSize: '1.1rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--accent-primary)',
              marginBottom: '0.75rem'
            }}
          >
            Executive Summary
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.975rem', lineHeight: 1.7 }}>
            {profile?.bio ||
              'Distinguished software engineer with 6+ years designing and implementing scalable distributed architectures, enterprise design systems, and consumer-facing web applications. Proven track record collaborating with early-stage venture founders and global brands to ship resilient cloud systems.'}
          </p>
        </section>

        {/* Professional Experience */}
        <section>
          <h3
            style={{
              fontSize: '1.1rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--accent-primary)',
              marginBottom: '1.5rem'
            }}
          >
            Professional Experience
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {experience.map((item, idx) => (
              <div key={item.id || idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {item.role} — <span style={{ color: 'var(--accent-primary)' }}>{item.company}</span>
                  </h4>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    {item.start_date} – {item.end_date} | {item.location}
                  </span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.65, marginTop: '0.5rem' }}>
                  {item.description}
                </p>
                {item.technologies && item.technologies.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.5rem' }}>
                    {item.technologies.map((t, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: '0.75rem',
                          background: 'var(--bg-tertiary)',
                          padding: '0.15rem 0.5rem',
                          borderRadius: 'var(--radius-sm)',
                          color: 'var(--text-muted)'
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Core Competencies & Skills */}
        <section>
          <h3
            style={{
              fontSize: '1.1rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--accent-primary)',
              marginBottom: '1rem'
            }}
          >
            Core Technical Proficiencies
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            {skills.map((s, idx) => (
              <span
                key={s.id || idx}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-tertiary)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                {s.name} ({s.proficiency}%)
              </span>
            ))}
          </div>
        </section>

        {/* Education & Credentials */}
        <section>
          <h3
            style={{
              fontSize: '1.1rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--accent-primary)',
              marginBottom: '1rem'
            }}
          >
            Education & Certifications
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                  Bachelor of Science in Computer Science & Human-Computer Interaction
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>University of California, Berkeley</span>
              </div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Graduated with Honors</span>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                  AWS Certified Solutions Architect – Associate
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Amazon Web Services</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
