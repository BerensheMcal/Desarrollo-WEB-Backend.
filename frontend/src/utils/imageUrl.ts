const API_URL = 'https://tienda-kroxi-api.onrender.com';

export function getImagenUrl(path: string | null | undefined): string {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${API_URL}${path}`;
}
