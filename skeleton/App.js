import React, { useState } from 'react';
import { routes } from './route.js';
import { Brand } from './components/brand.js';
import { Router, useLocation, Link } from './components/router.js';
import { I18nProvider, LanguageSwitcher, useTranslation } from './components/i18n.js';
import { AuthProvider } from './components/auth.js';
import { readPreference, writePreference } from './components/preview-events.js';
import './styles.css';
import './library.css';

export default function App() {
  return <I18nProvider><AuthProvider><Router><Wireframes /></Router></AuthProvider></I18nProvider>;
}
function Wireframes() {
  const { path } = useLocation();
  const { t } = useTranslation();
  const [theme, setTheme] = useState(() => readPreference('theme', ['system', 'light', 'dark'], 'system'));
  const route = routes.find((item) => item.path === path);
  const Screen = route?.component;
  return (
    <div className="wireframe" data-theme={theme}>
      <header className="prototype-bar">
        <Link to="/" className="project-link"><Brand /></Link>
        <span className="prototype-label">{t('Wireframes')}</span>
        <div className="preferences"><LanguageSwitcher /><label className="theme-picker">{t('Appearance')}
          <select value={theme} onChange={(event) => { setTheme(event.target.value); writePreference('theme', event.target.value); }}>
            <option value="system">{t('System')}</option><option value="light">{t('Light')}</option><option value="dark">{t('Dark')}</option>
          </select>
        </label></div>
      </header>
      <nav className="screen-nav" aria-label={t('Screens')}>
        {routes.map((item) => <Link key={item.path} to={item.path} aria-current={path === item.path ? 'page' : undefined}>{t(item.name)}</Link>)}
      </nav>
      <main>
        <div className="canvas-caption"><span>{t(route?.name || 'Screen not found')}</span><span>{t('Sample content · Adapt to your requirements')}</span></div>
        {Screen ? <Screen key={path} /> : <section className="page"><h1>{t('Screen not found')}</h1><Link to="/">{t('Home')}</Link></section>}
      </main>
    </div>
  );
}
