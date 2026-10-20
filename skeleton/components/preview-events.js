/** Parent messages carry navigation/preferences only; never evaluate or fetch message content. */
export function previewMessage(event, parent) {
  if (parent === globalThis.window || event.source !== parent) return null;
  const data = event.data;
  if (!data || typeof data !== 'object') return null;
  if (
    data.type === 'STUDIO_NAVIGATE' &&
    typeof data.path === 'string' &&
    /^\/(?!\/)[a-zA-Z0-9/_-]*$/.test(data.path)
  )
    return { path: data.path };
  if (
    data.type === 'STUDIO_LANGUAGE_CHANGED' &&
    ['en', 'ja'].includes(data.language)
  )
    return { language: data.language };
  return null;
}

export function readPreference(key, values, fallback) {
  try {
    const value = localStorage.getItem(`kodly-wireframe:${key}`);
    return values.includes(value) ? value : fallback;
  } catch {
    return fallback;
  }
}
export function writePreference(key, value) {
  try {
    localStorage.setItem(`kodly-wireframe:${key}`, value);
  } catch {
    /* Embedded storage may be disabled. */
  }
}
