import React, { useState } from 'react';
import { Button, Field, Panel, Placeholder } from '../components/wireframe.js';
import { useTranslation } from '../components/i18n.js';

export default function Components() {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  return <div className="page"><div className="page-heading"><div><h1>{t('Components')}</h1><p className="description">{t('Simple building blocks for your screens.')}</p></div></div>
    <div className="component-grid">
      <Panel title={t('Text')}><h1>{t('Page heading')}</h1><h2>{t('Section heading')}</h2><p>{t('Body text explains the content and next action.')}</p><small>{t('Supporting text')}</small></Panel>
      <Panel title={t('Actions')}><div className="wf-actions"><Button onClick={() => setMessage(t('Example action completed.'))}>{t('Primary action')}</Button><Button variant="secondary" onClick={() => setMessage('')}>{t('Clear')}</Button><Button disabled>{t('Unavailable')}</Button></div><p role="status">{message}</p><a className="text-button" href="#/project-overview">{t('Text link')}</a></Panel>
      <Panel title={t('Form fields')}><Field label={t('Name')} placeholder={t('Enter a name')} /><label className="wf-field"><span>{t('Status')}</span><select defaultValue="Draft"><option value="Draft">{t('Draft')}</option><option value="Ready">{t('Ready')}</option></select></label><label className="wf-checkbox"><input type="checkbox" />{t('Example option')}</label></Panel>
      <Panel title={t('Media')}><Placeholder label={t('Image placeholder')} compact /></Panel>
      <Panel title={t('Empty state')}><div className="empty-state"><h2>{t('No items yet')}</h2><p>{t('Explain what belongs here and how to add it.')}</p><Button href="#/project-overview" variant="secondary">{t('View example')}</Button></div></Panel>
      <Panel title={t('Status labels')}><div className="wf-actions">{['Draft', 'Ready', 'Done'].map((status) => <span key={status} className="wf-tag">{t(status)}</span>)}</div><p className="description">{t('Use words to distinguish states, not colour alone.')}</p></Panel>
    </div>
  </div>;
}
