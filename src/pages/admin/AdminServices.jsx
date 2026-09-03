import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Check, X, Save } from 'lucide-react';
import { dataProvider } from '../../lib/dataProvider';
import { showToast } from '../../components/ui/Toast';

export function AdminServices() {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'Code',
    featuresText: '',
    price: '',
    is_active: true
  });

  const fetchServices = async () => {
    const data = await dataProvider.getServices(true);
    setServices(data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleStartCreate = () => {
    setEditingService('new');
    setFormData({
      title: '',
      description: '',
      icon: 'Code',
      featuresText: 'Architecture & Design\nProduction Deployment\nCI/CD Integration',
      price: 'From $3,500',
      is_active: true
    });
  };

  const handleStartEdit = (service) => {
    setEditingService(service.id);
    setFormData({
      ...service,
      featuresText: (service.features || []).join('\n')
    });
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Delete service "${title}"?`)) {
      await dataProvider.deleteService(id);
      showToast(`Deleted "${title}"`);
      fetchServices();
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      showToast('Service title is required.', 'error');
      return;
    }

    const features = formData.featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    const payload = {
      ...formData,
      features,
      id: editingService === 'new' ? undefined : editingService
    };

    await dataProvider.saveService(payload);
    showToast(editingService === 'new' ? 'Service added successfully!' : 'Service updated!');
    setEditingService(null);
    fetchServices();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Services Management</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Configure client service offerings, pricing tiers, and capabilities.
          </p>
        </div>

        <button onClick={handleStartCreate} className="btn btn-primary btn-sm">
          <Plus size={16} />
          <span>Add New Service</span>
        </button>
      </div>

      {editingService && (
        <form onSubmit={handleSave} className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', border: '1px solid var(--accent-primary)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
            {editingService === 'new' ? 'Add New Service' : 'Edit Service'}
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="serv-title">Service Title *</label>
              <input
                id="serv-title"
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="serv-icon">Lucide Icon Name</label>
              <input
                id="serv-icon"
                type="text"
                placeholder="Code, Layout, Server, Zap, Layers"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="serv-price">Starting Price / Investment</label>
              <input
                id="serv-price"
                type="text"
                placeholder="e.g. From $4,500 / Project"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="serv-desc">Description</label>
            <textarea
              id="serv-desc"
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="form-textarea"
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="serv-features">Key Feature Bullet Points (one per line)</label>
            <textarea
              id="serv-features"
              rows={4}
              value={formData.featuresText}
              onChange={(e) => setFormData({ ...formData, featuresText: e.target.value })}
              className="form-textarea"
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <input
              type="checkbox"
              id="serv-active"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              style={{ width: '18px', height: '18px' }}
            />
            <label htmlFor="serv-active" style={{ fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer' }}>
              Service is active & visible on public site
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
            <button type="button" onClick={() => setEditingService(null)} className="btn btn-secondary btn-sm">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm">
              <Save size={16} />
              <span>Save Service</span>
            </button>
          </div>
        </form>
      )}

      {/* Services List Table */}
      <div className="glass-card" style={{ padding: '1rem', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '0.75rem 1rem' }}>Title</th>
              <th style={{ padding: '0.75rem 1rem' }}>Icon</th>
              <th style={{ padding: '0.75rem 1rem' }}>Pricing</th>
              <th style={{ padding: '0.75rem 1rem' }}>Status</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((serv) => (
              <tr key={serv.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '1rem', fontWeight: 700 }}>{serv.title}</td>
                <td style={{ padding: '1rem', color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>{serv.icon}</td>
                <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{serv.price || 'Contact'}</td>
                <td style={{ padding: '1rem' }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      padding: '0.2rem 0.5rem',
                      borderRadius: 'var(--radius-full)',
                      background: serv.is_active ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                      color: serv.is_active ? 'var(--status-success)' : 'var(--status-error)'
                    }}
                  >
                    {serv.is_active ? 'Active' : 'Disabled'}
                  </span>
                </td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleStartEdit(serv)}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '0.3rem 0.6rem' }}
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(serv.id, serv.title)}
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
