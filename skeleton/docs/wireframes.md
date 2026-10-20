# Wireframe guide

Use these screens to explore this project's requirements. Keep the prototype simple:
layout, content hierarchy and working interactions matter more than decoration.

1. Update the project identity in `project.json`.
2. Replace the sample content in `screens/` with the project's users, actions and data.
3. Register new screens in `route.js`; navigation updates automatically.
4. Reuse `Button`, `Panel`, `Field` and `Placeholder` from `components/wireframe.js`.
5. Open the Components screen for examples of the grayscale building blocks.
6. Document each flow and its acceptance rules alongside the project brief.

Use thin borders, neutral fills and readable type. Image placeholders indicate where media will go.
Keep empty states, form validation, keyboard access and narrow layouts working. Sample interactions
remain in memory and do not create real accounts or send requests to external services.

Wireframe Studio renders the React files inside Sandpack. Preserve `App.js`, `screens/`,
`components/`, `locales/` and `docs/`. `styles.css` is supplied by the host;
project-specific styles belong in `library.css`. No separate server or build configuration is needed.
