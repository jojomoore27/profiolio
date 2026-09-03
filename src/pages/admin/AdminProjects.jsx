import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, ExternalLink, Eye, Check, X, Search } from 'lucide-react';
import { dataProvider } from '../../lib/dataProvider';
import { showToast } from '../../components/ui/Toast';

export function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const data = await dataProvider.getProjects(true);
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      await dataProvider.deleteProject(id);
      showToast(`Deleted "${title}"`);
      fetchProjects();
    }
  };

  const handleTogglePublish = async (project) => {
    const updated = { ...project, is_published: !project.is_published };
    await dataProvider.saveProject(updated);
    showToast(`Project marked as ${updated.is_published ? 'Published' : 'Draft'}`);
    fetchProjects();
  };

  const filtered = projects.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Project Management</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Add, update, publish, or remove case studies from your portfolio.
          </p>
        </div>

        <Link to="/admin/projects/new" className="btn btn-primary btn-sm">
          <Plus size={16} />
          <span>Add New Project</span>
        </Link>
      </div>

      {/* Search Input */}
      <div style={{ maxWidth: '360px' }}>
        <input
          type="text"
          placeholder="Filter projects by title or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-input"
        />
      </div>

      {/* Projects Table Card */}
      <div className="glass-card" style={{ overflowX: 'auto', padding: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '0.75rem 1rem' }}>Project</th>
              <th style={{ padding: '0.75rem 1rem' }}>Category</th>
              <th style={{ padding: '0.75rem 1rem' }}>Year</th>
              <th style={{ padding: '0.75rem 1rem' }}>Status</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((proj) => (
              <tr key={proj.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img
                      src={proj.image_url}
                      alt={proj.title}
                      style={{ width: '56px', height: '42px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{proj.title}</div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>/projects/{proj.slug}</span>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '1rem' }}>
                  <span className="badge" style={{ fontSize: '0.75rem' }}>{proj.category}</span>
                </td>
                <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>
                  {proj.year || '2026'}
                </td>
                <td style={{ padding: '1rem' }}>
                  <button
                    onClick={() => handleTogglePublish(proj)}
                    style={{
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      padding: '0.25rem 0.65rem',
                      borderRadius: 'var(--radius-full)',
                      background: proj.is_published ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                      color: proj.is_published ? 'var(--status-success)' : 'var(--status-error)'
                    }}
                  >
                    {proj.is_published ? 'Published' : 'Draft'}
                  </button>
                </td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Link
                      to={`/projects/${proj.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '0.3rem 0.5rem' }}
                      title="Preview Case Study"
                    >
                      <Eye size={14} />
                    </Link>
                    <Link
                      to={`/admin/projects/${proj.id}/edit`}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '0.3rem 0.5rem' }}
                      title="Edit Project"
                    >
                      <Edit2 size={14} />
                    </Link>
                    <button
                      onClick={() => handleDelete(proj.id, proj.title)}
                      className="btn btn-danger btn-sm"
                      style={{ padding: '0.3rem 0.5rem' }}
                      title="Delete Project"
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
            No projects found matching the criteria.
          </div>
        )}
      </div>
    </div>
  );
}
