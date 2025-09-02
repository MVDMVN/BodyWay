export function kebabToCamel(s: string) {
  return s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}
export function camelToKebab(s: string) {
  return s.replace(/[A-Z]/g, (c) => "-" + c.toLowerCase());
}
