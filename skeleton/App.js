import React, { useState } from 'react';
import { routes } from './route.js';
import { Brand } from './components/brand.js';
import { Router, useLocation } from './components/router.js';
import { I18nProvider, LanguageSwitcher, useTranslation } from './components/i18n.js';
import { AuthProvider } from './components/auth.js';
import { readPreference, writePreference } from './components/preview-events.js';
import './styles.css';
import './library.css';

export default function App() {
  return <I18nProvider><AuthProvider><Router><Library /></Router></AuthProvider></I18nProvider>;
}
function Library() {
  const { path } = useLocation();
  const { t } = useTranslation();
  const [theme, setTheme] = useState(() => readPreference('theme', ['system', 'light', 'dark'], 'system'));
  const route = routes.find((route) => route.path === path);
  const Screen = route?.component;
  return (
    <div className="library" data-theme={theme}>
      <header className="masthead">
        <a className="brand-link" href="#/"><Brand /></a>
        <span className="masthead-label">{t('Project library')}</span>
        <div className="preferences"><LanguageSwitcher /><label className="theme-picker">{t('Appearance')}
          <select value={theme} onChange={(event) => { setTheme(event.target.value); writePreference('theme', event.target.value); }}>
            <option value="system">{t('System')}</option><option value="light">{t('Light')}</option><option value="dark">{t('Dark')}</option>
          </select>
        </label></div>
      </header>
      <main>{Screen ? <Screen key={path} {...route.props} /> : <section className="page"><h1>{t('Screen not found')}</h1><a href="#/">{t('Back to the library')}</a></section>}</main>
      <footer className="site-footer"><span>{t('One shared place for the why and the how.')}</span><span>{t('Documents & wireframes · Kodly')}</span></footer>
    </div>
  );
}
