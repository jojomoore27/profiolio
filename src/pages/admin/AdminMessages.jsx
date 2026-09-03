import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle, Clock, Trash2, X, Eye } from 'lucide-react';
import { dataProvider } from '../../lib/dataProvider';
import { showToast } from '../../components/ui/Toast';

export function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filter, setFilter] = useState('all'); // all, unread, read

  const fetchMessages = async () => {
    const data = await dataProvider.getMessages();
    setMessages(data);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleToggleRead = async (msg) => {
    await dataProvider.markMessageRead(msg.id, !msg.is_read);
    showToast(`Marked message as ${!msg.is_read ? 'read' : 'unread'}`);
    fetchMessages();
    if (selectedMessage && selectedMessage.id === msg.id) {
      setSelectedMessage({ ...selectedMessage, is_read: !msg.is_read });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this message?')) {
      await dataProvider.deleteMessage(id);
      showToast('Message deleted');
      setSelectedMessage(null);
      fetchMessages();
    }
  };

  const filtered = messages.filter((m) => {
    if (filter === 'unread') return !m.is_read;
    if (filter === 'read') return m.is_read;
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Contact Inquiries Inbox</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Review and respond to client project inquiries sent through the contact form.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setFilter('all')}
            className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
          >
            All ({messages.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`btn btn-sm ${filter === 'unread' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Unread ({messages.filter((m) => !m.is_read).length})
          </button>
          <button
            onClick={() => setFilter('read')}
            className={`btn btn-sm ${filter === 'read' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Read ({messages.filter((m) => m.is_read).length})
          </button>
        </div>
      </div>

      {/* Messages Table */}
      <div className="glass-card" style={{ padding: '1rem', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '0.75rem 1rem' }}>Sender</th>
              <th style={{ padding: '0.75rem 1rem' }}>Subject</th>
              <th style={{ padding: '0.75rem 1rem' }}>Received</th>
              <th style={{ padding: '0.75rem 1rem' }}>Status</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((msg) => (
              <tr
                key={msg.id}
                onClick={() => setSelectedMessage(msg)}
                style={{
                  borderBottom: '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  backgroundColor: msg.is_read ? 'transparent' : 'var(--accent-gradient-subtle)'
                }}
              >
                <td style={{ padding: '1rem' }}>
                  <div style={{ fontWeight: msg.is_read ? 500 : 700, color: 'var(--text-primary)' }}>
                    {msg.name}
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{msg.email}</span>
                </td>
                <td style={{ padding: '1rem', fontWeight: msg.is_read ? 400 : 600 }}>
                  {msg.subject || 'No Subject Specified'}
                </td>
                <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                  {new Date(msg.created_at).toLocaleDateString()} {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </td>
                <td style={{ padding: '1rem' }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      padding: '0.2rem 0.6rem',
                      borderRadius: 'var(--radius-full)',
                      background: msg.is_read ? 'var(--bg-tertiary)' : 'rgba(239, 68, 68, 0.15)',
                      color: msg.is_read ? 'var(--text-muted)' : 'var(--status-error)',
                      fontWeight: 600
                    }}
                  >
                    {msg.is_read ? 'Read' : 'Unread'}
                  </span>
                </td>
                <td style={{ padding: '1rem', textAlign: 'right' }} onClick={(e) => e.stopPropagation()}>
                  <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                    <button
                      onClick={() => handleToggleRead(msg)}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '0.3rem 0.5rem' }}
                      title={msg.is_read ? 'Mark as Unread' : 'Mark as Read'}
                    >
                      <CheckCircle size={14} color={msg.is_read ? 'var(--status-success)' : 'inherit'} />
                    </button>
                    <button
                      onClick={() => handleDelete(msg.id)}
                      className="btn btn-danger btn-sm"
                      style={{ padding: '0.3rem 0.5rem' }}
                      title="Delete Message"
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
            No messages found in this view.
          </div>
        )}
      </div>

      {/* Message Detail Modal / Dialog */}
      {selectedMessage && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1.5rem'
          }}
          onClick={() => setSelectedMessage(null)}
        >
          <div
            className="glass-card animate-fade-in"
            style={{
              width: '100%',
              maxWidth: '600px',
              padding: '2.5rem',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMessage(null)}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>

            <div style={{ marginBottom: '1.5rem' }}>
              <span className="badge" style={{ marginBottom: '0.5rem' }}>
                {selectedMessage.is_read ? 'Read Inquiry' : 'New Unread Inquiry'}
              </span>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>
                {selectedMessage.subject || 'Client Inquiry'}
              </h2>
            </div>

            <div style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.9rem' }}>
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>From:</strong> {selectedMessage.name} ({selectedMessage.email})
              </div>
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>Date:</strong> {new Date(selectedMessage.created_at).toLocaleString()}
              </div>
            </div>

            <div style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, whiteSpace: 'pre-wrap', marginBottom: '2rem' }}>
              {selectedMessage.message}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)' }}>
              <a
                href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject || 'Inquiry')}`}
                className="btn btn-primary btn-sm"
              >
                <Mail size={16} />
                <span>Reply via Email</span>
              </a>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={() => handleToggleRead(selectedMessage)}
                  className="btn btn-secondary btn-sm"
                >
                  {selectedMessage.is_read ? 'Mark as Unread' : 'Mark as Read'}
                </button>
                <button
                  onClick={() => handleDelete(selectedMessage.id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
