export function assetPath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (!path) return "";
  if (path.startsWith("http") || (base && path.startsWith(base))) {
    return path;
  }
  return `${base}${path}`;
}
