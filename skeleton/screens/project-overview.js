import React, { useState } from 'react';
import { Button, Field, Panel } from '../components/wireframe.js';
import { useTranslation } from '../components/i18n.js';

const initial = [
  { name: 'itemA', status: 'draft' },
  { name: 'itemB', status: 'ready' },
  { name: 'itemC', status: 'draft' },
];
export default function Overview() {
  const { t } = useTranslation('overview');
  const [query, setQuery] = useState('');
  const [items, setItems] = useState(initial);
  const [selection, select] = useState(null);
  const filtered = items.filter((item) =>
    t(item.name).toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className="page">
      <div className="screen-frame screen-content">
        <div className="page-heading">
          <div>
            <h1>{t('overview')}</h1>
            <p className="description">{t('description')}</p>
          </div>
          <Button
            onClick={() =>
              setItems((current) => [
                ...current,
                { name: 'newItem', status: 'draft' },
              ])
            }
          >
            {t('addItem')}
          </Button>
        </div>
        <div className="wf-grid metrics">
          <Panel title={t('allItems')}>
            <strong>{items.length}</strong>
          </Panel>
          <Panel title={t('draft')}>
            <strong>
              {items.filter((item) => item.status === 'draft').length}
            </strong>
          </Panel>
          <Panel title={t('ready')}>
            <strong>
              {items.filter((item) => item.status === 'ready').length}
            </strong>
          </Panel>
        </div>
        <Field
          label={t('findItem')}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t('searchPlaceholder')}
        />
        <div className="wf-table-scroll">
          <table className="wf-table">
            <thead>
              <tr>
                <th>{t('name')}</th>
                <th>{t('status')}</th>
                <th>
                  <span className="sr-only">{t('action')}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={items.indexOf(item)}>
                  <td>{t(item.name)}</td>
                  <td>
                    <span className="wf-tag">{t(item.status)}</span>
                  </td>
                  <td>
                    <button
                      className="text-button"
                      onClick={() => select(item)}
                    >
                      {t('view')}
                      <span className="sr-only"> {t(item.name)}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!filtered.length ? (
          <p className="empty-state">{t('noMatches')}</p>
        ) : null}
        {selection ? (
          <section className="item-detail" aria-label={t('details')}>
            <div className="page-heading">
              <h2>{t(selection.name)}</h2>
              <button className="text-button" onClick={() => select(null)}>
                {t('close')}
              </button>
            </div>
            <p className="description">{t('detailsDescription')}</p>
            <Button
              variant="secondary"
              onClick={() => {
                setItems((current) =>
                  current.map((item) =>
                    item === selection ? { ...item, status: 'ready' } : item,
                  ),
                );
                select(null);
              }}
            >
              {t('markReady')}
            </Button>
          </section>
        ) : null}
        <p className="annotation">{t('sampleData')}</p>
      </div>
    </div>
  );
}
