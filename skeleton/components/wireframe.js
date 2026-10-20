import React from 'react';

/** Small React primitives for sketching your project's screens. */
export function Button({ href, variant = 'primary', children, ...props }) {
  const className = `wf-button ${variant === 'secondary' ? 'wf-button-secondary' : ''}`;
  return href ? <a href={href} className={className} {...props}>{children}</a>
    : <button className={className} {...props}>{children}</button>;
}
export function Panel({ title, children }) {
  return <section className="wf-panel">{title ? <h2>{title}</h2> : null}{children}</section>;
}
export function Placeholder({ label, compact = false }) {
  return <div className={`wf-placeholder ${compact ? 'wf-placeholder-compact' : ''}`} role="img" aria-label={label}>
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0L100 100M100 0L0 100" /></svg>
    <span>{label}</span>
  </div>;
}
export function Field({ label, hint, ...props }) {
  return <label className="wf-field"><span>{label}</span><input {...props} />{hint ? <small>{hint}</small> : null}</label>;
}
