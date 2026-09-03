import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  ArrowDown,
  Download,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';
import { dataProvider } from '../lib/dataProvider';
import { ProjectCard } from '../components/ui/ProjectCard';
import { ServiceCard } from '../components/ui/ServiceCard';
import { SkillCard } from '../components/ui/SkillCard';
import { BlogCard } from '../components/ui/BlogCard';
import { ProjectSkeleton } from '../components/ui/Skeleton';

export function Home() {
  const [profile, setProfile] = useState(null);
  const [settings, setSettings] = useState(null);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [skills, setSkills] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [prof, sett, projs, servs, sks, posts] = await Promise.all([
          dataProvider.getProfile(),
          dataProvider.getSettings(),
          dataProvider.getProjects(false),
          dataProvider.getServices(false),
          dataProvider.getSkills(),
          dataProvider.getBlogPosts(false)
        ]);

        setProfile(prof);
        setSettings(sett);
        setFeaturedProjects(projs.filter((p) => p.is_featured).slice(0, 3));
        setServices(servs.slice(0, 3));
        setSkills(sks.slice(0, 6));
        setLatestPosts(posts.slice(0, 3));
      } catch (err) {
        console.error('Error loading home data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
      {/* 1. HERO SECTION */}
      <section
        style={{
          position: 'relative',
          minHeight: 'calc(85vh - 76px)',
          display: 'flex',
          alignItems: 'center',
          paddingTop: '2rem',
          paddingBottom: '3rem',
          overflow: 'hidden'
        }}
      >
        {/* Subtle Ambient Background Glows */}
        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '400px',
            background: 'radial-gradient(circle, var(--glow-primary) 0%, rgba(0,0,0,0) 70%)',
            filter: 'blur(70px)',
            zIndex: -1,
            pointerEvents: 'none'
          }}
        />

        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '4rem',
              alignItems: 'center'
            }}
          >
            {/* Left Content */}
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Availability Indicator */}
              <div>
                <div className="badge">
                  <span className="badge-status-dot" />
                  <span>{profile?.availability_text || 'Available for freelance projects & contracts'}</span>
                </div>
              </div>

              {/* Small Greeting */}
              <span
                style={{
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-primary)'
                }}
              >
                HELLO, I'M {profile?.name?.toUpperCase() || 'JERRY VANCE'}
              </span>

              {/* Large Headline */}
              <h1
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1
                }}
              >
                Building digital experiences that <span className="gradient-text">make an impact.</span>
              </h1>

              {/* Supporting Text */}
              <p
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '1.15rem',
                  lineHeight: 1.65,
                  maxWidth: '560px'
                }}
              >
                {profile?.bio ||
                  'I am a senior full-stack developer and digital product architect focused on building high-performance, accessible, and scalable digital products.'}
              </p>

              {/* Hero Action Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', paddingTop: '0.5rem' }}>
                <Link to="/projects" className="btn btn-primary btn-lg">
                  <span>View My Work</span>
                  <ArrowUpRight size={18} />
                </Link>

                <Link to="/contact" className="btn btn-secondary btn-lg">
                  <Mail size={18} />
                  <span>Let's Talk</span>
                </Link>

                <Link to="/resume" className="btn btn-outline btn-lg">
                  <Download size={18} />
                  <span>Resume</span>
                </Link>
              </div>

              {/* Social Links & Trust */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border-subtle)'
                }}
              >
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  CONNECT:
                </span>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  {settings?.github_url && (
                    <a
                      href={settings.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="theme-toggle"
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: 'var(--bg-tertiary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      <Github size={17} />
                    </a>
                  )}
                  {settings?.linkedin_url && (
                    <a
                      href={settings.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="theme-toggle"
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: 'var(--bg-tertiary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      <Linkedin size={17} />
                    </a>
                  )}
                  {settings?.twitter_url && (
                    <a
                      href={settings.twitter_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="theme-toggle"
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: 'var(--bg-tertiary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      <Twitter size={17} />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Right Profile Portrait Presentation */}
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '440px',
                  aspectRatio: '1/1',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  border: '1px solid var(--card-border)',
                  boxShadow: 'var(--shadow-lg)'
                }}
              >
                <img
                  src={
                    profile?.avatar_url ||
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
                  }
                  alt={profile?.name || 'Jerry Vance'}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />

                {/* Floating Glassmorphism Metric Card */}
                <div
                  className="glass-card animate-fade-in"
                  style={{
                    position: 'absolute',
                    bottom: '1.25rem',
                    left: '1.25rem',
                    right: '1.25rem',
                    padding: '1rem 1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backdropFilter: 'blur(16px)',
                    background: 'rgba(15, 23, 42, 0.85)',
                    border: '1px solid rgba(255, 255, 255, 0.15)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: 'var(--accent-gradient-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--accent-primary)'
                      }}
                    >
                      <Sparkles size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Specialization</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff' }}>
                        Architect & Full-Stack
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Experience</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-primary)' }}>
                      {profile?.years_experience || 6}+ Years
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS BANNER */}
      <section className="container">
        <div
          className="glass-card"
          style={{
            padding: '2.5rem 2rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            textAlign: 'center'
          }}
        >
          <div>
            <div style={{ fontSize: '2.8rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }} className="gradient-text">
              {profile?.completed_projects || 58}+
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: 500, marginTop: '0.25rem' }}>
              Projects Delivered
            </div>
          </div>
          <div>
            <div style={{ fontSize: '2.8rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }} className="gradient-text">
              {profile?.years_experience || 6}+
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: 500, marginTop: '0.25rem' }}>
              Years Engineering
            </div>
          </div>
          <div>
            <div style={{ fontSize: '2.8rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }} className="gradient-text">
              {profile?.happy_clients || 42}+
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: 500, marginTop: '0.25rem' }}>
              Enterprise & Startup Clients
            </div>
          </div>
          <div>
            <div style={{ fontSize: '2.8rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }} className="gradient-text">
              99.9%
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: 500, marginTop: '0.25rem' }}>
              Code Quality & Uptime
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROJECTS SECTION */}
      <section className="container">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}
        >
          <div>
            <span className="badge" style={{ marginBottom: '0.75rem' }}>
              SELECTED WORKS
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 800 }}>
              Featured Case Studies
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginTop: '0.5rem', maxWidth: '580px' }}>
              Deep dive into selected architectures, challenges, and measurable results engineered for enterprise clients.
            </p>
          </div>

          <Link to="/projects" className="btn btn-outline" style={{ gap: '0.5rem' }}>
            <span>Explore All Projects</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            <ProjectSkeleton />
            <ProjectSkeleton />
            <ProjectSkeleton />
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} featured />
            ))}
          </div>
        )}
      </section>

      {/* 4. SERVICES OVERVIEW */}
      <section style={{ background: 'var(--bg-secondary)', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem' }}>
            <span className="badge" style={{ marginBottom: '0.75rem' }}>
              WHAT I OFFER
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 800 }}>
              High-Impact Capabilities
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginTop: '0.5rem' }}>
              From distributed cloud systems to award-winning interfaces, I provide full-spectrum engineering for ambitious teams.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/services" className="btn btn-secondary">
              <span>View All Services & Pricing</span>
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. SKILLS PREVIEW */}
      <section className="container">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}
        >
          <div>
            <span className="badge" style={{ marginBottom: '0.75rem' }}>
              TECH STACK
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 800 }}>
              Technical Expertise
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginTop: '0.5rem', maxWidth: '580px' }}>
              Modern standards, battle-tested libraries, and architectural precision across the entire stack.
            </p>
          </div>

          <Link to="/skills" className="btn btn-outline" style={{ gap: '0.5rem' }}>
            <span>Explore All Skills</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {skills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      </section>

      {/* 6. LATEST BLOG POSTS */}
      <section className="container">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}
        >
          <div>
            <span className="badge" style={{ marginBottom: '0.75rem' }}>
              THOUGHT LEADERSHIP
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 800 }}>
              Latest Articles & Insights
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginTop: '0.5rem', maxWidth: '580px' }}>
              Writings on modern system architecture, frontend performance, Supabase workflows, and design systems.
            </p>
          </div>

          <Link to="/blog" className="btn btn-outline" style={{ gap: '0.5rem' }}>
            <span>View All Articles</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {latestPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* 7. HIGH IMPACT CTA BANNER */}
      <section className="container">
        <div
          className="glass-card"
          style={{
            position: 'relative',
            overflow: 'hidden',
            padding: '4rem 2rem',
            textAlign: 'center',
            background: 'var(--accent-gradient-subtle)',
            border: '1px solid var(--card-hover-border)'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '500px',
              height: '300px',
              background: 'radial-gradient(circle, var(--glow-primary) 0%, rgba(0,0,0,0) 70%)',
              filter: 'blur(60px)',
              pointerEvents: 'none',
              zIndex: 0
            }}
          />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '650px', margin: '0 auto' }}>
            <span className="badge" style={{ marginBottom: '1rem' }}>
              LET'S COLLABORATE
            </span>
            <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '1rem' }}>
              Have a visionary project in mind? Let’s make it reality.
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              Whether you need senior architectural leadership, a complete product build, or a performance overhaul, I am ready to help.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <Link to="/contact" className="btn btn-primary btn-lg">
                <span>Start a Conversation</span>
                <ArrowUpRight size={18} />
              </Link>
              <Link to="/resume" className="btn btn-secondary btn-lg">
                <span>Review Resume</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
