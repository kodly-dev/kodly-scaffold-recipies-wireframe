# Building your wireframes

Each screen is a requirement, its interactive preview and its translated copy kept together.

1. Create `screens/{screen-name}.js` using lowercase names separated by hyphens.
2. Register it in `route.js`. The path is `/{screen-name}`; only `screens/landing.js` uses `/`.
3. Add `locales/{screen-name}-en.json` and `locales/{screen-name}-ja.json` and register both in `components/i18n.js`.
4. Add `docs/{screen-name}-en.md` and `docs/{screen-name}-ja.md`. Studio pairs these documents with the screen by filename.
5. Link the screen from an appropriate existing screen. Test both languages in Studio's screen selector and split view.

Use `useTranslation('login')` with `t('title')`, or `useTranslation()` with `t('login.title')`. Shared labels live in `common`. The legacy `landingPage`, `forgotPassword` and `resetPassword` namespaces remain available. Fallback text and `{{variable}}` interpolation follow the original generator's interface.

Keep project-wide documents in `docs/` under descriptive names, distinct from screen names. Studio displays these separately. Use `-en.md` / `-ja.md` when a document has translated versions.

Reuse the small primitives in `components/wireframe.js`. Keep the grayscale styling, thin outlines and image placeholders until a real visual design is agreed. All sample data and sign-in behavior stay in memory. This project runs inside Sandpack; it does not need a separate server or build configuration.
