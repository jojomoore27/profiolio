import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { dataProvider } from '../lib/dataProvider';
import { BlogCard } from '../components/ui/BlogCard';

export function Blog() {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dataProvider.getBlogPosts(false).then(setPosts);
  }, []);

  const categories = ['All', 'Engineering', 'Architecture', 'UI/UX Design', 'Development', 'Typography', 'Security'];

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.tags && post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  const featuredPost = posts[0];
  const remainingPosts = selectedCategory === 'All' && !searchQuery ? filteredPosts.slice(1) : filteredPosts;

  return (
    <div className="container" style={{ paddingBottom: '7rem' }}>
      {/* Header */}
      <section style={{ padding: '3rem 0 2rem', maxWidth: '780px' }}>
        <span className="badge" style={{ marginBottom: '1rem' }}>
          ENGINEERING JOURNAL
        </span>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: 800, lineHeight: 1.15 }}>
          Insights on Code, Systems & <span className="gradient-text">Aesthetics.</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.65, marginTop: '1rem' }}>
          Reflections on full-stack web architecture, React performance optimization, Supabase database hardening, and design systems.
        </p>
      </section>

      {/* Featured Lead Post (When no search active) */}
      {featuredPost && selectedCategory === 'All' && !searchQuery && (
        <div
          className="glass-card glass-card-interactive"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2.5rem',
            overflow: 'hidden',
            marginBottom: '4rem'
          }}
        >
          <div style={{ position: 'relative', minHeight: '320px', backgroundColor: 'var(--bg-tertiary)' }}>
            <img
              src={featuredPost.featured_image}
              alt={featuredPost.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', top: '1.25rem', left: '1.25rem' }}>
              <span className="badge" style={{ background: 'rgba(9, 13, 22, 0.85)', backdropFilter: 'blur(8px)' }}>
                FEATURED ESSAY
              </span>
            </div>
          </div>

          <div style={{ padding: '2.5rem 2.5rem 2.5rem 0', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Calendar size={14} /> {featuredPost.published_at || 'Recent'}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Clock size={14} /> {featuredPost.read_time || '6 min read'}
              </span>
              <span className="badge">{featuredPost.category}</span>
            </div>

            <h2 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', fontWeight: 800, lineHeight: 1.25 }}>
              <Link
                to={`/blog/${featuredPost.slug}`}
                style={{ color: 'var(--text-primary)', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
              >
                {featuredPost.title}
              </Link>
            </h2>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.65 }}>
              {featuredPost.excerpt}
            </p>

            <div style={{ paddingTop: '1rem' }}>
              <Link to={`/blog/${featuredPost.slug}`} className="btn btn-primary btn-sm">
                <span>Read Full Article</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          paddingBottom: '2.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          marginBottom: '3rem'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                border: '1px solid',
                borderColor: selectedCategory === cat ? 'var(--accent-primary)' : 'var(--border-prominent)',
                background: selectedCategory === cat ? 'var(--accent-gradient-subtle)' : 'var(--bg-secondary)',
                color: selectedCategory === cat ? 'var(--accent-primary)' : 'var(--text-secondary)',
                transition: 'all 0.2s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
          <Search
            size={18}
            style={{
              position: 'absolute',
              top: '50%',
              left: '1rem',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)'
            }}
          />
          <input
            type="text"
            placeholder="Search articles & tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '2.6rem' }}
          />
        </div>
      </div>

      {/* Articles Grid */}
      {remainingPosts.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.25rem' }}>
          {remainingPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="glass-card" style={{ padding: '4rem 2rem', textAlign: 'center', maxWidth: '480px', margin: '2rem auto' }}>
          <BookOpen size={40} style={{ margin: '0 auto 1rem', color: 'var(--text-muted)' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            No articles found
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
            Try selecting a different category or clearing your search term.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="btn btn-secondary btn-sm"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
