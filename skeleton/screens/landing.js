import React, { useState } from 'react';
import { ArrowUpRight, BookOpen, PanelsTopLeft, FileText, Check } from 'lucide-react';

import { useTranslation } from '../components/i18n.js';

const guides = [
  { title: 'Project brief', path: 'docs/project-brief.md', detail: 'Define the problem, the people and the outcomes.', text: 'Start with the problem you are solving. Capture who it affects, what success looks like and the decisions your team has agreed. Ask Kodly Scribe to turn your source material into a shared brief.' },
  { title: 'Working with wireframes', path: 'docs/wireframes.md', detail: 'Explore an idea before committing to the implementation.', text: 'Screens live in screens/ and share components, styles and translations. Register each screen in route.js. Use realistic sample content, label example data, and keep navigation and controls interactive.' },
];

export default function Landing() {
  const { t } = useTranslation();
  const [guide, setGuide] = useState(null);
  return (
    <div className="page">
      <section className="intro">
        <p className="eyebrow">{t("Think together. Build with clarity.")}</p>
        <h1>{t('A home for your')}<br /><em>{t("project’s thinking.")}</em></h1>
        <p className="lead">{t("Keep the context close: shared documents, decisions and screens that bring the idea to life.")}</p>
      </section>
      <div className="library-grid">
        <section className="collection" aria-labelledby="documents-title">
          <div className="collection-heading"><span className="section-icon"><BookOpen size={20} /></span><div><h2 id="documents-title">{t("Documents")}</h2><p>{t("The knowledge behind the work")}</p></div><span className="count">02</span></div>
          {guides.map((item) => <button className="document-row" key={item.path} onClick={() => setGuide(item)}>
            <FileText size={19} /><span><strong>{t(item.title)}</strong><small>{t(item.detail)}</small><code>{item.path}</code></span><ArrowUpRight size={18} />
          </button>)}
          <div className="collection-note"><Check size={15} />{t("Edit with Scribe, then review and publish in Kodly.")}</div>
        </section>
        <section className="collection wireframes" aria-labelledby="wireframes-title">
          <div className="collection-heading"><span className="section-icon"><PanelsTopLeft size={20} /></span><div><h2 id="wireframes-title">{t("Wireframes")}</h2><p>{t("Make the idea tangible")}</p></div><span className="count">06</span></div>
          <a href="#/project-overview" className="wireframe-card">
            <div className="mini-preview" aria-hidden="true"><div className="mini-sidebar"><span /><span /><span /></div><div className="mini-content"><b>{t("Project overview")}</b><span className="mini-line" /><div className="mini-columns"><span /><span /><span /></div><span className="mini-line short" /></div></div>
            <div className="wireframe-caption"><span><strong>{t("Project overview")}</strong><small>{t("An interactive starter screen")}</small></span><ArrowUpRight size={20} /></div>
          </a>
          <nav className="screen-links" aria-label={t("Account screens")}>{[["login", "Sign in"], ["signup", "Create an account"], ["forgot-password", "Forgot password"], ["reset-password", "Reset password"], ["dashboard", "Dashboard"]].map(([path, title]) => <a key={path} href={`#/${path}`}>{t(title)}</a>)}</nav>
          <p className="collection-note">{t("A starting point to adapt to your project.")}</p>
        </section>
      </div>
      {guide ? <section className="guide" aria-labelledby="guide-title">
        <div className="guide-header"><div><p className="eyebrow">{t("Getting started")}</p><h2 id="guide-title">{t(guide.title)}</h2></div><button className="text-button" onClick={() => setGuide(null)}>{t("Close guide")}</button></div>
        <p>{t(guide.text)}</p><code>{guide.path}</code>
      </section> : null}
    </div>
  );
}
