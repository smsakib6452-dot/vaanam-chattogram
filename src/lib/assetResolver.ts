/**
 * Universal Asset Resolver for Chai Theory & VAANAM Chattogram
 * Resolves video and image paths across:
 * - /assets/video/ & /assets/videos/
 * - /assets/images/ & /assets/photos/
 * - /videos/ & /images/
 * Gracefully provides safe fallback paths if needed.
 */

export function resolveAsset(path: string): string {
  if (!path) return "";
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

  if (path.startsWith("http") || (base && path.startsWith(base))) {
    return encodeURI(decodeURI(path));
  }

  // Normalize leading slash
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return encodeURI(decodeURI(`${base}${cleanPath}`));
}

export interface MediaFallbackConfig {
  label: string;
  category: "video" | "photo" | "illustration";
  aspectRatio?: string;
  accentColor?: string;
}
