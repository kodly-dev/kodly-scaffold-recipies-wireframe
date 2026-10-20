import { test } from 'node:test';
import assert from 'node:assert/strict';
import { translate } from '../skeleton/components/translations.js';
const resources = {
  common: { back: 'Back' },
  login: { title: 'Sign in', welcome: 'Hello {{name}}' },
};
test('supports the original namespaced and qualified translation calls', () => {
  assert.equal(translate(resources, 'title', 'login'), 'Sign in');
  assert.equal(translate(resources, 'login.title'), 'Sign in');
  assert.equal(translate(resources, 'back', 'login'), 'Back');
  assert.equal(
    translate(resources, 'unknown', 'login', 'Fallback'),
    'Fallback',
  );
  assert.equal(
    translate(resources, 'welcome', 'login', undefined, { name: 'A $& B' }),
    'Hello A $& B',
  );
});
