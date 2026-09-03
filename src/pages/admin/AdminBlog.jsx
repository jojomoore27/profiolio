import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';
import { dataProvider } from '../../lib/dataProvider';
import { showToast } from '../../components/ui/Toast';

export function AdminBlog() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');

  const fetchPosts = async () => {
    try {
      const data = await dataProvider.getBlogPosts(true);
      setPosts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id, title) => {
    if (window.confirm(`Delete post "${title}"?`)) {
      await dataProvider.deleteBlogPost(id);
      showToast(`Deleted "${title}"`);
      fetchPosts();
    }
  };

  const handleTogglePublish = async (post) => {
    const updated = { ...post, is_published: !post.is_published };
    await dataProvider.saveBlogPost(updated);
    showToast(`Post marked as ${updated.is_published ? 'Published' : 'Draft'}`);
    fetchPosts();
  };

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Blog Article Management</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Publish essays, architectural insights, and technical tutorials.
          </p>
        </div>

        <Link to="/admin/blog/new" className="btn btn-primary btn-sm">
          <Plus size={16} />
          <span>Write New Article</span>
        </Link>
      </div>

      <div style={{ maxWidth: '360px' }}>
        <input
          type="text"
          placeholder="Filter articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-input"
        />
      </div>

      <div className="glass-card" style={{ overflowX: 'auto', padding: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '0.75rem 1rem' }}>Article</th>
              <th style={{ padding: '0.75rem 1rem' }}>Category</th>
              <th style={{ padding: '0.75rem 1rem' }}>Read Time</th>
              <th style={{ padding: '0.75rem 1rem' }}>Status</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((post) => (
              <tr key={post.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      style={{ width: '56px', height: '42px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{post.title}</div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>/blog/{post.slug}</span>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '1rem' }}>
                  <span className="badge" style={{ fontSize: '0.75rem' }}>{post.category}</span>
                </td>
                <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>
                  {post.read_time || '5 min read'}
                </td>
                <td style={{ padding: '1rem' }}>
                  <button
                    onClick={() => handleTogglePublish(post)}
                    style={{
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      padding: '0.25rem 0.65rem',
                      borderRadius: 'var(--radius-full)',
                      background: post.is_published ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                      color: post.is_published ? 'var(--status-success)' : 'var(--status-error)'
                    }}
                  >
                    {post.is_published ? 'Published' : 'Draft'}
                  </button>
                </td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Link
                      to={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '0.3rem 0.5rem' }}
                      title="Preview Article"
                    >
                      <Eye size={14} />
                    </Link>
                    <Link
                      to={`/admin/blog/${post.id}/edit`}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '0.3rem 0.5rem' }}
                      title="Edit Article"
                    >
                      <Edit2 size={14} />
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id, post.title)}
                      className="btn btn-danger btn-sm"
                      style={{ padding: '0.3rem 0.5rem' }}
                      title="Delete Article"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            No blog articles found.
          </div>
        )}
      </div>
    </div>
  );
}
