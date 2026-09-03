import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save } from 'lucide-react';
import { dataProvider } from '../../lib/dataProvider';
import { showToast } from '../../components/ui/Toast';

export function AdminExperience() {
  const [experience, setExperience] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    location: '',
    start_date: '',
    end_date: 'Present',
    is_current: false,
    description: '',
    technologiesText: ''
  });

  const fetchExperience = async () => {
    const data = await dataProvider.getExperience();
    setExperience(data);
  };

  useEffect(() => {
    fetchExperience();
  }, []);

  const handleStartCreate = () => {
    setEditingItem('new');
    setFormData({
      company: '',
      role: '',
      location: 'San Francisco, CA',
      start_date: '2024',
      end_date: 'Present',
      is_current: true,
      description: '',
      technologiesText: 'React, Node.js, PostgreSQL'
    });
  };

  const handleStartEdit = (item) => {
    setEditingItem(item.id);
    setFormData({
      ...item,
      technologiesText: (item.technologies || []).join(', ')
    });
  };

  const handleDelete = async (id, role) => {
    if (window.confirm(`Delete experience milestone "${role}"?`)) {
      await dataProvider.deleteExperience(id);
      showToast('Milestone deleted');
      fetchExperience();
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.company.trim() || !formData.role.trim()) {
      showToast('Company and role are required.', 'error');
      return;
    }

    const technologies = formData.technologiesText
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      ...formData,
      technologies,
      id: editingItem === 'new' ? undefined : editingItem
    };

    await dataProvider.saveExperience(payload);
    showToast(editingItem === 'new' ? 'Experience added!' : 'Experience updated!');
    setEditingItem(null);
    fetchExperience();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Career History Management</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Manage career roles, milestones, date ranges, and accomplishments.
          </p>
        </div>

        <button onClick={handleStartCreate} className="btn btn-primary btn-sm">
          <Plus size={16} />
          <span>Add Experience</span>
        </button>
      </div>

      {editingItem && (
        <form onSubmit={handleSave} className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', border: '1px solid var(--accent-primary)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
            {editingItem === 'new' ? 'Add Experience Entry' : 'Edit Experience'}
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="exp-company">Company *</label>
              <input
                id="exp-company"
                type="text"
                required
                placeholder="e.g. Apex Systems Lab"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="exp-role">Role Title *</label>
              <input
                id="exp-role"
                type="text"
                required
                placeholder="e.g. Principal Architect"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="exp-loc">Location</label>
              <input
                id="exp-loc"
                type="text"
                placeholder="San Francisco, CA"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="form-input"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="exp-start">Start Date</label>
              <input
                id="exp-start"
                type="text"
                placeholder="2024"
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="exp-end">End Date</label>
              <input
                id="exp-end"
                type="text"
                placeholder="Present"
                value={formData.end_date}
                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                className="form-input"
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '1.75rem' }}>
              <input
                type="checkbox"
                id="exp-cur"
                checked={formData.is_current}
                onChange={(e) => setFormData({ ...formData, is_current: e.target.checked })}
                style={{ width: '18px', height: '18px' }}
              />
              <label htmlFor="exp-cur" style={{ fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer' }}>
                Current Role
              </label>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="exp-desc">Accomplishments & Narrative Description</label>
            <textarea
              id="exp-desc"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="form-textarea"
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="exp-techs">Technologies (comma separated)</label>
            <input
              id="exp-techs"
              type="text"
              placeholder="React, TypeScript, Node.js, Docker"
              value={formData.technologiesText}
              onChange={(e) => setFormData({ ...formData, technologiesText: e.target.value })}
              className="form-input"
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
            <button type="button" onClick={() => setEditingItem(null)} className="btn btn-secondary btn-sm">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm">
              <Save size={16} />
              <span>Save Entry</span>
            </button>
          </div>
        </form>
      )}

      {/* Experience List Table */}
      <div className="glass-card" style={{ padding: '1rem', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '0.75rem 1rem' }}>Role & Company</th>
              <th style={{ padding: '0.75rem 1rem' }}>Location</th>
              <th style={{ padding: '0.75rem 1rem' }}>Duration</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {experience.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '1rem' }}>
                  <div style={{ fontWeight: 700 }}>{item.role}</div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent-primary)' }}>{item.company}</span>
                </td>
                <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{item.location}</td>
                <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>
                  {item.start_date} – {item.end_date}
                </td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleStartEdit(item)}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '0.3rem 0.6rem' }}
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, item.role)}
                      className="btn btn-danger btn-sm"
                      style={{ padding: '0.3rem 0.6rem' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
