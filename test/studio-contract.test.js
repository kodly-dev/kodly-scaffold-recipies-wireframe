import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../skeleton');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const screens = fs
  .readdirSync(path.join(root, 'screens'))
  .filter((file) => file.endsWith('.js'))
  .map((file) => file.slice(0, -3));
test('every screen follows Studio route, locale and document naming conventions', () => {
  const routes = read('route.js');
  const resources = read('components/i18n.js');
  for (const screen of screens) {
    assert.match(screen, /^[a-z]+(?:-[a-z]+)*$/);
    assert.ok(
      routes.includes(`./screens/${screen}.js`),
      `Registered screen ${screen}`,
    );
    const route = screen === 'landing' ? '/' : `/${screen}`;
    assert.ok(routes.includes(`path: '${route}'`), `Studio route ${route}`);
    for (const language of ['en', 'ja']) {
      const locale = `locales/${screen}-${language}.json`;
      assert.ok(fs.existsSync(path.join(root, locale)), locale);
      assert.ok(
        resources.includes(`../${locale}`),
        `i18n registration ${locale}`,
      );
      assert.match(
        read(`docs/${screen}-${language}.md`),
        /^# /,
        `Screen document ${screen}/${language}`,
      );
    }
    const en = JSON.parse(read(`locales/${screen}-en.json`));
    const ja = JSON.parse(read(`locales/${screen}-ja.json`));
    assert.deepEqual(Object.keys(en).sort(), Object.keys(ja).sort(), screen);
    assert.ok(
      Object.values(ja).every(
        (text) => typeof text === 'string' && text.trim(),
      ),
    );
  }
});
