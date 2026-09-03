import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { dataProvider } from '../../lib/dataProvider';
import { showToast } from '../../components/ui/Toast';

export function BlogEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Engineering',
    read_time: '5 min read',
    author: 'Jerry Vance',
    tagsText: 'Architecture, Performance, React',
    featured_image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    is_published: true
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEditing) {
      dataProvider.getBlogPosts(true).then((posts) => {
        const found = posts.find((p) => p.id === id);
        if (found) {
          setFormData({
            ...found,
            tagsText: (found.tags || []).join(', ')
          });
        }
      });
    }
  }, [id, isEditing]);

  const handleTitleChange = (e) => {
    const val = e.target.value;
    if (!isEditing || !formData.slug) {
      const slug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setFormData((prev) => ({ ...prev, title: val, slug }));
    } else {
      setFormData((prev) => ({ ...prev, title: val }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.slug.trim() || !formData.content.trim()) {
      showToast('Title, slug, and article content are required.', 'error');
      return;
    }

    setSaving(true);
    try {
      const tags = formData.tagsText
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const postToSave = {
        ...formData,
        tags
      };

      await dataProvider.saveBlogPost(postToSave);
      showToast(isEditing ? 'Article updated successfully!' : 'New article published!');
      navigate('/admin/blog');
    } catch (err) {
      console.error('Error saving blog post:', err);
      showToast('Failed to save article.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link
          to="/admin/blog"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}
        >
          <ArrowLeft size={16} />
          <span>Back to Articles</span>
        </Link>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>
          {isEditing ? 'Edit Article' : 'Compose New Article'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="blog-title">Article Title *</label>
            <input
              id="blog-title"
              type="text"
              required
              placeholder="e.g. Architecting Modern Web Applications"
              value={formData.title}
              onChange={handleTitleChange}
              className="form-input"
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="blog-slug">URL Slug *</label>
            <input
              id="blog-slug"
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="form-input"
            />
          </div>
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label" htmlFor="blog-excerpt">Excerpt / Meta Summary *</label>
          <textarea
            id="blog-excerpt"
            rows={2}
            required
            placeholder="A compelling 1-2 sentence preview for search engines and cards..."
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            className="form-textarea"
            style={{ minHeight: '80px' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="blog-category">Category</label>
            <select
              id="blog-category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="form-select"
            >
              <option value="Engineering">Engineering</option>
              <option value="Architecture">Architecture</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Development">Development</option>
              <option value="Typography">Typography</option>
              <option value="Security">Security</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="blog-read-time">Estimated Read Time</label>
            <input
              id="blog-read-time"
              type="text"
              placeholder="e.g. 6 min read"
              value={formData.read_time}
              onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="blog-author">Author</label>
            <input
              id="blog-author"
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="form-input"
            />
          </div>
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label" htmlFor="blog-image">Featured Banner Image URL *</label>
          <input
            id="blog-image"
            type="url"
            required
            value={formData.featured_image}
            onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
            className="form-input"
          />
          {formData.featured_image && (
            <div style={{ marginTop: '0.75rem', borderRadius: 'var(--radius-sm)', overflow: 'hidden', maxHeight: '180px', width: '320px', border: '1px solid var(--border-subtle)' }}>
              <img src={formData.featured_image} alt="Featured preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label" htmlFor="blog-tags">Tags (comma separated)</label>
          <input
            id="blog-tags"
            type="text"
            placeholder="Performance, React, Architecture"
            value={formData.tagsText}
            onChange={(e) => setFormData({ ...formData, tagsText: e.target.value })}
            className="form-input"
          />
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label" htmlFor="blog-content">
            Article Content (Markdown supported: ## Headings, &gt; Quotes, * Lists) *
          </label>
          <textarea
            id="blog-content"
            rows={12}
            required
            placeholder="## Section Title&#10;&#10;Write your deep technical analysis..."
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="form-textarea"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', lineHeight: 1.6 }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <input
            type="checkbox"
            id="blog-pub"
            checked={formData.is_published}
            onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
            style={{ width: '18px', height: '18px' }}
          />
          <label htmlFor="blog-pub" style={{ fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer' }}>
            Publish article live
          </label>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
          <button type="button" onClick={() => navigate('/admin/blog')} className="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" disabled={saving} className="btn btn-primary" style={{ gap: '0.5rem' }}>
            <Save size={16} />
            <span>{saving ? 'Saving...' : isEditing ? 'Update Article' : 'Publish Article'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
