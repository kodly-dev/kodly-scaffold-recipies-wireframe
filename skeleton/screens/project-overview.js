import React, { useState } from 'react';
import { ArrowLeft, Check, Circle, Monitor, Smartphone } from 'lucide-react';

import { useTranslation } from '../components/i18n.js';

const initial = [{ title: 'Capture the project brief', done: true }, { title: 'Review the first wireframe', done: false }, { title: 'Agree on the next steps', done: false }];
export default function Overview() {
  const { t } = useTranslation();
  const [tasks, setTasks] = useState(initial);
  const [narrow, setNarrow] = useState(false);
  return (
    <div className="page">
      <div className="preview-toolbar"><a href="#/"><ArrowLeft size={16} />{t("Library")}</a><span>{t("Project overview")} <small>· {t("Example wireframe")}</small></span><div className="device-controls"><button aria-label="Desktop preview" aria-pressed={!narrow} onClick={() => setNarrow(false)}><Monitor size={18} /></button><button aria-label="Mobile preview" aria-pressed={narrow} onClick={() => setNarrow(true)}><Smartphone size={18} /></button></div></div>
      <section className={`example-frame ${narrow ? 'narrow' : ''}`} aria-label="Interactive project overview wireframe">
        <p className="eyebrow">{t("Your workspace")}</p><h1>{t("Good ideas start here.")}</h1><p className="lead">{t("A clear brief, a shared plan and one useful step at a time.")}</p>
        <div className="example-summary"><span className="status-dot" /><strong>{t("Discovery")}</strong><span>{tasks.filter((task) => task.done).length} / {tasks.length} · {t("Steps complete")}</span></div>
        <h2>{t("Next steps")}</h2><p className="muted">{t("Try marking an item complete. These are example tasks.")}</p>
        <div className="task-list">{tasks.map((task, index) => <button key={t(task.title)} aria-pressed={task.done} onClick={() => setTasks((current) => current.map((item, i) => i === index ? { ...item, done: !item.done } : item))}>
          {task.done ? <Check size={18} /> : <Circle size={18} />}<span>{t(task.title)}</span><small>{t(task.done ? 'Done' : 'To do')}</small>
        </button>)}</div>
        <button className="text-button" onClick={() => setTasks(initial)}>{t("Reset example")}</button>
      </section>
    </div>
  );
}
