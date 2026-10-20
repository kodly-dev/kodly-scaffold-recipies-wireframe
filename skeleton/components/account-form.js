import React, { useState } from 'react';
import { Link, useNavigate } from './router.js';
import { useTranslation } from './i18n.js';
import { useAuth } from './auth.js';

const namespaces = {
  login: 'login',
  signup: 'signup',
  forgot: 'forgotPassword',
  reset: 'resetPassword',
};
export default function Account({ mode = 'login' }) {
  const { t } = useTranslation(namespaces[mode]);
  const { navigate } = useNavigate();
  const { setAuthenticated } = useAuth();
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const submit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (mode === 'reset' && data.get('password') !== data.get('confirm')) {
      setError(t('mismatch'));
      return;
    }
    setError('');
    if (mode === 'forgot') setResult(t('success'));
    else if (mode === 'reset') setResult(t('success'));
    else {
      setAuthenticated(true);
      navigate('/dashboard');
    }
    event.currentTarget.reset();
  };
  return (
    <section className="page account">
      <Link to="/">{t('backToScreens')}</Link>
      <div className="account-card">
        <p className="eyebrow">{t('interactiveExample')}</p>
        <h1>{t('title')}</h1>
        <p className="muted">{t('exampleNotice')}</p>
        {result ? (
          <div role="status" className="form-result">
            <p>{result}</p>
            <Link to={mode === 'forgot' ? '/reset-password' : '/login'}>
              {t(mode === 'forgot' ? 'next' : 'login')}
            </Link>
          </div>
        ) : (
          <form onSubmit={submit}>
            {mode !== 'reset' ? (
              <label>
                {t('emailLabel')}
                <input
                  name="email"
                  type="email"
                  placeholder="alex@example.com"
                  required
                  autoComplete="off"
                />
              </label>
            ) : null}
            {mode !== 'forgot' ? (
              <label>
                {t('passwordLabel')}
                <input
                  name="password"
                  type="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                />
                <small>{t('passwordHint')}</small>
              </label>
            ) : null}
            {mode === 'signup' ? (
              <label className="checkbox-label">
                <input type="checkbox" required />
                {t('demoConsent')}
              </label>
            ) : null}
            {mode === 'reset' ? (
              <label>
                {t('confirmPasswordLabel')}
                <input
                  name="confirm"
                  type="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                />
              </label>
            ) : null}
            {error ? (
              <p role="alert" className="form-error">
                {error}
              </p>
            ) : null}
            <button className="primary-button">
              {t(mode === 'forgot' ? 'submit' : 'title')}
            </button>
          </form>
        )}
        <nav className="account-links" aria-label={t('accountScreens')}>
          {mode !== 'login' ? (
            <Link to="/login">{t('login')}</Link>
          ) : (
            <>
              <Link to="/signup">{t('signup')}</Link>
              <Link to="/forgot-password">{t('forgotPassword')}</Link>
            </>
          )}
        </nav>
      </div>
    </section>
  );
}
