import React from 'react';
import project from '../project.json';
import { useTranslation } from './i18n.js';

export function Brand() {
  const { t } = useTranslation();
  return <span className="project-name">{t(project.name)}</span>;
}
