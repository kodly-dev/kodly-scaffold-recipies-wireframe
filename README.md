# Kodly Requirements recipe

A small, neutral starting point for a user's own product wireframes.
It replaces `yo kodly-requirements` using the existing Kodly Git-recipe scaffolder.
The generated files run directly in Wireframe Studio's **Sandpack** preview.
There is no separate app server, build command, health check or npm generator.

## What stays familiar

- `App.js`, `screens/`, `components/`, `locales/` and `docs/`.
- Landing, dashboard, login, signup, forgot-password and reset-password screens.
- Lowercase, hyphen-separated screen names; `/{screen}` routes, with `/` for landing.
- `locales/{screen}-en.json` / `-ja.json` and matching `docs/{screen}-en.md` / `-ja.md`.
- The generator's `Router`, `Route`, `Link`, `useNavigate`, `useLocation` and namespaced
  `useTranslation` interfaces. Shared labels use `common`.
- Parent preview navigation (`STUDIO_NAVIGATE`, `WIREFRAME_READY`, `WIREFRAME_PATH_CHANGED`).
- English/Japanese with language-change messages in both directions.
- React and the dependencies already supplied by Wireframe Studio.
- An editable `project.json` carries the owning workspace's name. No product branding is imposed.

## What is simpler

- One route registry (`route.js`) and one shared account form, with small named screen files.
- Browser hash history handles navigation, back, forward and refresh.
- Grayscale CSS tokens replace runtime Tailwind CDN dependence. `library.css` keeps composition
  styling separate from the shared `styles.css` supplied by Wireframe Studio.
- Appearance follows the system unless the viewer chooses light/dark; theme and language
  preferences tolerate blocked embedded storage.
- Demo authentication is labelled, stays in memory and never stores or sends passwords.
- Forms use native accessible labels and validation, with inline results.
- Buttons, fields, panels and crossed image placeholders form a small reusable library.
- Home, item list/detail and account screens are examples to replace with the user's requirements.
- The Components screen demonstrates the primitives; project knowledge starts in `docs/project-brief.md`.

## Scaffold

The API invokes `kodly scaffold init` with this repository's URL. The existing CLI chooses
the latest published stable `skeleton@<version>` tag. There is no API version constant.
CLI 1.0.18 keys its cache by version, so **always use a repository-specific cache**:

```sh
KODLY_RECIPES_REPO_URL=https://github.com/kodly-dev/kodly-scaffold-recipies-wireframe.git \
KODLY_SKELETON_CACHE_DIR=/tmp/kodly-wireframe-skeleton-cache \
kodly scaffold init -g dev.kodly -n requirements -p /tmp/my-requirements
```

Open the resulting Requirements project in Wireframe Studio. The generated source does
not include this repository's development/test package.

## Validate and release

Run `npm test` for manifest, Studio naming/locale/document contracts, translations, message
boundaries and preferences. Verify the generated project through Wireframe Studio: select
each screen from Studio's dropdown, check its paired requirements in both languages,
open standalone documents, test forms and navigation, and inspect a narrow viewport.

Commit changes, update `skeleton/manifest.json`, and publish the matching immutable
`skeleton@<version>` tag. Only tagged versions are releases; changing `main` alone does not
change what new projects receive. Existing project files are never reinitialized automatically.
