/** Same namespace, fallback and {{variable}} contract as the original wireframe generator. */
export function translate(resources, key, namespace, fallback, variables = {}) {
  const lookup = (path) =>
    path
      .split(".")
      .reduce(
        (value, part) =>
          value && typeof value === "object" ? value[part] : undefined,
        resources,
      );
  const preferred = lookup(namespace ? `${namespace}.${key}` : key);
  const value =
    typeof preferred === "string" ? preferred : lookup(`common.${key}`);
  const text = typeof value === "string" ? value : (fallback ?? key);
  return text.replace(/\{\{([^}]+)\}\}/g, (match, name) =>
    variables[name] == null ? match : String(variables[name]),
  );
}
