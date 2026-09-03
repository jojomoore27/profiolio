import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, ArrowUpRight, Download } from 'lucide-react';
import { dataProvider } from '../lib/dataProvider';
import { ExperienceTimeline } from '../components/ui/ExperienceTimeline';

export function Experience() {
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    dataProvider.getExperience().then(setExperience);
  }, []);

  return (
    <div className="container-narrow" style={{ paddingBottom: '7rem' }}>
      {/* Header */}
      <section style={{ padding: '3rem 0 2.5rem' }}>
        <span className="badge" style={{ marginBottom: '1rem' }}>
          CAREER TRACK
        </span>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: 800, lineHeight: 1.15 }}>
          Professional Journey & <span className="gradient-text">Milestones.</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.65, marginTop: '1rem' }}>
          A chronological retrospective of leadership roles, architectural initiatives, and high-impact engineering accomplishments.
        </p>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          <Link to="/resume" className="btn btn-primary btn-sm">
            <Download size={16} />
            <span>Download Official Resume</span>
          </Link>
          <Link to="/contact" className="btn btn-outline btn-sm">
            <span>Hire for Advisory / Contract</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      {/* Timeline Section */}
      <section style={{ marginTop: '2rem' }}>
        <ExperienceTimeline items={experience} />
      </section>
    </div>
  );
}
