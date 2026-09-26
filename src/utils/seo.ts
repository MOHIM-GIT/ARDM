/**
 * SEO & URL Utility Helpers for ARDM Academy
 */

export function slugify(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getCourseSlug(course: { id: string; title: string }): string {
  return `${slugify(course.title)}-${course.id.replace(/^crs_/, '')}`;
}

export function getStudentResultSlug(record: { studentName: string; registrationId: string }): string {
  const cleanReg = record.registrationId.toLowerCase().replace(/[^a-z0-9]/g, '-');
  return `${slugify(record.studentName)}-${cleanReg}`;
}

export function getCanonicalUrl(path: string): string {
  const base = 'https://ardmacademy.in';
  if (!path || path === '/') return `${base}/`;
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}`;
}
