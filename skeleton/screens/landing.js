import React from 'react';
import { Brand } from '../components/brand.js';
import { Button, Panel, Placeholder } from '../components/wireframe.js';
import { useTranslation } from '../components/i18n.js';

export default function Landing() {
  const { t } = useTranslation();
  return <div className="page"><div className="screen-frame">
    <header className="app-header"><div className="app-identity"><span className="logo-placeholder" aria-hidden="true" /><Brand /></div>
      <nav aria-label={t('Example application navigation')}><a href="#/project-overview">{t('Overview')}</a><a href="#/login">{t('Sign in')}</a></nav>
    </header>
    <div className="screen-content">
      <section className="home-intro"><div className="wf-stack"><p className="annotation">{t('Headline')}</p><h1>{t('Your page title')}</h1>
        <p className="description">{t('Describe what your users can do here and the value it gives them.')}</p>
        <div className="wf-actions"><Button href="#/project-overview">{t('Explore example')}</Button><Button href="#/signup" variant="secondary">{t('Create an account')}</Button></div>
      </div><Placeholder label={t('Image or illustration')} /></section>
      <div className="wf-grid">{['First feature', 'Second feature', 'Third feature'].map((title) => <Panel key={title} title={t(title)}><p className="description">{t('A short description of this part of your product.')}</p></Panel>)}</div>
    </div>
    <footer className="app-footer"><Brand /><span>{t('Footer content')}</span></footer>
  </div></div>;
}
