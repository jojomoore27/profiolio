import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Sparkles, Image as ImageIcon } from 'lucide-react';
import { dataProvider } from '../../lib/dataProvider';
import { showToast } from '../../components/ui/Toast';

export function ProjectEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    short_description: '',
    description: '',
    category: 'Web Development',
    client: '',
    year: new Date().getFullYear().toString(),
    role: 'Lead Full-Stack Architect',
    duration: '3 Months',
    technologiesText: 'React, Node.js, Supabase, PostgreSQL',
    challenge: '',
    solution: '',
    results: '',
    live_url: '',
    github_url: '',
    image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    gallery_images_text: '',
    is_featured: false,
    is_published: true,
    sort_order: 1
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEditing) {
      dataProvider.getProjects(true).then((projects) => {
        const found = projects.find((p) => p.id === id);
        if (found) {
          setFormData({
            ...found,
            technologiesText: (found.technologies || []).join(', '),
            gallery_images_text: (found.gallery_images || []).join('\n')
          });
        }
      });
    }
  }, [id, isEditing]);

  const handleTitleChange = (e) => {
    const val = e.target.value;
    if (!isEditing || !formData.slug) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setFormData((prev) => ({ ...prev, title: val, slug: generatedSlug }));
    } else {
      setFormData((prev) => ({ ...prev, title: val }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.slug.trim()) {
      showToast('Title and slug are required.', 'error');
      return;
    }

    setSaving(true);
    try {
      const technologies = formData.technologiesText
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const gallery_images = formData.gallery_images_text
        .split('\n')
        .map((url) => url.trim())
        .filter(Boolean);

      const projectToSave = {
        ...formData,
        technologies,
        gallery_images
      };

      await dataProvider.saveProject(projectToSave);
      showToast(isEditing ? 'Project updated successfully!' : 'New project created successfully!');
      navigate('/admin/projects');
    } catch (err) {
      console.error('Error saving project:', err);
      showToast('Failed to save project.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Top Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link
          to="/admin/projects"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: 'var(--text-muted)',
            fontSize: '0.9rem',
            fontWeight: 600
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to Projects</span>
        </Link>

        <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>
          {isEditing ? 'Edit Project' : 'Create New Project'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        {/* Title & Slug */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="proj-title">Project Title *</label>
            <input
              id="proj-title"
              type="text"
              required
              placeholder="e.g. Aura Financial Intelligence"
              value={formData.title}
              onChange={handleTitleChange}
              className="form-input"
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="proj-slug">URL Slug *</label>
            <input
              id="proj-slug"
              type="text"
              required
              placeholder="e.g. aura-financial-intelligence"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="form-input"
            />
          </div>
        </div>

        {/* Short Description */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label" htmlFor="proj-short">Short Description (for cards and previews) *</label>
          <input
            id="proj-short"
            type="text"
            required
            placeholder="Brief 1-2 sentence overview of the project..."
            value={formData.short_description}
            onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
            className="form-input"
          />
        </div>

        {/* Full Overview Description */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label" htmlFor="proj-desc">Full Project Overview</label>
          <textarea
            id="proj-desc"
            rows={4}
            placeholder="Detailed narrative describing the system, mission, and scope..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="form-textarea"
          />
        </div>

        {/* Category & Client & Year */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="proj-cat">Category</label>
            <select
              id="proj-cat"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="form-select"
            >
              <option value="Web Development">Web Development</option>
              <option value="Mobile">Mobile</option>
              <option value="UI/UX">UI/UX</option>
              <option value="SaaS">SaaS</option>
              <option value="E-commerce">E-commerce</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="proj-client">Client / Organization</label>
            <input
              id="proj-client"
              type="text"
              placeholder="e.g. Aura Global"
              value={formData.client}
              onChange={(e) => setFormData({ ...formData, client: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="proj-year">Year</label>
            <input
              id="proj-year"
              type="text"
              placeholder="2026"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              className="form-input"
            />
          </div>
        </div>

        {/* Role & Duration & Technologies */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="proj-role">Role</label>
            <input
              id="proj-role"
              type="text"
              placeholder="Principal Architect"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="proj-duration">Duration</label>
            <input
              id="proj-duration"
              type="text"
              placeholder="4 Months"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="form-input"
            />
          </div>
        </div>

        {/* Technologies Comma Separated */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label" htmlFor="proj-techs">Technologies (comma separated)</label>
          <input
            id="proj-techs"
            type="text"
            placeholder="React, Node.js, Supabase, PostgreSQL, Tailwind CSS"
            value={formData.technologiesText}
            onChange={(e) => setFormData({ ...formData, technologiesText: e.target.value })}
            className="form-input"
          />
        </div>

        {/* Challenge & Solution & Results */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label" htmlFor="proj-challenge">The Technical Challenge</label>
          <textarea
            id="proj-challenge"
            rows={3}
            placeholder="Explain the technical or organizational bottleneck..."
            value={formData.challenge}
            onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
            className="form-textarea"
          />
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label" htmlFor="proj-solution">The Solution Engineered</label>
          <textarea
            id="proj-solution"
            rows={3}
            placeholder="Describe the architectural and code solution..."
            value={formData.solution}
            onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
            className="form-textarea"
          />
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label" htmlFor="proj-results">Measurable Results</label>
          <textarea
            id="proj-results"
            rows={2}
            placeholder="Metrics, speedups, uptimes, user adoption..."
            value={formData.results}
            onChange={(e) => setFormData({ ...formData, results: e.target.value })}
            className="form-textarea"
          />
        </div>

        {/* Image URLs and Live Preview */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label" htmlFor="proj-image">Cover Image URL *</label>
          <input
            id="proj-image"
            type="url"
            required
            placeholder="https://images.unsplash.com/..."
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            className="form-input"
          />
          {formData.image_url && (
            <div style={{ marginTop: '0.75rem', borderRadius: 'var(--radius-sm)', overflow: 'hidden', maxHeight: '180px', width: '320px', border: '1px solid var(--border-subtle)' }}>
              <img src={formData.image_url} alt="Cover preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}
        </div>

        {/* External Links */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="proj-live">Live Demo / Website URL</label>
            <input
              id="proj-live"
              type="url"
              placeholder="https://example.com"
              value={formData.live_url}
              onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="proj-github">GitHub Repository URL</label>
            <input
              id="proj-github"
              type="url"
              placeholder="https://github.com/..."
              value={formData.github_url}
              onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
              className="form-input"
            />
          </div>
        </div>

        {/* Checkboxes: Featured and Published */}
        <div style={{ display: 'flex', gap: '2rem', padding: '1rem 0' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={formData.is_featured}
              onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
              style={{ width: '18px', height: '18px' }}
            />
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Feature on Homepage</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={formData.is_published}
              onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
              style={{ width: '18px', height: '18px' }}
            />
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Publish Publicly</span>
          </label>
        </div>

        {/* Submit */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
          <button
            type="button"
            onClick={() => navigate('/admin/projects')}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="btn btn-primary"
            style={{ gap: '0.5rem' }}
          >
            <Save size={16} />
            <span>{saving ? 'Saving Project...' : isEditing ? 'Save Changes' : 'Create Project'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
