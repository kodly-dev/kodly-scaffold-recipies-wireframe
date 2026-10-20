import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import ja from '../locales/common-ja.json';
import { previewMessage, readPreference, writePreference } from './preview-events.js';

const Context = createContext(null);
export function I18nProvider({ children }) {
  const [language, update] = useState(() => readPreference('language', ['en', 'ja'], 'en'));
  const setLanguage = useCallback((next) => {
    if (!['en', 'ja'].includes(next)) return;
    update(next);
    writePreference('language', next);
    if (window.parent !== window) window.parent.postMessage({ type: 'WIREFRAME_LANGUAGE_CHANGED', language: next }, '*');
  }, []);
  useEffect(() => {
    const message = (event) => {
      const request = previewMessage(event, window.parent);
      if (request?.language) setLanguage(request.language);
    };
    window.addEventListener('message', message);
    return () => window.removeEventListener('message', message);
  }, [setLanguage]);
  const t = (text) => language === 'ja' ? ja[text] || text : text;
  return <Context.Provider value={{ language, setLanguage, t }}><div lang={language}>{children}</div></Context.Provider>;
}
export function useTranslation() { return useContext(Context); }
export function LanguageSwitcher() {
  const { language, setLanguage, t } = useTranslation();
  return <label className="theme-picker">{t('Language')}<select value={language} onChange={(event) => setLanguage(event.target.value)}>
    <option value="en">English</option><option value="ja">日本語</option>
  </select></label>;
}
