# Project wireframes

Sketch this project's screens and user flows before implementation.

- `project.json`: your project name; editable independently of the screens.
- `screens/`: small React screen files, registered in `route.js`.
- `components/wireframe.js`: buttons, fields, panels and image placeholders.
- `library.css`: grayscale visual rules; keep layout and interaction clear before adding branding.
- `docs/project-brief.md`: the audience, goals, flows and decisions behind the screens.
- `locales/{screen}-en.json` / `-ja.json`: each screen's English and Japanese labels.
- `docs/{screen}-en.md` / `-ja.md`: matching requirements, shown alongside that screen in Studio.

Keep each route equal to its screen filename (`login.js` → `/login`); landing uses `/`.
Use the generator-compatible translation interface: `useTranslation('login')` and `t('title')`,
or `useTranslation()` and `t('login.title')`. Shared labels use the `common` namespace.
See `docs/wireframes.md` for the new-screen checklist.

Open this Requirements project in Wireframe Studio. Sandpack renders `App.js` directly.
There is no application server, package installation, build command or health check.

The initial screens and all data are examples. Replace them with the project's agreed requirements.
Account screens simulate navigation only; never enter real credentials.
