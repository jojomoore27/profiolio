import React, { useState, useEffect, useMemo } from 'react';
import { Sparkles, Terminal, Database, Server, Layers } from 'lucide-react';
import { dataProvider } from '../lib/dataProvider';
import { SkillCard } from '../components/ui/SkillCard';

export function Skills() {
  const [skills, setSkills] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    dataProvider.getSkills().then(setSkills);
  }, []);

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'Tools & DevOps'];

  const filteredSkills = useMemo(() => {
    if (activeCategory === 'All') return skills;
    return skills.filter((s) => s.category.toLowerCase() === activeCategory.toLowerCase());
  }, [skills, activeCategory]);

  return (
    <div className="container" style={{ paddingBottom: '7rem' }}>
      {/* Header */}
      <section style={{ padding: '3rem 0 2rem', maxWidth: '780px' }}>
        <span className="badge" style={{ marginBottom: '1rem' }}>
          TECHNICAL CAPABILITIES
        </span>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: 800, lineHeight: 1.15 }}>
          Skills, Tools & <span className="gradient-text">Core Competencies.</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.65, marginTop: '1rem' }}>
          Visualizing proficiencies across client-side frameworks, serverless and distributed backends, relational schema designs, and continuous deployment pipelines.
        </p>
      </section>

      {/* Category Pills */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.65rem',
          paddingBottom: '2.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          marginBottom: '3rem'
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '0.55rem 1.25rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer',
              border: '1px solid',
              borderColor: activeCategory === cat ? 'var(--accent-primary)' : 'var(--border-prominent)',
              background: activeCategory === cat ? 'var(--accent-gradient-subtle)' : 'var(--bg-secondary)',
              color: activeCategory === cat ? 'var(--accent-primary)' : 'var(--text-secondary)',
              transition: 'all 0.2s ease'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem'
        }}
      >
        {filteredSkills.map((skill) => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>

      {/* Philosophy Callout */}
      <div
        className="glass-card"
        style={{
          marginTop: '5rem',
          padding: '2.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '2rem'
        }}
      >
        <div style={{ maxWidth: '600px' }}>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Continuous Architectural Evolution
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
            Technologies evolve quickly, but fundamental systems engineering principles endure. I continually test emerging frameworks against strict latency, type-safety, and maintainability benchmarks before deploying to production.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <span className="badge" style={{ padding: '0.5rem 1rem' }}>Strict TypeScript</span>
          <span className="badge" style={{ padding: '0.5rem 1rem' }}>Postgres RLS</span>
          <span className="badge" style={{ padding: '0.5rem 1rem' }}>Edge Ready</span>
        </div>
      </div>
    </div>
  );
}
