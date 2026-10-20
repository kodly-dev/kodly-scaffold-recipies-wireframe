import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import commonEn from '../locales/common-en.json';
import commonJa from '../locales/common-ja.json';
import landingPageEn from '../locales/landing-en.json';
import landingPageJa from '../locales/landing-ja.json';
import overviewEn from '../locales/project-overview-en.json';
import overviewJa from '../locales/project-overview-ja.json';
import componentsEn from '../locales/components-en.json';
import componentsJa from '../locales/components-ja.json';
import dashboardEn from '../locales/dashboard-en.json';
import dashboardJa from '../locales/dashboard-ja.json';
import loginEn from '../locales/login-en.json';
import loginJa from '../locales/login-ja.json';
import signupEn from '../locales/signup-en.json';
import signupJa from '../locales/signup-ja.json';
import forgotPasswordEn from '../locales/forgot-password-en.json';
import forgotPasswordJa from '../locales/forgot-password-ja.json';
import resetPasswordEn from '../locales/reset-password-en.json';
import resetPasswordJa from '../locales/reset-password-ja.json';
import { translate } from './translations.js';
import {
  previewMessage,
  readPreference,
  writePreference,
} from './preview-events.js';

const resources = {
  en: {
    common: commonEn,
    landingPage: landingPageEn,
    overview: overviewEn,
    components: componentsEn,
    dashboard: dashboardEn,
    login: loginEn,
    signup: signupEn,
    forgotPassword: forgotPasswordEn,
    resetPassword: resetPasswordEn,
  },
  ja: {
    common: commonJa,
    landingPage: landingPageJa,
    overview: overviewJa,
    components: componentsJa,
    dashboard: dashboardJa,
    login: loginJa,
    signup: signupJa,
    forgotPassword: forgotPasswordJa,
    resetPassword: resetPasswordJa,
  },
};
const Context = createContext(null);
export function I18nProvider({ children }) {
  const [language, update] = useState(() =>
    readPreference('language', Object.keys(resources), 'en'),
  );
  const setLanguage = useCallback((next) => {
    if (!resources[next]) return;
    update(next);
    writePreference('language', next);
    if (window.parent !== window)
      window.parent.postMessage(
        { type: 'WIREFRAME_LANGUAGE_CHANGED', language: next },
        '*',
      );
  }, []);
  useEffect(() => {
    const message = (event) => {
      const request = previewMessage(event, window.parent);
      if (request?.language) setLanguage(request.language);
    };
    window.addEventListener('message', message);
    return () => window.removeEventListener('message', message);
  }, [setLanguage]);
  const value = useMemo(
    () => ({ language, setLanguage, resources: resources[language] }),
    [language, setLanguage],
  );
  return (
    <Context.Provider value={value}>
      <div lang={language}>{children}</div>
    </Context.Provider>
  );
}
// Compatible with the generator: t('login.title') or useTranslation('login').t('title').
export function useTranslation(namespace) {
  const { language, setLanguage, resources } = useContext(Context);
  const t = useCallback(
    (key, fallback, variables) =>
      translate(resources, key, namespace, fallback, variables),
    [resources, namespace],
  );
  return { language, setLanguage, t };
}
export function LanguageSwitcher() {
  const { language, setLanguage, t } = useTranslation();
  return (
    <label className="theme-picker">
      {t('common.language')}
      <select
        value={language}
        onChange={(event) => setLanguage(event.target.value)}
      >
        <option value="en">English</option>
        <option value="ja">日本語</option>
      </select>
    </label>
  );
}
