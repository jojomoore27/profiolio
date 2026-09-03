import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save } from 'lucide-react';
import { dataProvider } from '../../lib/dataProvider';
import { showToast } from '../../components/ui/Toast';

export function AdminSkills() {
  const [skills, setSkills] = useState([]);
  const [editingSkill, setEditingSkill] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Frontend',
    proficiency: 90,
    icon: 'Atom'
  });

  const fetchSkills = async () => {
    const data = await dataProvider.getSkills();
    setSkills(data);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleStartCreate = () => {
    setEditingSkill('new');
    setFormData({
      name: '',
      category: 'Frontend',
      proficiency: 90,
      icon: 'Atom'
    });
  };

  const handleStartEdit = (skill) => {
    setEditingSkill(skill.id);
    setFormData({ ...skill });
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete skill "${name}"?`)) {
      await dataProvider.deleteSkill(id);
      showToast(`Deleted "${name}"`);
      fetchSkills();
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('Skill name is required.', 'error');
      return;
    }

    const payload = {
      ...formData,
      proficiency: Number(formData.proficiency),
      id: editingSkill === 'new' ? undefined : editingSkill
    };

    await dataProvider.saveSkill(payload);
    showToast(editingSkill === 'new' ? 'Skill added successfully!' : 'Skill updated!');
    setEditingSkill(null);
    fetchSkills();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Skills & Competencies</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Manage technical proficiencies and visual progress percentages.
          </p>
        </div>

        <button onClick={handleStartCreate} className="btn btn-primary btn-sm">
          <Plus size={16} />
          <span>Add New Skill</span>
        </button>
      </div>

      {editingSkill && (
        <form onSubmit={handleSave} className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', border: '1px solid var(--accent-primary)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
            {editingSkill === 'new' ? 'Add New Skill' : 'Edit Skill'}
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="skill-name">Skill Name *</label>
              <input
                id="skill-name"
                type="text"
                required
                placeholder="e.g. Next.js / TypeScript"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="skill-cat">Category</label>
              <select
                id="skill-cat"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="form-select"
              >
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Database">Database</option>
                <option value="Tools & DevOps">Tools & DevOps</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="skill-prof">
                Proficiency Level ({formData.proficiency}%)
              </label>
              <input
                id="skill-prof"
                type="range"
                min="0"
                max="100"
                value={formData.proficiency}
                onChange={(e) => setFormData({ ...formData, proficiency: e.target.value })}
                style={{ width: '100%', marginTop: '0.6rem' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
            <button type="button" onClick={() => setEditingSkill(null)} className="btn btn-secondary btn-sm">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm">
              <Save size={16} />
              <span>Save Skill</span>
            </button>
          </div>
        </form>
      )}

      {/* Skills Table */}
      <div className="glass-card" style={{ padding: '1rem', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '0.75rem 1rem' }}>Skill</th>
              <th style={{ padding: '0.75rem 1rem' }}>Category</th>
              <th style={{ padding: '0.75rem 1rem' }}>Proficiency</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((skill) => (
              <tr key={skill.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '1rem', fontWeight: 700 }}>{skill.name}</td>
                <td style={{ padding: '1rem' }}>
                  <span className="badge" style={{ fontSize: '0.75rem' }}>{skill.category}</span>
                </td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '180px' }}>
                    <div style={{ flexGrow: 1, height: '6px', borderRadius: 'var(--radius-full)', background: 'var(--bg-tertiary)', overflow: 'hidden' }}>
                      <div style={{ width: `${skill.proficiency}%`, height: '100%', background: 'var(--accent-gradient)' }} />
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
                      {skill.proficiency}%
                    </span>
                  </div>
                </td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleStartEdit(skill)}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '0.3rem 0.6rem' }}
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(skill.id, skill.name)}
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
