/**
 * Helper to resolve asset image paths cleanly both locally and on GitHub Pages
 */
export function getAssetPath(path: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }

  const baseUrl = import.meta.env.BASE_URL || '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

  return `${normalizedBase}${cleanPath}`;
}

/**
 * Helper to format price with AED currency
 */
export function formatPrice(price: number, currency = 'AED'): string {
  return `${currency} ${price}`;
}
