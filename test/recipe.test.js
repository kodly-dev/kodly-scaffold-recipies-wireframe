import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { previewMessage, readPreference, writePreference } from '../skeleton/components/preview-events.js';

const root = path.resolve(import.meta.dirname, '../skeleton');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8'));
test('the manifest is complete, portable and contains no app server or generator', () => {
  const files = fs.readdirSync(root, { recursive: true }).filter((file) => fs.statSync(path.join(root, file)).isFile() && file !== 'manifest.json').sort();
  assert.deepEqual(manifest.includes.toSorted(), files);
  for (const file of manifest.includes) assert.ok(!file.startsWith('/') && !file.includes('..'));
  for (const file of ['App.js', 'route.js', 'components/router.js', 'components/i18n.js', 'screens/login.js',
    'screens/signup.js', 'screens/forgot-password.js', 'screens/reset-password.js', 'screens/dashboard.js',
    'docs/project-brief.md', 'locales/common-ja.json']) assert.ok(files.includes(file), file);
  for (const file of ['package.json', 'index.html', 'vite.config.js']) assert.ok(!files.includes(file), file);
});
test('preview messages only accept navigation and known languages from the embedding parent', () => {
  const parent = {};
  const message = (data, source = parent) => previewMessage({ data, source }, parent);
  assert.deepEqual(message({ type: 'STUDIO_NAVIGATE', path: '/forgot-password' }), { path: '/forgot-password' });
  assert.deepEqual(message({ type: 'STUDIO_LANGUAGE_CHANGED', language: 'ja' }), { language: 'ja' });
  for (const route of ['https://example.com', '//example.com', '//example', '/..', 'javascript:alert(1)', '/<svg>'])
    assert.equal(message({ type: 'STUDIO_NAVIGATE', path: route }), null);
  assert.equal(message({ type: 'STUDIO_NAVIGATE', path: '/' }, {}), null);
  assert.equal(message({ type: 'STUDIO_LANGUAGE_CHANGED', language: 'unknown' }), null);
});
test('theme and language survive storage restrictions and invalid saved preferences', () => {
  globalThis.localStorage = { getItem: () => { throw new Error('blocked'); }, setItem: () => { throw new Error('blocked'); } };
  assert.equal(readPreference('theme', ['dark'], 'system'), 'system');
  assert.doesNotThrow(() => writePreference('theme', 'dark'));
  globalThis.localStorage = { getItem: () => 'unexpected' };
  assert.equal(readPreference('theme', ['dark'], 'system'), 'system');
  delete globalThis.localStorage;
});
test('English and Japanese expose the same translations', () => {
  const en = JSON.parse(fs.readFileSync(path.join(root, 'locales/common-en.json')));
  const ja = JSON.parse(fs.readFileSync(path.join(root, 'locales/common-ja.json')));
  assert.deepEqual(Object.keys(en).sort(), Object.keys(ja).sort());
  assert.ok(Object.values(ja).every((text) => typeof text === 'string' && text.trim()));
});
