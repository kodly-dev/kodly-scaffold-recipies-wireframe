import React, { useState } from 'react';
import { Link, useNavigate } from './router.js';
import { useTranslation } from './i18n.js';
import { useAuth } from './auth.js';

const headings = { login: 'Sign in', signup: 'Create an account', forgot: 'Forgot password', reset: 'Reset password' };
export default function Account({ mode = 'login' }) {
  const { t } = useTranslation();
  const { navigate } = useNavigate();
  const { setAuthenticated } = useAuth();
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const submit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (mode === 'reset' && data.get('password') !== data.get('confirm')) {
      setError(t('The passwords must match.')); return;
    }
    setError('');
    if (mode === 'forgot') setResult(t('Example reset link ready. No email was sent.'));
    else if (mode === 'reset') setResult(t('Example password reset complete. No account was changed.'));
    else { setAuthenticated(true); navigate('/dashboard'); }
    event.currentTarget.reset();
  };
  return <section className="page account">
    <Link to="/">{t('Back to screens')}</Link>
    <div className="account-card">
      <p className="eyebrow">{t('Interactive example')}</p><h1>{t(headings[mode])}</h1>
      <p className="muted">{t('This is a wireframe. Use example details, never a real password.')}</p>
      {result ? <div role="status" className="form-result"><p>{result}</p><Link to={mode === 'forgot' ? '/reset-password' : '/login'}>{t(mode === 'forgot' ? 'Try the reset screen' : 'Sign in')}</Link></div> : <form onSubmit={submit}>
        {mode !== 'reset' ? <label>{t('Email')}<input name="email" type="email" placeholder="alex@example.com" required autoComplete="off" /></label> : null}
        {mode !== 'forgot' ? <label>{t('Example password')}<input name="password" type="password" required minLength={8} autoComplete="new-password" /><small>{t('Use at least 8 characters.')}</small></label> : null}
        {mode === 'signup' ? <label className="checkbox-label"><input type="checkbox" required />{t('I understand this is a demo.')}</label> : null}
        {mode === 'reset' ? <label>{t('Confirm password')}<input name="confirm" type="password" required minLength={8} autoComplete="new-password" /></label> : null}
        {error ? <p role="alert" className="form-error">{error}</p> : null}
        <button className="primary-button">{t(mode === 'forgot' ? 'Create example reset link' : headings[mode])}</button>
      </form>}
      <nav className="account-links" aria-label={t('Account screens')}>
        {mode !== 'login' ? <Link to="/login">{t('Sign in')}</Link> : <><Link to="/signup">{t('Create an account')}</Link><Link to="/forgot-password">{t('Forgot password')}</Link></>}
      </nav>
    </div>
  </section>;
}
