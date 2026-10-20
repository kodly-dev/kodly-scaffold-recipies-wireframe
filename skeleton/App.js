import React, { useState } from 'react';
import { routes } from './route.js';
import { Brand } from './components/brand.js';
import { Router, Route, useLocation, Link } from './components/router.js';
import {
  I18nProvider,
  LanguageSwitcher,
  useTranslation,
} from './components/i18n.js';
import { AuthProvider } from './components/auth.js';
import {
  readPreference,
  writePreference,
} from './components/preview-events.js';
import './styles.css';
import './library.css';

export default function App() {
  return (
    <I18nProvider>
      <AuthProvider>
        <Router>
          <Wireframes />
        </Router>
      </AuthProvider>
    </I18nProvider>
  );
}
function Wireframes() {
  const { path } = useLocation();
  const { t } = useTranslation();
  const [theme, setTheme] = useState(() =>
    readPreference('theme', ['system', 'light', 'dark'], 'system'),
  );
  const route = routes.find((item) => item.path === path);
  const Screen = route?.component;
  return (
    <div className="wireframe" data-theme={theme}>
      <header className="prototype-bar">
        <Link to="/" className="project-link">
          <Brand />
        </Link>
        <span className="prototype-label">{t('wireframes')}</span>
        <div className="preferences">
          <LanguageSwitcher />
          <label className="theme-picker">
            {t('appearance')}
            <select
              value={theme}
              onChange={(event) => {
                setTheme(event.target.value);
                writePreference('theme', event.target.value);
              }}
            >
              <option value="system">{t('system')}</option>
              <option value="light">{t('light')}</option>
              <option value="dark">{t('dark')}</option>
            </select>
          </label>
        </div>
      </header>
      <main>
        <div className="canvas-caption">
          <span>{t(route?.name || 'unknownScreen')}</span>
          <span>{t('sampleContent')}</span>
        </div>
        {Screen ? (
          <Route key={path} path={path} component={Screen} />
        ) : (
          <section className="page">
            <h1>{t('unknownScreen')}</h1>
            <Link to="/">{t('home')}</Link>
          </section>
        )}
      </main>
    </div>
  );
}
