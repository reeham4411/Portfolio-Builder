/**
 * Generates a URL-safe slug from a full name.
 * e.g. "Alex Rivera" → "alex-rivera"
 * Appends a short random suffix to guarantee uniqueness.
 */
export function generateSlug(fullName: string): string {
  const base = fullName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 40);

  const suffix = Math.random().toString(36).slice(2, 7);
  return base ? `${base}-${suffix}` : `portfolio-${suffix}`;
}

/**
 * Validates that a slug string is safe.
 */
export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9-]+$/.test(slug) && slug.length >= 3 && slug.length <= 80;
}