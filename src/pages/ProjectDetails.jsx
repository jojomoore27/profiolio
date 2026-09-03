import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowUpRight,
  Github,
  ExternalLink,
  Calendar,
  Clock,
  User,
  Building,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Award
} from 'lucide-react';
import { dataProvider } from '../lib/dataProvider';
import { Skeleton } from '../components/ui/Skeleton';

export function ProjectDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      window.scrollTo(0, 0);
      try {
        const [curr, list] = await Promise.all([
          dataProvider.getProjectBySlug(slug),
          dataProvider.getProjects(false)
        ]);
        if (!curr) {
          navigate('/not-found', { replace: true });
          return;
        }
        setProject(curr);
        setAllProjects(list);
      } catch (err) {
        console.error('Error loading project details:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug, navigate]);

  if (loading || !project) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem' }}>
        <Skeleton height="36px" width="30%" />
        <Skeleton height="60px" width="80%" style={{ margin: '1rem 0' }} />
        <Skeleton height="450px" borderRadius="var(--radius-lg)" />
      </div>
    );
  }

  // Calculate Previous and Next Projects
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];

  return (
    <article className="container-narrow" style={{ paddingBottom: '7rem', paddingTop: '2rem' }}>
      {/* Back to archive link */}
      <div style={{ marginBottom: '2rem' }}>
        <Link
          to="/projects"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: 'var(--text-muted)',
            fontSize: '0.9rem',
            fontWeight: 500
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          <ArrowLeft size={16} />
          <span>Back to all projects</span>
        </Link>
      </div>

      {/* Case Study Header */}
      <header style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
          <span className="badge">{project.category}</span>
          {project.year && <span className="badge">{project.year}</span>}
        </div>

        <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.15 }}>
          {project.title}
        </h1>

        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.65, marginTop: '1rem' }}>
          {project.short_description}
        </p>
      </header>

      {/* Key Metadata Table / Cards */}
      <div
        className="glass-card"
        style={{
          padding: '1.75rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2.5rem'
        }}
      >
        <div>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <Building size={14} /> Client
          </span>
          <span style={{ display: 'block', fontWeight: 700, fontSize: '1rem', marginTop: '0.35rem' }}>
            {project.client || 'Proprietary System'}
          </span>
        </div>

        <div>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <User size={14} /> Role
          </span>
          <span style={{ display: 'block', fontWeight: 700, fontSize: '1rem', marginTop: '0.35rem' }}>
            {project.role || 'Principal Architect'}
          </span>
        </div>

        <div>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <Clock size={14} /> Timeline
          </span>
          <span style={{ display: 'block', fontWeight: 700, fontSize: '1rem', marginTop: '0.35rem' }}>
            {project.duration || '3 Months'}
          </span>
        </div>

        <div>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <Calendar size={14} /> Year
          </span>
          <span style={{ display: 'block', fontWeight: 700, fontSize: '1rem', marginTop: '0.35rem' }}>
            {project.year || '2026'}
          </span>
        </div>
      </div>

      {/* Hero Image */}
      <div
        style={{
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          aspectRatio: '16/10',
          marginBottom: '3.5rem',
          border: '1px solid var(--card-border)',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        <img
          src={project.image_url}
          alt={project.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Action Buttons for Live & Github */}
      {(project.live_url || project.github_url) && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '3.5rem' }}>
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <ExternalLink size={16} />
              <span>Launch Live Project</span>
            </a>
          )}
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <Github size={16} />
              <span>Source Code Repository</span>
            </a>
          )}
        </div>
      )}

      {/* In-Depth Case Study Narrative */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        {/* Project Overview */}
        <section>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem' }}>
            Project Overview
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.75 }}>
            {project.description}
          </p>
        </section>

        {/* The Challenge */}
        {project.challenge && (
          <section className="glass-card" style={{ padding: '2rem', borderLeft: '4px solid var(--status-warning)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
              <AlertTriangle size={20} color="var(--status-warning)" />
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700 }}>The Technical Challenge</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7 }}>
              {project.challenge}
            </p>
          </section>
        )}

        {/* The Solution */}
        {project.solution && (
          <section className="glass-card" style={{ padding: '2rem', borderLeft: '4px solid var(--accent-primary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
              <Lightbulb size={20} color="var(--accent-primary)" />
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700 }}>The Architectural Solution</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7 }}>
              {project.solution}
            </p>
          </section>
        )}

        {/* Measurable Results */}
        {project.results && (
          <section className="glass-card" style={{ padding: '2rem', borderLeft: '4px solid var(--status-success)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
              <Award size={20} color="var(--status-success)" />
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700 }}>Commercial & Technical Results</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7 }}>
              {project.results}
            </p>
          </section>
        )}

        {/* Technology Stack Tags */}
        {project.technologies && project.technologies.length > 0 && (
          <section>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1rem' }}>
              Technologies & Frameworks
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  style={{
                    padding: '0.45rem 1rem',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-prominent)',
                    color: 'var(--text-primary)',
                    fontWeight: 600,
                    fontSize: '0.85rem'
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Gallery Images */}
        {project.gallery_images && project.gallery_images.length > 0 && (
          <section>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.25rem' }}>
              Interface & System Gallery
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {project.gallery_images.map((imgUrl, idx) => (
                <div
                  key={idx}
                  style={{
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    aspectRatio: '16/10',
                    border: '1px solid var(--card-border)'
                  }}
                >
                  <img
                    src={imgUrl}
                    alt={`${project.title} screenshot ${idx + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Prev / Next Project Navigation Bar */}
      <nav
        style={{
          marginTop: '5rem',
          paddingTop: '2.5rem',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '2rem'
        }}
      >
        {prevProject ? (
          <Link
            to={`/projects/${prevProject.slug}`}
            style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}
          >
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>← Previous Project</span>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{prevProject.title}</span>
          </Link>
        ) : <div />}

        {nextProject ? (
          <Link
            to={`/projects/${nextProject.slug}`}
            style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', textAlign: 'right' }}
          >
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Next Project →</span>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{nextProject.title}</span>
          </Link>
        ) : <div />}
      </nav>
    </article>
  );
}
