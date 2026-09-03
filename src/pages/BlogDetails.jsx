import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  Twitter,
  Linkedin,
  Copy,
  Check,
  ArrowRight
} from 'lucide-react';
import { dataProvider } from '../lib/dataProvider';
import { showToast } from '../components/ui/Toast';
import { Skeleton } from '../components/ui/Skeleton';

export function BlogDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      window.scrollTo(0, 0);
      try {
        const [curr, all] = await Promise.all([
          dataProvider.getBlogPostBySlug(slug),
          dataProvider.getBlogPosts(false)
        ]);
        if (!curr) {
          navigate('/not-found', { replace: true });
          return;
        }
        setPost(curr);
        setRelatedPosts(all.filter((p) => p.slug !== slug).slice(0, 2));
      } catch (err) {
        console.error('Error loading blog post:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug, navigate]);

  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    showToast('Article link copied to clipboard!');
    setTimeout(() => setCopied(false), 3000);
  };

  if (loading || !post) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem' }}>
        <Skeleton height="36px" width="30%" />
        <Skeleton height="60px" width="80%" style={{ margin: '1rem 0' }} />
        <Skeleton height="420px" borderRadius="var(--radius-lg)" />
      </div>
    );
  }

  return (
    <article className="container-narrow" style={{ paddingBottom: '7rem', paddingTop: '2rem' }}>
      {/* Back Link */}
      <div style={{ marginBottom: '2rem' }}>
        <Link
          to="/blog"
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
          <span>Back to all articles</span>
        </Link>
      </div>

      {/* Article Header */}
      <header style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
          <span className="badge">{post.category}</span>
        </div>

        <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', fontWeight: 800, lineHeight: 1.2 }}>
          {post.title}
        </h1>

        {/* Author and Date Meta */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '1.5rem',
            marginTop: '1.5rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--border-subtle)',
            color: 'var(--text-muted)',
            fontSize: '0.9rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'var(--accent-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.8rem'
              }}
            >
              {post.author ? post.author.charAt(0) : 'J'}
            </div>
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
              {post.author || 'Jerry Vance'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Calendar size={15} />
            <span>{post.published_at || 'Recent'}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Clock size={15} />
            <span>{post.read_time || '6 min read'}</span>
          </div>
        </div>
      </header>

      {/* Featured Banner Image */}
      <div
        style={{
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          aspectRatio: '16/9',
          marginBottom: '3rem',
          border: '1px solid var(--card-border)',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        <img
          src={post.featured_image}
          alt={post.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Article Body Content */}
      <div
        style={{
          color: 'var(--text-secondary)',
          fontSize: '1.15rem',
          lineHeight: 1.8,
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}
      >
        {post.content.split('\n\n').map((paragraph, idx) => {
          if (paragraph.startsWith('## ')) {
            return (
              <h2
                key={idx}
                style={{
                  fontSize: '1.85rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  marginTop: '1.5rem',
                  lineHeight: 1.3
                }}
              >
                {paragraph.replace('## ', '')}
              </h2>
            );
          }
          if (paragraph.startsWith('### ')) {
            return (
              <h3
                key={idx}
                style={{
                  fontSize: '1.45rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginTop: '1rem',
                  lineHeight: 1.35
                }}
              >
                {paragraph.replace('### ', '')}
              </h3>
            );
          }
          if (paragraph.startsWith('> ')) {
            return (
              <blockquote
                key={idx}
                style={{
                  borderLeft: '4px solid var(--accent-primary)',
                  padding: '1.25rem 1.75rem',
                  margin: '1.25rem 0',
                  background: 'var(--accent-gradient-subtle)',
                  borderRadius: '0 var(--radius-md) var(--radius-md) 0',
                  fontSize: '1.2rem',
                  fontStyle: 'italic',
                  color: 'var(--text-primary)'
                }}
              >
                {paragraph.replace('> ', '')}
              </blockquote>
            );
          }
          if (paragraph.startsWith('* ') || paragraph.startsWith('- ')) {
            const items = paragraph.split('\n');
            return (
              <ul key={idx} style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {items.map((item, itemIdx) => (
                  <li key={itemIdx}>{item.replace(/^[*\-]\s+/, '')}</li>
                ))}
              </ul>
            );
          }
          return <p key={idx}>{paragraph}</p>;
        })}
      </div>

      {/* Share Actions and Tag Bar */}
      <div
        style={{
          marginTop: '4rem',
          padding: '2rem 0',
          borderTop: '1px solid var(--border-subtle)',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            SHARE THIS ESSAY:
          </span>
          <button
            onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
            className="theme-toggle"
            title="Share on Twitter/X"
            style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: 'none', color: 'var(--text-secondary)' }}
          >
            <Twitter size={17} />
          </button>
          <button
            onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
            className="theme-toggle"
            title="Share on LinkedIn"
            style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: 'none', color: 'var(--text-secondary)' }}
          >
            <Linkedin size={17} />
          </button>
          <button
            onClick={copyUrl}
            className="theme-toggle"
            title="Copy URL"
            style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: 'none', color: 'var(--text-secondary)' }}
          >
            {copied ? <Check size={17} color="var(--status-success)" /> : <Copy size={17} />}
          </button>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: '0.8rem',
                  padding: '0.25rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-secondary)'
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <section style={{ marginTop: '5rem' }}>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '2rem' }}>
            Related Reading
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {relatedPosts.map((rel) => (
              <div key={rel.id} className="glass-card glass-card-interactive" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <span className="badge" style={{ alignSelf: 'flex-start' }}>{rel.category}</span>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 700 }}>
                  <Link to={`/blog/${rel.slug}`} style={{ color: 'var(--text-primary)' }}>
                    {rel.title}
                  </Link>
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.5, flexGrow: 1 }}>
                  {rel.excerpt}
                </p>
                <Link to={`/blog/${rel.slug}`} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-primary)', marginTop: '0.5rem' }}>
                  <span>Read Article</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
