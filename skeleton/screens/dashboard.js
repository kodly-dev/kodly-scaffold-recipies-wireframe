import React from 'react';
import { useAuth } from '../components/auth.js';
import { Link, useNavigate } from '../components/router.js';
import { useTranslation } from '../components/i18n.js';
import Overview from './project-overview.js';

export default function Dashboard() {
  const { isAuthenticated, setAuthenticated } = useAuth();
  const { navigate } = useNavigate();
  const { t } = useTranslation('dashboard');
  if (!isAuthenticated)
    return (
      <section className="page">
        <h1>{t('title')}</h1>
        <p className="lead">{t('description')}</p>
        <Link to="/login">{t('login')}</Link>
      </section>
    );
  return (
    <>
      <div className="demo-session">
        <span>{t('exampleSession')}</span>
        <button
          className="text-button"
          onClick={() => {
            setAuthenticated(false);
            navigate('/login');
          }}
        >
          {t('signOut')}
        </button>
      </div>
      <Overview />
    </>
  );
}
