import React from 'react';
import { Brand } from '../components/brand.js';
import { Button, Panel, Placeholder } from '../components/wireframe.js';
import { useTranslation } from '../components/i18n.js';

export default function Landing() {
  const { t } = useTranslation('landingPage');
  return (
    <div className="page">
      <div className="screen-frame">
        <header className="app-header">
          <div className="app-identity">
            <span className="logo-placeholder" aria-hidden="true" />
            <Brand />
          </div>
          <nav aria-label={t('navigation')}>
            <a href="#/project-overview">{t('overview')}</a>
            <a href="#/login">{t('login')}</a>
          </nav>
        </header>
        <div className="screen-content">
          <section className="home-intro">
            <div className="wf-stack">
              <p className="annotation">{t('eyebrow')}</p>
              <h1>{t('title')}</h1>
              <p className="description">{t('description')}</p>
              <div className="wf-actions">
                <Button href="#/project-overview">{t('explore')}</Button>
                <Button href="#/signup" variant="secondary">
                  {t('signup')}
                </Button>
              </div>
            </div>
            <Placeholder label={t('image')} />
          </section>
          <div className="wf-grid">
            {['featureOne', 'featureTwo', 'featureThree'].map((title) => (
              <Panel key={title} title={t(title)}>
                <p className="description">{t('featureDescription')}</p>
              </Panel>
            ))}
          </div>
        </div>
        <footer className="app-footer">
          <Brand />
          <span>{t('footer')}</span>
        </footer>
      </div>
    </div>
  );
}
