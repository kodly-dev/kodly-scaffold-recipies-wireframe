import React, { useState } from 'react';
import { Button, Field, Panel } from '../components/wireframe.js';
import { useTranslation } from '../components/i18n.js';

const initial = [{ name: 'Example item A', status: 'Draft' }, { name: 'Example item B', status: 'Ready' }, { name: 'Example item C', status: 'Draft' }];
export default function Overview() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [items, setItems] = useState(initial);
  const [selection, select] = useState(null);
  const filtered = items.filter((item) => t(item.name).toLowerCase().includes(query.toLowerCase()));
  return <div className="page"><div className="screen-frame screen-content">
    <div className="page-heading"><div><h1>{t('Overview')}</h1><p className="description">{t('Browse and review items. Replace these examples with your project’s content.')}</p></div><Button onClick={() => setItems((current) => [...current, { name: 'New item', status: 'Draft' }])}>{t('Add item')}</Button></div>
    <div className="wf-grid metrics"><Panel title={t('All items')}><strong>{items.length}</strong></Panel><Panel title={t('Draft')}><strong>{items.filter((item) => item.status === 'Draft').length}</strong></Panel><Panel title={t('Ready')}><strong>{items.filter((item) => item.status === 'Ready').length}</strong></Panel></div>
    <Field label={t('Find an item')} type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t('Search by name')} />
    <div className="wf-table-scroll"><table className="wf-table"><thead><tr><th>{t('Name')}</th><th>{t('Status')}</th><th><span className="sr-only">{t('Action')}</span></th></tr></thead><tbody>{filtered.map((item) => <tr key={items.indexOf(item)}><td>{t(item.name)}</td><td><span className="wf-tag">{t(item.status)}</span></td><td><button className="text-button" onClick={() => select(item)}>{t('View')}<span className="sr-only"> {t(item.name)}</span></button></td></tr>)}</tbody></table></div>
    {!filtered.length ? <p className="empty-state">{t('No matching items. Try another name.')}</p> : null}
    {selection ? <section className="item-detail" aria-label={t('Item details')}><div className="page-heading"><h2>{t(selection.name)}</h2><button className="text-button" onClick={() => select(null)}>{t('Close')}</button></div><p className="description">{t('Add the information your users need to make a decision.')}</p><Button variant="secondary" onClick={() => { setItems((current) => current.map((item) => item === selection ? { ...item, status: 'Ready' } : item)); select(null); }}>{t('Mark ready')}</Button></section> : null}
    <p className="annotation">{t('Example data. Changes stay in this preview.')}</p>
  </div></div>;
}
