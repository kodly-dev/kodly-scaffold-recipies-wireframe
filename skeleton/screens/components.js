import React, { useState } from 'react';
import { Button, Field, Panel, Placeholder } from '../components/wireframe.js';
import { useTranslation } from '../components/i18n.js';

export default function Components() {
  const { t } = useTranslation('components');
  const [message, setMessage] = useState('');
  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <h1>{t('components')}</h1>
          <p className="description">{t('description')}</p>
        </div>
      </div>
      <div className="component-grid">
        <Panel title={t('text')}>
          <h1>{t('pageHeading')}</h1>
          <h2>{t('sectionHeading')}</h2>
          <p>{t('body')}</p>
          <small>{t('supportingText')}</small>
        </Panel>
        <Panel title={t('actions')}>
          <div className="wf-actions">
            <Button onClick={() => setMessage(t('actionComplete'))}>
              {t('primaryAction')}
            </Button>
            <Button variant="secondary" onClick={() => setMessage('')}>
              {t('clear')}
            </Button>
            <Button disabled>{t('unavailable')}</Button>
          </div>
          <p role="status">{message}</p>
          <a className="text-button" href="#/project-overview">
            {t('textLink')}
          </a>
        </Panel>
        <Panel title={t('formFields')}>
          <Field label={t('name')} placeholder={t('namePlaceholder')} />
          <label className="wf-field">
            <span>{t('status')}</span>
            <select defaultValue="Draft">
              <option value="Draft">{t('draft')}</option>
              <option value="Ready">{t('ready')}</option>
            </select>
          </label>
          <label className="wf-checkbox">
            <input type="checkbox" />
            {t('exampleOption')}
          </label>
        </Panel>
        <Panel title={t('media')}>
          <Placeholder label={t('imagePlaceholder')} compact />
        </Panel>
        <Panel title={t('emptyState')}>
          <div className="empty-state">
            <h2>{t('noItems')}</h2>
            <p>{t('emptyDescription')}</p>
            <Button href="#/project-overview" variant="secondary">
              {t('viewExample')}
            </Button>
          </div>
        </Panel>
        <Panel title={t('statusLabels')}>
          <div className="wf-actions">
            {['draft', 'ready', 'done'].map((status) => (
              <span key={status} className="wf-tag">
                {t(status)}
              </span>
            ))}
          </div>
          <p className="description">{t('statusDescription')}</p>
        </Panel>
      </div>
    </div>
  );
}
