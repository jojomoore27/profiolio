import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

let toastFn = null;

export function showToast(message, type = 'success') {
  if (toastFn) {
    toastFn({ message, type, id: Date.now() });
  }
}

export function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    toastFn = (newToast) => {
      setToasts((prev) => [...prev, newToast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
      }, 4000);
    };

    return () => {
      toastFn = null;
    };
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        pointerEvents: 'none'
      }}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="glass-card animate-fade-in"
          style={{
            pointerEvents: 'auto',
            minWidth: '300px',
            maxWidth: '420px',
            padding: '0.9rem 1.2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.8rem',
            borderLeft: `4px solid ${
              toast.type === 'error'
                ? 'var(--status-error)'
                : toast.type === 'info'
                ? 'var(--status-info)'
                : 'var(--status-success)'
            }`,
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            {toast.type === 'error' ? (
              <AlertCircle size={20} color="var(--status-error)" />
            ) : toast.type === 'info' ? (
              <Info size={20} color="var(--status-info)" />
            ) : (
              <CheckCircle2 size={20} color="var(--status-success)" />
            )}
            <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-primary)' }}>
              {toast.message}
            </span>
          </div>
          <button
            onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              padding: '2px'
            }}
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
