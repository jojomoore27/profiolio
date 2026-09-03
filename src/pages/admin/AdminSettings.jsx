import React, { useState, useEffect } from 'react';
import { Save, User, Globe, Share2, Sparkles, Check } from 'lucide-react';
import { dataProvider } from '../../lib/dataProvider';
import { showToast } from '../../components/ui/Toast';

export function AdminSettings() {
  const [profile, setProfile] = useState({
    name: '',
    title: '',
    bio: '',
    email: '',
    phone: '',
    location: '',
    avatar_url: '',
    is_available: true,
    availability_text: '',
    years_experience: 6,
    completed_projects: 58,
    happy_clients: 42
  });

  const [settings, setSettings] = useState({
    site_name: '',
    logo_text: '',
    hero_title: '',
    hero_subtitle: '',
    contact_email: '',
    footer_text: '',
    github_url: '',
    linkedin_url: '',
    twitter_url: '',
    instagram_url: '',
    meta_title: '',
    meta_description: ''
  });

  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    Promise.all([dataProvider.getProfile(), dataProvider.getSettings()]).then(([p, s]) => {
      setProfile(p);
      setSettings(s);
    });
  }, []);

  const handleSaveAll = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await Promise.all([
        dataProvider.updateProfile(profile),
        dataProvider.updateSettings(settings)
      ]);
      showToast('Profile and site settings saved successfully!');
    } catch (err) {
      console.error(err);
      showToast('Failed to update settings.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Profile & Site Settings</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Customize your public bio, metrics, hero copy, and social links.
          </p>
        </div>

        <button onClick={handleSaveAll} disabled={saving} className="btn btn-primary btn-sm" style={{ gap: '0.5rem' }}>
          <Save size={16} />
          <span>{saving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.75rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
        <button
          onClick={() => setActiveTab('profile')}
          className={`btn btn-sm ${activeTab === 'profile' ? 'btn-primary' : 'btn-secondary'}`}
        >
          <User size={15} />
          <span>Personal Profile</span>
        </button>
        <button
          onClick={() => setActiveTab('website')}
          className={`btn btn-sm ${activeTab === 'website' ? 'btn-primary' : 'btn-secondary'}`}
        >
          <Globe size={15} />
          <span>Website & SEO</span>
        </button>
        <button
          onClick={() => setActiveTab('social')}
          className={`btn btn-sm ${activeTab === 'social' ? 'btn-primary' : 'btn-secondary'}`}
        >
          <Share2 size={15} />
          <span>Social Channels</span>
        </button>
      </div>

      <form onSubmit={handleSaveAll} className="glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        {activeTab === 'profile' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="prof-name">Full Name *</label>
                <input
                  id="prof-name"
                  type="text"
                  required
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="prof-title">Professional Title *</label>
                <input
                  id="prof-title"
                  type="text"
                  required
                  value={profile.title}
                  onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="prof-bio">Biography</label>
              <textarea
                id="prof-bio"
                rows={4}
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="form-textarea"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="prof-email">Email</label>
                <input
                  id="prof-email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="prof-phone">Phone</label>
                <input
                  id="prof-phone"
                  type="text"
                  value={profile.phone || ''}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="prof-loc">Location</label>
                <input
                  id="prof-loc"
                  type="text"
                  value={profile.location || ''}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="prof-avatar">Avatar / Portrait Image URL</label>
              <input
                id="prof-avatar"
                type="url"
                value={profile.avatar_url || ''}
                onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })}
                className="form-input"
              />
              {profile.avatar_url && (
                <div style={{ marginTop: '0.75rem', width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--accent-primary)' }}>
                  <img src={profile.avatar_url} alt="Profile preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
            </div>

            {/* Availability Indicator */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="prof-avail-text">Availability Banner Text</label>
                <input
                  id="prof-avail-text"
                  type="text"
                  value={profile.availability_text || ''}
                  onChange={(e) => setProfile({ ...profile, availability_text: e.target.value })}
                  className="form-input"
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '1.8rem' }}>
                <input
                  type="checkbox"
                  id="prof-avail"
                  checked={profile.is_available}
                  onChange={(e) => setProfile({ ...profile, is_available: e.target.checked })}
                  style={{ width: '18px', height: '18px' }}
                />
                <label htmlFor="prof-avail" style={{ fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer' }}>
                  Available for new contracts / freelance
                </label>
              </div>
            </div>

            {/* Editable Stats */}
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>
                Editable Statistics Counters
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" htmlFor="prof-exp-years">Years Experience</label>
                  <input
                    id="prof-exp-years"
                    type="number"
                    value={profile.years_experience || 6}
                    onChange={(e) => setProfile({ ...profile, years_experience: Number(e.target.value) })}
                    className="form-input"
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" htmlFor="prof-projs">Completed Projects</label>
                  <input
                    id="prof-projs"
                    type="number"
                    value={profile.completed_projects || 50}
                    onChange={(e) => setProfile({ ...profile, completed_projects: Number(e.target.value) })}
                    className="form-input"
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" htmlFor="prof-clients">Happy Clients</label>
                  <input
                    id="prof-clients"
                    type="number"
                    value={profile.happy_clients || 35}
                    onChange={(e) => setProfile({ ...profile, happy_clients: Number(e.target.value) })}
                    className="form-input"
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'website' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="site-name">Website Brand Name</label>
                <input
                  id="site-name"
                  type="text"
                  value={settings.site_name}
                  onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="logo-text">Navbar Logo Text</label>
                <input
                  id="logo-text"
                  type="text"
                  value={settings.logo_text}
                  onChange={(e) => setSettings({ ...settings, logo_text: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="hero-title">Hero Headline</label>
              <input
                id="hero-title"
                type="text"
                value={settings.hero_title}
                onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="hero-subtitle">Hero Subtitle</label>
              <textarea
                id="hero-subtitle"
                rows={2}
                value={settings.hero_subtitle}
                onChange={(e) => setSettings({ ...settings, hero_subtitle: e.target.value })}
                className="form-textarea"
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="footer-text">Footer Copyright Statement</label>
              <input
                id="footer-text"
                type="text"
                value={settings.footer_text}
                onChange={(e) => setSettings({ ...settings, footer_text: e.target.value })}
                className="form-input"
              />
            </div>

            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>
                SEO Metadata
              </h3>
              <div className="form-group">
                <label className="form-label" htmlFor="meta-title">Page Meta Title</label>
                <input
                  id="meta-title"
                  type="text"
                  value={settings.meta_title}
                  onChange={(e) => setSettings({ ...settings, meta_title: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="meta-desc">Meta Description</label>
                <textarea
                  id="meta-desc"
                  rows={2}
                  value={settings.meta_description}
                  onChange={(e) => setSettings({ ...settings, meta_description: e.target.value })}
                  className="form-textarea"
                />
              </div>
            </div>
          </>
        )}

        {activeTab === 'social' && (
          <>
            <div className="form-group">
              <label className="form-label" htmlFor="soc-github">GitHub Profile URL</label>
              <input
                id="soc-github"
                type="url"
                value={settings.github_url}
                onChange={(e) => setSettings({ ...settings, github_url: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="soc-linkedin">LinkedIn Profile URL</label>
              <input
                id="soc-linkedin"
                type="url"
                value={settings.linkedin_url}
                onChange={(e) => setSettings({ ...settings, linkedin_url: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="soc-twitter">Twitter / X Profile URL</label>
              <input
                id="soc-twitter"
                type="url"
                value={settings.twitter_url}
                onChange={(e) => setSettings({ ...settings, twitter_url: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="soc-instagram">Instagram Profile URL</label>
              <input
                id="soc-instagram"
                type="url"
                value={settings.instagram_url}
                onChange={(e) => setSettings({ ...settings, instagram_url: e.target.value })}
                className="form-input"
              />
            </div>
          </>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
          <button type="submit" disabled={saving} className="btn btn-primary">
            <Save size={16} />
            <span>{saving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
