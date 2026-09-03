import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { dataProvider } from '../lib/dataProvider';
import { showToast } from '../components/ui/Toast';

export function Contact() {
  const location = useLocation();
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    dataProvider.getProfile().then(setProfile);
    if (location.state?.serviceTitle) {
      setFormData((prev) => ({
        ...prev,
        subject: `Inquiry regarding ${location.state.serviceTitle}`
      }));
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      await dataProvider.sendContactMessage(formData);
      setSubmitted(true);
      showToast('Message sent successfully! I will reply within 24 hours.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('Submission error:', err);
      showToast('Failed to deliver message. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container" style={{ paddingBottom: '7rem' }}>
      {/* Header */}
      <section style={{ padding: '3rem 0 2rem', maxWidth: '780px' }}>
        <span className="badge" style={{ marginBottom: '1rem' }}>
          GET IN TOUCH
        </span>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: 800, lineHeight: 1.15 }}>
          Let’s start a <span className="gradient-text">meaningful project.</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.65, marginTop: '1rem' }}>
          Have an upcoming initiative, architectural question, or looking for contract engineering? Send a message directly below.
        </p>
      </section>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3.5rem',
          marginTop: '2rem',
          alignItems: 'start'
        }}
      >
        {/* Contact Form Card */}
        <div className="glass-card" style={{ padding: '2.5rem' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: 'var(--status-success)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem'
                }}
              >
                <CheckCircle2 size={36} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                Message Transmitted
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, maxWidth: '400px', margin: '0 auto 2rem' }}>
                Thank you for reaching out. Your inquiry has been securely stored in Supabase and I will get back to you shortly.
              </p>
              <button onClick={() => setSubmitted(false)} className="btn btn-outline btn-sm">
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="contact-name">
                  Full Name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="contact-email">
                  Email Address *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="contact-subject">
                  Subject / Project Scope
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  placeholder="e.g. Full-Stack Web Platform Architecture"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="contact-message">
                  Project Description & Timeline *
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  placeholder="Describe your vision, requirements, expected launch timeline, or challenges..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="form-textarea"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary btn-lg"
                style={{ marginTop: '0.5rem', width: '100%' }}
              >
                {submitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Deliver Message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Contact Info Details & Trust Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Direct Contact</h3>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-sm)', background: 'var(--accent-gradient-subtle)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Mail size={20} />
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Email Inquiries</span>
                <a href={`mailto:${profile?.email || 'jerry@vancecraft.io'}`} style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                  {profile?.email || 'jerry@vancecraft.io'}
                </a>
              </div>
            </div>

            {profile?.phone && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-sm)', background: 'var(--accent-gradient-subtle)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Phone size={20} />
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Direct Telephone</span>
                  <a href={`tel:${profile.phone}`} style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                    {profile.phone}
                  </a>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-sm)', background: 'var(--accent-gradient-subtle)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MapPin size={20} />
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Primary Base</span>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                  {profile?.location || 'San Francisco, CA & Global Remote'}
                </span>
              </div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <Clock size={20} color="var(--accent-primary)" />
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Response SLA</h4>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.6 }}>
              All professional inquiries receive a thoughtful technical reply within 24 hours. For urgent production advisory, please specify in the subject line.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
